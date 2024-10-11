import { collection, query, getDocs, deleteDoc, doc, updateDoc, getDoc, db } from './firebase.js'

document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

let getdiv = document.getElementById('yourproducts');

async function foo() {
    const q = query(collection(db, localStorage.getItem('name')));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size) {
        querySnapshot.forEach((doc) => {
            getdiv.innerHTML += `
        <div style='height:100%' class="card p-0 mx-4 my-4 ">
            <div class="card-image">
                <img id='setimg' style='height:180px' src="${doc.data().image}" alt="Product Image">
            </div>
            <div class="card-details">
                <h3 class="product-title">${doc.data().name}</h3>
                <p class="product-price">$ ${doc.data().price}</p>
                <p class="product-rating">⭐⭐⭐⭐☆ (4.5)</p>
            </div>
             <div class="m-2 text-center">
                    <button style="width:90px;" onclick="edit('${doc.id}', '${doc.data().category}','${doc.data().secondaryDocId}')" class="btn btn-danger"><i class="fas fa-edit"></i></button>
                    <button style="width:90px;" onclick="deletes('${doc.id}', '${doc.data().category}','${doc.data().secondaryDocId}')" class="btn btn-warning"><i class="fas fa-trash-alt"></i></button>
                </div>
        </div>`
        });
    }
    else {
        getdiv.removeAttribute('class')
        getdiv.setAttribute('class', 'd-flex justify-content-center m-3 py-2')
        getdiv.innerHTML = `<img width="300px" src="../Images/product-not-found.jpg" alt="">`
    }
}

foo();

async function edit(id, category, secondaryDocId) {
    document.getElementById('editDocId').value = id;
    document.getElementById('editCategory').value = category;
    document.getElementById('editSecondaryDocId').value = secondaryDocId;

    const docRef = doc(db, localStorage.getItem('name'), id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const data = docSnap.data();
        document.getElementById('editName').value = data.name;
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
        name: document.getElementById('editName').value,
        image: document.getElementById('editImage').value,
        price: document.getElementById('editPrice').value,
        description: document.getElementById('editDescription').value,
        address: document.getElementById('editAddress').value,
        contact: document.getElementById('editContact').value
    };
    const updatedData2 = {
        secondaryDocId: secondaryDocId,
        name: document.getElementById('editName').value,
        image: document.getElementById('editImage').value,
        price: document.getElementById('editPrice').value,
        description: document.getElementById('editDescription').value,
        address: document.getElementById('editAddress').value,
        contact: document.getElementById('editContact').value
    };

    const docRef = doc(db, localStorage.getItem('name'), id);
    await updateDoc(docRef, updatedData2);

    const docRef2 = doc(db, category, secondaryDocId);
    await updateDoc(docRef2, updatedData);

    $('#editModal').modal('hide');
    window.location.reload();
}

function deletes(id, category, secondaryDocId) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            }).then(async () => {
                await deleteDoc(doc(db, localStorage.getItem('name'), id));
                await deleteDoc(doc(db, category, secondaryDocId));
                window.location.reload();
            })
        }
    })

}

window.edit = edit;
window.saveEdit = saveEdit;
window.deletes = deletes;