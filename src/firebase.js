// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsNSIzzCZu2SHWwrNvom3dzNGc_gG3qUA",
    authDomain: "netflix-clone-19ad4.firebaseapp.com",
    projectId: "netflix-clone-19ad4",
    storageBucket: "netflix-clone-19ad4.firebasestorage.app",
    messagingSenderId: "1010588832993",
    appId: "1:1010588832993:web:c34e5b1b21c3b9722793a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            name,
            provider: "local",
            email,
           
        });
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

const logout = async () => {
    await signOut(auth);
}

export { auth, db, signup, login, logout };