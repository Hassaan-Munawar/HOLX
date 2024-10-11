import {signInWithPopup,auth,provider } from "./firebase.js";

auth.languageCode = 'en';
let signinbtn = document.getElementById('signin')
let img = document.getElementById('profile')
let confirm = localStorage.getItem('img')
let getcart = document.getElementById('cart')
let modal = document.getElementById('myModal')
let openModalBtn =document.getElementById('openModalBtn')
if (confirm != null) {
    getcart.hidden = false
    img.hidden = false
    img.src = confirm
    openModalBtn.hidden = true
}
signinbtn.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            modal.hidden = true
            const user = result.user;
            let getlogbtn = document.getElementById('logbtn')
            let getcart = document.getElementById('cart')
            getcart.hidden = false
            if (getlogbtn) {
                getlogbtn.hidden = false
            }
            let src = user.reloadUserInfo.photoUrl
            let username = user.reloadUserInfo.displayName
            img.hidden = false
            img.src = src
            openModalBtn.hidden = true
            localStorage.setItem('img', src)
            localStorage.setItem('name', username)

        })
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
    let input = document.getElementById('inp').value.trim();
    let concat = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    if (concat.charAt(concat.length - 1) !== 's') {
        concat += "s";
    }
    
    const categories = {
        Accessories: 'accessories.html',
        Animals: 'animals.html',
        Pets: 'animals.html',
        Birds: 'animals.html',
        Bags: 'bags.html',
        Schoolbags: 'bags.html',
        Handbags: 'bags.html',
        Bikes: 'bikes.html',
        Motorcycles: 'bikes.html',
        Bicycles: 'bikes.html',
        Scooters: 'bikes.html',
        Books: 'books.html',
        Notebooks: 'books.html',
        Chairs: 'chairs.html',
        Clothes: 'clothes.html',
        Dresses: 'clothes.html',
        Shirts: 'clothes.html',
        Trousers: 'clothes.html',
        "T-shirts": 'clothes.html',
        Computers: 'computers.html',
        Laptops: 'computers.html',
        Pcs: 'computers.html',
        Personalcomputers: 'computers.html',
        Cycles: 'cycles.html',
        Bicycles: 'cycles.html',
        Tricycles: 'cycles.html',
        Furnitures: 'furnitures.html',
        Beds: 'furnitures.html',
        Dressings: 'furnitures.html',
        Cupboards: 'furnitures.html',
        Machines: 'machines.html',
        Machinerys: 'machines.html',
        Washingmachines: 'machines.html',
        Mobiles: 'mobiles.html',
        "Mobile phones": 'mobiles.html',
        "Smart watches": 'mobiles.html',
        Tablets: 'mobiles.html',
        Propertys: 'property.html',
        Rents: 'property.html',
        Flats: 'property.html',
        Banglows: 'property.html',
        Farms: 'property.html',
        Tables: 'tables.html',
        Sidetables: 'tables.html',
        Toys: 'toys.html',
        Vehicles: 'vehicles.html',
        Cars: 'vehicles.html',
        Buses: 'vehicles.html',
        Vans: 'vehicles.html',
        Trucks: 'vehicles.html',
        Rickshaws: 'vehicles.html',
        Chingchies: 'vehicles.html',
        Tractors: 'vehicles.html',
        Trailers: 'vehicles.html'
    };
    
    if (categories[concat]) {
        location.href = `../Categories/${categories[concat]}`;
    }
    
    document.getElementById("inp").value = '';

})

var modals = document.getElementById("myModal");
let getsell = document.getElementById('sell')
getsell.addEventListener('click', () => {
    let getknow = localStorage.getItem('img')
    if (getknow != null) {
        location.href = '../Categories/form.html'
    }
    else {
         modals.style.display = "flex"
    }
})



var openModalBtns = document.getElementById("openModalBtn");
var closeModals = document.getElementsByClassName("closess")[0];


openModalBtns.onclick = function() {
    modals.style.display = "flex";
}


closeModals.onclick = function() {
    modals.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modals) {
        modals.style.display = "none";
    }
}



if(JSON.parse(localStorage.getItem('cart')).length){
    document.getElementById('cartlength').innerHTML = JSON.parse(localStorage.getItem('cart')).length
}