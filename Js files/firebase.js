import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { getFirestore, collection, query, getDocs, deleteDoc, addDoc, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";


const firebaseConfig = {
    apiKey: "AIzaSyANjq0oxSJawr3aKdnLRNdBmOHze5SKLvI",
    authDomain: "holx-8e54d.firebaseapp.com",
    projectId: "holx-8e54d",
    storageBucket: "holx-8e54d.appspot.com",
    messagingSenderId: "110770706324",
    appId: "1:110770706324:web:9edd75b7825b451e91a181",
    measurementId: "G-Q8MWSJX23Y"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage();


export {
    collection, query, getDocs, deleteDoc, doc, updateDoc, getDoc, db, auth, provider, signInWithPopup, storage, ref, uploadBytesResumable, getDownloadURL,addDoc
}