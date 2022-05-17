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
	addDoc,
	limit,
	query
} from 'firebase/firestore';
import { User } from "./classes";
import type {
	AnnouncementType,
	AdminType,
	PointsType,
	UserType
} from './interfaces';

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

const signIn = async () => {
	await setPersistence(auth, inMemoryPersistence).then(() => {
		const provider = new GoogleAuthProvider();
		return signInWithRedirect(auth, provider);
	});
	
};

const getUser = () => {
	return auth.currentUser;
};

const getAuthObj = (): any => {
	return auth;
};

const signOut = () => {
	auth.signOut();
}

const getIsAdmin = async (uid: string | undefined): Promise<boolean> => {
	if (!uid) return false;
	const adminDocument = await getDoc(doc(db, 'admins', 'admins'));
	const adminIds = adminDocument?.data()?.ids;
	return adminIds?.includes(uid);
}

const getAnnouncements = async (): Promise<AnnouncementType[]> => {
	let announcements: AnnouncementType[] = [];
	const announcementsColRef = collection(db, 'announcements');
	const announcementsQuery = await query(announcementsColRef, limit(80));
	const announcementsSnap = await getDocs(announcementsQuery);
	announcementsSnap.forEach((announcement: any) => {
		announcements.push(announcement.data());
	});
	announcements.sort((a, b) => {
		if (a.timestamp === null || typeof a.timestamp !== typeof 0) return 1;
		if (b.timestamp === null || typeof b.timestamp !== typeof 0) return -1;
		return (b.timestamp - a.timestamp);
	})
	return announcements;
}

const requestAdminPermissions = (user: any) => {
	const request: AdminType = {
		name: user.displayName,
		email: user.email,
		photoUrl: user.photoURL,
		uid: user.uid,
	}
	setDoc(doc(db, 'admins', 'requests', 'requests', user.uid), request);
}

const approveAdminRequest = async (user: any): Promise<void> => {
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

const getRequests = async (): Promise<AdminType[]> => {
	const requests: any[] = [];
	const requestsCol = await getDocs(collection(db, 'admins', 'requests', 'requests'));
	requestsCol.forEach(request => {
		requests.push(request.data());
	});
	return requests;
}

const addAnnouncement = async (announcement: AnnouncementType): Promise<void> => {
	addDoc(collection(db, 'announcements'), announcement);
}

const getAdminObjs = async (): Promise<AdminType[]> => {
	let admins: any[] = [];
	const adminsCol = await getDocs(collection(db, 'admins', 'admins', 'admins'));
	adminsCol.forEach(admin => {
		admins.push(admin.data());
	});
	return admins;
}

const getLeaderboard = async (): Promise<PointsType[]> => {
	const leaderboard: any[] = [];
	const snap = await getDocs(collection(db, "users"));
	snap.forEach((request) => {
		leaderboard.push(request.data());
	});
	return leaderboard;
}
// turn 0;

export const getUserData = async (uid: string, name: string): Promise<any> => {
	const snap = await getDoc(doc(db, "users", uid));
	if (snap.exists()) {
		return snap.data();
	}
	return new User(uid, name, 0, []);
}

export const addPoints = async (uid: string, name: string, reason: string, amount: number): Promise<void> => {
	const data = await getUserData(uid, name);
	console.log(data);
	const newUserObj: UserType = {
		points: data.points + amount,
		name,
		uid,
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
	console.log(newUserObj);
	await setDoc(doc(db, "users", uid), newUserObj);

	/* {
		points: points + amount,
		name: string,
		email: string,
		uid: string,
		history: [
			// history
		]
	 }
	*/
}

const getPoints = async (user: any): Promise<number> => {
	const name = user.displayName;
	const uid = user.uid;
	const snap = await getDoc(doc(db, "users", uid));
	if (snap.exists()) {
		return snap.data().points;
	} else {
		const newUser: UserType = {
			points: 0,
			name,
			uid,
			history: []
		};
		setDoc(doc(db, 'users', uid), newUser)
		return 0;
	}
}

export {
	signIn,
	getUser,
	getAuthObj,
	signOut,
	getIsAdmin,
	getAnnouncements,
	requestAdminPermissions,
	getRequests,
	approveAdminRequest,
	addAnnouncement,
	db,
	getAdminObjs,
	getLeaderboard,
	getPoints
}
