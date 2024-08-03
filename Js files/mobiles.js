import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, query, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyC0c3JkPZf0n1Fn1kVXjdMS_Gz-tJSzd90",
    authDomain: "holx-4e218.firebaseapp.com",
    projectId: "holx-4e218",
    storageBucket: "holx-4e218.appspot.com",
    messagingSenderId: "667615157379",
    appId: "1:667615157379:web:69e4586c3b8115de1a0fb6",
    measurementId: "G-MZKNXNFDMP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let getdiv = document.getElementById('mobiles')

async function foo() {

    const q = query(collection(db, "Mobiles"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        getdiv.innerHTML += `<div class="card m-5" style="width: 18rem; padding:0;">
  <img width='100px' height='150px' src=${doc.data().image} class="card-img-top" alt="...">
  <div class="card-body">
  <span class="card-title">Price:</span>
    <span class="card-title">${doc.data().price}</span>
    <br>
    <span class="card-text">Decsription:</span>
    <span class="card-text">${doc.data().description}</span>
    <br>
    <span class="card-text">Address:</span>
    <span class="card-text">${doc.data().address}</span>
    <br>
    <span class="card-text">Contact No.</span>
    <span class="card-text">${doc.data().contact}</span>
  </div>
</div>`
        console.log(doc.id, " => ", doc.data());
    });
}

foo()

