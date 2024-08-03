import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

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
const storage = getStorage();

let getSeller = document.getElementById('sellerName');
getSeller.value = sessionStorage.getItem('name');

let formbtn = document.getElementById('form-btn');
formbtn.addEventListener('click', () => {
    document.getElementById('loader').style.display = 'block'; // Show loader

    let e = document.getElementById("select");
    let text = e.options[e.selectedIndex].text;
    let getname = document.getElementById('productName');
    let getdesc = document.getElementById('productDesc');
    let getprice = document.getElementById('productPrice');
    let getcontact = document.getElementById('sellerContact');
    let getaddress = document.getElementById('sellerAddress');
    let getimg = document.getElementById('productImage');
    const file = getimg.files[0];
    const storageRef = ref(storage, `products/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            console.log(error);
            document.getElementById('loader').style.display = 'none'; // Hide loader on error
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
                const docRef = await addDoc(collection(db, text), {
                    category: text,
                    companyName: getname.value,
                    description: getdesc.value,
                    price: getprice.value,
                    contact: getcontact.value,
                    address: getaddress.value,
                    image: downloadURL
                });
                console.log("Document written with ID: ", docRef.id);
                const docRef2 = await addDoc(collection(db, sessionStorage.getItem('name')), {
                    secondaryDocId: docRef.id,
                    category: text,
                    companyName: getname.value,
                    description: getdesc.value,
                    price: getprice.value,
                    contact: getcontact.value,
                    address: getaddress.value,
                    image: downloadURL
                });
                console.log("Document written with ID: ", docRef2.id);
                location.href = 'yourproducts.html';
                getaddress.value = '';
                getcontact.value = '';
                getSeller.value = '';
                getdesc.value = '';
                getprice.value = '';
                getname.value = '';

                document.getElementById('loader').style.display = 'none'; // Hide loader on success
            });
        }
    );
});



