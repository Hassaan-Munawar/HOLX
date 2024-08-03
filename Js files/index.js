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

let getvehicles = document.getElementById('vehicles')

async function vehicles() {

    const q = query(collection(db, "Vehicles"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        getvehicles.innerHTML += `<div class="card m-5" onclick="details(this)" style="width: 18rem; padding:0;">
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
      <span hidden>${doc.data().companyName}</span>
  </div>
</div>`
        console.log(doc.id, " => ", doc.data());
    });
}

vehicles()

let getproperty = document.getElementById('property')

async function property() {

    const q = query(collection(db, "Property"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        getproperty.innerHTML += `<div class="card m-5" onclick="details(this)" style="width: 18rem; padding:0;">
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
      <span hidden>${doc.data().companyName}</span>
  </div>
</div>`
        console.log(doc.id, " => ", doc.data());
    });
}

property()


let getmobile = document.getElementById('mobiles')

async function mobiles() {

    const q = query(collection(db, "Mobiles"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      getmobile.innerHTML += `<div class="card m-5" onclick="details(this)" style="width: 18rem; padding:0;">
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
      <span hidden>${doc.data().companyName}</span>
  </div>
</div>`
        console.log(doc.id, " => ", doc.data());
    });
}

mobiles()


let getbikes = document.getElementById('bikes')

async function bikes() {

    const q = query(collection(db, "Bikes"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        getbikes.innerHTML += `<div class="card m-5" onclick="details(this)" style="width: 18rem; padding:0;">
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
      <span hidden>${doc.data().companyName}</span>
  </div>
</div>`
        console.log(doc.id, " => ", doc.data());
    });
}

bikes()


let getlogbtn = document.getElementById('logbtn')
if(getlogbtn){
  getlogbtn.addEventListener('click',()=>{
    getlogbtn.hidden = true
    let getimg = document.getElementById('profile')
    getimg.hidden = true 
    let getlogin = document.getElementById('signin')
    getlogin.hidden = false
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('img')
  })
}

function details(e){

  sessionStorage.setItem('detailSrc',e.childNodes[1].src)
  sessionStorage.setItem('detailPrice',e.childNodes[3].childNodes[3].textContent)
  sessionStorage.setItem('detailDescription',e.childNodes[3].childNodes[9].textContent)
  sessionStorage.setItem('detailAddress',e.childNodes[3].childNodes[15].textContent)
  sessionStorage.setItem('detailContact',e.childNodes[3].childNodes[21].textContent)
  sessionStorage.setItem('detailName',e.childNodes[3].childNodes[23].textContent)
  location.href = 'details.html'

}

window.details = details