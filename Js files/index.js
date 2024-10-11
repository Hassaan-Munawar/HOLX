import { collection, query, getDocs, db } from "./firebase.js";

document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
});

if (localStorage.getItem('img') == null) {
  window.setTimeout(() => {
    document.getElementById('myModal').style.display = 'flex'
  }, 10000)

}


async function displayItems(collectionName, elementId, imageHeight = '180px') {
  const getElement = document.getElementById(elementId);

  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size) {
    querySnapshot.forEach((doc) => {
      getElement.innerHTML += `
        <div style='height:100%' onclick='details(this)' class="card p-0 mx-4 my-4">
            <div class="card-image">
                <img style='height:${imageHeight}' id='setimg' src="${doc.data().image}" alt="Product Image">
                <div class="discount-badge">20% OFF</div>
            </div>
            <div class="card-details">
                <h3 class="product-title">${doc.data().name}</h3>
                <p class="product-price">$ ${doc.data().price}</p>
                <p class="product-rating">⭐⭐⭐⭐☆ (4.5)</p>
                <p hidden>${doc.data().description}</p>
                <p hidden>${doc.data().sellerName}</p>
                <p hidden>${doc.data().contact}</p>
                <p hidden>${doc.data().address}</p>
            </div>
            <button class="add-to-cart">Check Details</button>
        </div>`;
    });
  } else {
    getElement.removeAttribute('class');
    getElement.setAttribute('class', 'd-flex justify-content-center m-3 py-2');
    getElement.innerHTML = `<img width="300px" src="../Images/product-not-found.jpg" alt="">`;
  }
}

displayItems("Vehicles", "vehicles");
displayItems("Property", "property");
displayItems("Mobiles", "mobiles");
displayItems("Bikes", "bikes");
displayItems("Accessories", "accessories");
displayItems("Animals", "animals");
displayItems("Bags", "bags");
displayItems("Books", "books", '360px');
displayItems("Chairs", "chairs");
displayItems("Clothes", "clothes");
displayItems("Computers", "computers");
displayItems('Toys', 'toys')
displayItems('Tables', 'tables')
displayItems('Machines', 'machines')
displayItems('Furnitures', 'furnitures')
displayItems('Cycles', 'cycles')


let getlogbtn = document.getElementById('logbtn')
let carts = document.getElementById('cart')

if (localStorage.getItem('name') != null) {
  getlogbtn.hidden = false
  carts.hidden = false
}



if (getlogbtn) {
  getlogbtn.addEventListener('click', () => {
    getlogbtn.hidden = true
    carts.hidden = true
    let getimg = document.getElementById('profile')
    getimg.hidden = true
    let getlogin = document.getElementById('openModalBtn')
    getlogin.hidden = false
    localStorage.removeItem('name')
    localStorage.removeItem('img')
  })
}

function details(e) {
  sessionStorage.setItem('path', window.location.pathname)
  sessionStorage.setItem('sellerName', e.childNodes[3].childNodes[9].textContent)
  sessionStorage.setItem('detailSrc', e.childNodes[1].childNodes[1].src)
  sessionStorage.setItem('detailPrice', e.childNodes[3].childNodes[3].textContent)
  sessionStorage.setItem('detailDescription', e.childNodes[3].childNodes[7].textContent)
  sessionStorage.setItem('detailAddress', e.childNodes[3].childNodes[13].textContent)
  sessionStorage.setItem('detailContact', e.childNodes[3].childNodes[11].textContent)
  sessionStorage.setItem('detailName', e.childNodes[3].childNodes[1].textContent)
  location.href = '../Categories/product-details.html'
}

window.details = details

