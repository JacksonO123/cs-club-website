import { initializeApp } from 'firebase/app';
import {
	getAuth,
	setPersistence,
	inMemoryPersistence,
	GoogleAuthProvider,
	signInWithRedirect
} from 'firebase/auth';
import {
	doc,
	getDoc,
	getDocs,
	setDoc,
	collection,
	getFirestore,
	deleteDoc,
	limit,
	query,
	updateDoc
} from 'firebase/firestore';
import type {
	AnnouncementType,
	AdminType,
	UserType
} from './interfaces';
import { v4 } from 'uuid';

const config = {
	apiKey: "AIzaSyDV-jaVv4Nfs-VJGw5AxUve0QonRfeZDLg",
	authDomain: "mvhs-cs-club-website.firebaseapp.com",
	projectId: "mvhs-cs-club-website",
	storageBucket: "mvhs-cs-club-website.appspot.com",
	messagingSenderId: "34476205353",
	appId: "1:34476205353:web:4845cecb8831704e8c0338",
	measurementId: "G-199L7JP5FX"
}

const app = initializeApp(config);
const auth = getAuth(app);
const db = getFirestore(app);

export const signIn = async () => {
	await setPersistence(auth, inMemoryPersistence).then(() => {
		const provider = new GoogleAuthProvider();
		return signInWithRedirect(auth, provider);
	});
	const user = getUser();
	await getUserData(user);
};

export const getUser = () => {
	return auth.currentUser;
};

export const getAuthObj = (): any => {
	return auth;
};

export const signOut = () => {
	auth.signOut();
}

export const getIsAdmin = async (uid: string | undefined): Promise<boolean> => {
	if (!uid) return false;
	const adminDocument = await getDoc(doc(db, 'admins', 'admins'));
	const adminIds = adminDocument?.data()?.ids;
	return adminIds?.includes(uid);
}

export const getAnnouncements = async (): Promise<AnnouncementType[]> => {
	let announcements: AnnouncementType[] = [];
	const announcementsColRef = collection(db, 'announcements');
	const announcementsQuery = query(announcementsColRef, limit(80));
	const announcementsSnap = await getDocs(announcementsQuery);
	announcementsSnap.forEach((announcement: any) => {
		const announcementData: any = {
			...announcement.data(),
			id: announcement.id
		}
		announcements.push(announcementData);
	});
	announcements.sort((a, b) => {
		if (a.timestamp === null || typeof a.timestamp !== typeof 0) return 1;
		if (b.timestamp === null || typeof b.timestamp !== typeof 0) return -1;
		return (b.timestamp - a.timestamp);
	})
	return announcements;
}

export const requestAdminPermissions = (user: any) => {
	const request: AdminType = {
		name: user.displayName,
		email: user.email,
		photoUrl: user.photoURL,
		uid: user.uid,
	}
	setDoc(doc(db, 'admins', 'requests', 'requests', user.uid), request);
}

export const approveAdminRequest = async (user: any): Promise<void> => {
	const uid = user.uid;
	const admins = await getDoc(doc(db, 'admins', 'admins'));
	let ids: string[] = admins.data()?.ids;
	if (!ids.includes(uid)) {
		const adminObj: AdminType = {
			name: user.name,
			email: user.email,
			photoUrl: user.photoUrl,
			uid
		}
		ids.push(uid);
		setDoc(doc(db, 'admins', 'admins'), { ids });
		setDoc(doc(db, 'admins', 'admins', 'admins', uid), adminObj);
	}
	deleteDoc(doc(db, 'admins', 'requests', 'requests', uid));
}

export const getRequests = async (): Promise<AdminType[]> => {
	const requests: any[] = [];
	const requestsCol = await getDocs(collection(db, 'admins', 'requests', 'requests'));
	requestsCol.forEach(request => {
		requests.push(request.data());
	});
	return requests;
}

export const addAnnouncement = async (announcement: AnnouncementType): Promise<void> => {
	const id = v4();
	announcement.id = id;
	setDoc(doc(db, 'announcements', id), announcement);
}

export const getAdminObjs = async (): Promise<AdminType[]> => {
	let admins: any[] = [];
	const adminsCol = await getDocs(collection(db, 'admins', 'admins', 'admins'));
	adminsCol.forEach(admin => {
		admins.push(admin.data());
	});
	return admins;
}

export const getLeaderboard = async (): Promise<UserType[]> => {
	const leaderboard: any[] = [];
	const snap = await getDocs(collection(db, "users"));
	snap.forEach((request) => {
		leaderboard.push(request.data());
	});
	return leaderboard;
}

export const getUserData = async (user: any): Promise<any> => {
	const uid = user.uid;
	const name = user.displayName;
	const email = user.email;
	const snap = await getDoc(doc(db, "users", uid));
	if (snap.exists()) {
		return snap.data();
	} else {
		const userObj: UserType = {
			name,
			uid,
			email,
			history: [],
			photoUrl: user.photoURL
		}
		setDoc(doc(db, "users", uid), userObj);
		return userObj;
	}
}

export const addPoints = async (user: any, reason: string, amount: number): Promise<void> => {
	const uid = user.uid;
	const data = await getUserData(user);
	const newUserObj: any = {
		history: [
			{
				amount,
				reason,
				timestamp: Date.now(),
				date: new Date().toLocaleDateString()
			},
			...data.history
			
		]
	};
	updateDoc(doc(db, "users", uid), newUserObj);
}

export const getPoints = async (user: any): Promise<number> => {
	const name = user.displayName;
	const uid = user.uid;
	const photoUrl = user.photoURL;
	const email = user.email;
	const snap = await getDoc(doc(db, "users", uid));
	if (snap.exists()) {
		return snap.data().points;
	} else {
		const newUser: UserType = {
			name,
			uid,
			photoUrl,
			email,
			history: []
		};
		setDoc(doc(db, 'users', uid), newUser)
		return 0;
	}
}

export const updateAnnouncement = (id: string | undefined, value: string) => {
	if (id) updateDoc(doc(db, 'announcements', id), { content: value });
}

export const deleteAnnouncement = (id: string | undefined) => {
	if (id) deleteDoc(doc(db, 'announcements', id));
}

export { db };

export const rejectAdminRequest = (uid: string): void => {
	deleteDoc(doc(db, 'admins', 'requests', 'requests', uid));
};
