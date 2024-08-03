import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

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
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
auth.languageCode = 'en';
let signinbtn = document.getElementById('signin')
let img = document.getElementById('profile')
let confirm = sessionStorage.getItem('img')
if(confirm != null){
    signinbtn.hidden = true
    img.hidden = false
    img.src = confirm
}
signinbtn.addEventListener('click',()=>{
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    let src = user.reloadUserInfo.photoUrl
    let username = user.reloadUserInfo.displayName
    signinbtn.hidden = true
    img.hidden = false
    img.src = src
    sessionStorage.setItem('img',src)
    sessionStorage.setItem('name',username)
    window.location.reload()
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.log("error ==>" , errorMessage)
  });
}) 



document.addEventListener("DOMContentLoaded", () => {
    const allCategoriesLink = document.getElementById("all-categories");
    const categoriesDropdown = document.getElementById("categories-dropdown");

    allCategoriesLink.addEventListener("click", (e) => {
        e.preventDefault();
        categoriesDropdown.style.display = categoriesDropdown.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (e) => {
        if (!allCategoriesLink.contains(e.target) && !categoriesDropdown.contains(e.target)) {
            categoriesDropdown.style.display = "none";
        }
    });
});
let getadd = document.getElementById('btn')
getadd.addEventListener('click', () => {
    let input = document.getElementById('inp').value
    let num = document.getElementById('inp').value.length - 1
    let final = input.charAt(num)
    let getInp = document.getElementById('inp').value.slice(0, 1).toUpperCase()
    let getInp2 = document.getElementById('inp').value.slice(1).toLowerCase()
    let concat = getInp + getInp2
    if (final != 's') {
        concat = getInp + getInp2 + "s"
    }
    let bikes = ["Bikes", "Motorcycles", "Bicycles", "Bikes", "Accessories", "Scooters"]
    let vehicles = ["Vehicles", "Cars", "Buses", "Vans", "Trucks", "Rickshaws", "Chingchies", "Tractors", "Trailers"]
    let property = ["Property", "Rent", "Flats", "Banglows", "Farms"]
    let mobiles = ["Mobiles", "Mobile phones", "Accessories", "Smart watches", "Tablets"]

    for (var i = 0; i < bikes.length; i++) {
        if (concat == bikes[i]) {
            location.href = 'bikes.html'
        }
    }

    for (var i = 0; i < vehicles.length; i++) {
        if (concat == vehicles[i]) {
            location.href = 'vehicles.html'
        }
    }
    for (var i = 0; i < mobiles.length; i++) {
        if (concat == mobiles[i]) {
            location.href = 'mobiles.html'
        }
    }
    for (var i = 0; i < property.length; i++) {
        if (concat == property[i]) {
            location.href = 'property.html'
        }
    }

console.log(concat)
    document.getElementById("inp").value = ''

})

let getsell = document.getElementById('sell')
getsell.addEventListener('click',()=>{
    if(confirm != null){
        location.href ='form.html'
    }
    else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Sign in first!",
          });
    }
})





