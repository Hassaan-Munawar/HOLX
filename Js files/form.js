import {ref,uploadBytesResumable,getDownloadURL,storage,collection,addDoc,db} from './firebase.js'

document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); 
});

let getSeller = document.getElementById('sellerName');
getSeller.value = localStorage.getItem('name');

let formbtn = document.getElementById('form-btn');
formbtn.addEventListener('click', () => {
    let e = document.getElementById("select");
    let text = e.options[e.selectedIndex].text;
    let getname = document.getElementById('productName');
    let getdesc = document.getElementById('productDesc');
    let getprice = document.getElementById('productPrice');
    let getcontact = document.getElementById('sellerContact');
    let getaddress = document.getElementById('sellerAddress');
    let getimg = document.getElementById('productImage');
    const file = getimg.files[0];

    if (text.trim() == '' || getname.value.trim() == '' || getdesc.value.trim() == '' || getprice.value.trim() == '' || getcontact.value.trim() == '' || getaddress.value.trim() == '' || getimg.files[0].name == null) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please fill all the fields ...",
        });
    }

    else {

        document.getElementById('loader').style.display = 'block';
        document.getElementById('body').style.opacity = '0.1'

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
                document.getElementById('loader').style.display = 'none';
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    const docRef = await addDoc(collection(db, text), {
                        category: text,
                        name: getname.value,
                        description: getdesc.value,
                        price: getprice.value,
                        contact: getcontact.value,
                        address: getaddress.value,
                        image: downloadURL,
                        sellerName: localStorage.getItem('name')
                    });
                    const docRef2 = await addDoc(collection(db, localStorage.getItem('name')), {
                        secondaryDocId: docRef.id,
                        category: text,
                        name: getname.value,
                        description: getdesc.value,
                        price: getprice.value,
                        contact: getcontact.value,
                        address: getaddress.value,
                        image: downloadURL,
                        sellerName: localStorage.getItem('name')
                    });
                    location.href = '../Categories/yourproducts.html';
                    getaddress.value = '';
                    getcontact.value = '';
                    getSeller.value = '';
                    getdesc.value = '';
                    getprice.value = '';
                    getname.value = '';

                    document.getElementById('loader').style.display = 'none';
                });
            }
        );
    }
});


