import { FirebaseError, initializeApp } from 'firebase/app';
import {
	getAuth,
	setPersistence,
	inMemoryPersistence,
	GoogleAuthProvider,
	signInWithRedirect
} from 'firebase/auth';
import {
	getFirestore,
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

export {
	signIn,
	getUser,
	getAuthObj,
	signOut
}