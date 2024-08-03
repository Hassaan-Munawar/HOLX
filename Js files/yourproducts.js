import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, collection, query, getDocs, deleteDoc, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

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

let getdiv = document.getElementById('yourproducts');

async function foo() {
    const q = query(collection(db, sessionStorage.getItem('name')));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        getdiv.innerHTML += `
        <div class="card m-5" style="width: 18rem; padding:0;">
            <img width='100px' height='150px' src=${doc.data().image} class="card-img-top" alt="...">
            <div class="card-body">
                <span class="card-title">Price:</span>
                <span class="card-title">${doc.data().price}</span>
                <br>
                <span class="card-text">Description:</span>
                <span class="card-text">${doc.data().description}</span>
                <br>
                <span class="card-text">Address:</span>
                <span class="card-text">${doc.data().address}</span>
                <br>
                <span class="card-text">Contact No.</span>
                <span class="card-text">${doc.data().contact}</span>
                <div class="m-2">
                    <button onclick="edit('${doc.id}', '${doc.data().category}','${doc.data().secondaryDocId}')" class="btn btn-info">Edit</button>
                    <button onclick="deletes('${doc.id}', '${doc.data().category}','${doc.data().secondaryDocId}')" class="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>`;
        console.log(doc.id, " => ", doc.data());
    });
}

foo();

async function edit(id, category, secondaryDocId) {
    document.getElementById('editDocId').value = id;
    document.getElementById('editCategory').value = category;
    document.getElementById('editSecondaryDocId').value = secondaryDocId;

    const docRef = doc(db, sessionStorage.getItem('name'), id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('editName').value = data.companyName
        document.getElementById('editImage').value = data.image;
        document.getElementById('editPrice').value = data.price;
        document.getElementById('editDescription').value = data.description;
        document.getElementById('editAddress').value = data.address;
        document.getElementById('editContact').value = data.contact;
    }

    $('#editModal').modal('show');
}

async function saveEdit() {
    const id = document.getElementById('editDocId').value;
    const category = document.getElementById('editCategory').value;
    const secondaryDocId = document.getElementById('editSecondaryDocId').value;
    const updatedData = {
        companyName:document.getElementById('editName').value,
        image: document.getElementById('editImage').value,
        price: document.getElementById('editPrice').value,
        description: document.getElementById('editDescription').value,
        address: document.getElementById('editAddress').value,
        contact: document.getElementById('editContact').value
    };
    const updatedData2 = {
        secondaryDocId:secondaryDocId,
        companyName:document.getElementById('editName').value,
        image: document.getElementById('editImage').value,
        price: document.getElementById('editPrice').value,
        description: document.getElementById('editDescription').value,
        address: document.getElementById('editAddress').value,
        contact: document.getElementById('editContact').value
    };

    const docRef = doc(db, sessionStorage.getItem('name'), id);
    await updateDoc(docRef, updatedData2);

    const docRef2 = doc(db, category, secondaryDocId);
    await updateDoc(docRef2, updatedData);

    $('#editModal').modal('hide');
    window.location.reload();
}

async function deletes(id, category, secondaryDocId) {
    await deleteDoc(doc(db, sessionStorage.getItem('name'), id));
    await deleteDoc(doc(db, category, secondaryDocId));
    window.location.reload();
}

window.edit = edit;
window.saveEdit = saveEdit;
window.deletes = deletes;