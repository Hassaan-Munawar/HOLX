document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const productName = sessionStorage.getItem('detailName');
const existingProductIndex = cartItems.findIndex(item => item.name === productName);
let getcart = document.getElementById('cart');
if (existingProductIndex !== -1 && localStorage.getItem('img')) {
    getcart.innerHTML = 'Added'
}

let productimage = document.getElementById('prod-image')
productimage.src = sessionStorage.getItem('detailSrc')
let productprice = document.getElementById('prod-price')
productprice.innerHTML = sessionStorage.getItem('detailPrice')
let productdescription = document.getElementById('prod-description')
productdescription.innerHTML = sessionStorage.getItem('detailDescription')
let sellername = document.getElementById('seller-name')
sellername.innerHTML = sessionStorage.getItem('sellerName')
let sellercontact = document.getElementById('seller-contact')
sellercontact.innerHTML = sessionStorage.getItem('detailContact')
let names = document.getElementById('prod-name')
names.innerHTML = sessionStorage.getItem('detailName')
let selleraddress = document.getElementById('seller-address')
selleraddress.innerHTML = sessionStorage.getItem('detailAddress')

let getback = document.getElementById('back')
getback.addEventListener('click', () => {
   location.href =  sessionStorage.getItem('path')
})



function addToCart() {
    let cartItemss = JSON.parse(localStorage.getItem('cart')) || [];
    const productName = sessionStorage.getItem('detailName');
    const existingProductIndexx = cartItemss.findIndex(item => item.name === productName);

    if (localStorage.getItem('name') && existingProductIndexx !== -1) {

        Swal.fire({
            title: "Attention!",
            text: "This product is already in your cart !",
            icon: "success"
        });

    }
    else if (localStorage.getItem('name')) {
        Swal.fire({
            title: "Congrats !",
            text: "Product Added Successfully !",
            icon: "success"
        });
        const productImage = sessionStorage.getItem('detailSrc');
        const productPrice = sessionStorage.getItem('detailPrice').slice(2);
        cartItems.push({
            id: cartItems.length + 1,
            name: productName,
            image: productImage,
            price: productPrice,
            quantity: 1,
        });
        getcart.innerHTML = 'Added'
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }
    else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Login First !"
        }).then(() => {
            location.href = '../index.html'
        })
    }

}
if (getcart) {
    getcart.addEventListener('click', addToCart);
}



