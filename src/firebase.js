import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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