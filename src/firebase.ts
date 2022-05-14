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
	addDoc,
} from 'firebase/firestore';

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

const getAnnouncements = async (): Promise<any[]> => {
	let announcements: any[] = [];
	const announcementsCol = await getDocs(collection(db, 'announcements', 'announcements'));
	announcementsCol.forEach(announcement => {
		announcements.push(announcement.data());
	});
	return announcements;
}

const requestAdminPermissions = (user: any) => {
	const request = {
		name: user.displayName,
		email: user.email,
		photoUrl: user.photoURL,
		uid: user.uid
	}
	console.log(request);
	setDoc(doc(db, 'admins', 'requests', 'requests', user.uid), request);
}

const getRequests = async (): Promise<any[]> => {
	const requests: any[] = [];
	const requestsCol = await getDocs(collection(db, 'admins', 'requests', 'requests'));
	requestsCol.forEach(request => {
		requests.push(request.data());
	});
	return requests;
}

export {
	signIn,
	getUser,
	getAuthObj,
	signOut,
	getIsAdmin,
	getAnnouncements,
	requestAdminPermissions,
	getRequests
}