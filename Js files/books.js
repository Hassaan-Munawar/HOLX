import { collection,query,getDocs,db } from "./firebase.js";

document.addEventListener('contextmenu', function(event) {
  event.preventDefault(); 
});

let getdiv = document.getElementById('books')

async function foo() {

    const q = query(collection(db, "Books"));

    const querySnapshot = await getDocs(q);
    if(querySnapshot.size){
    querySnapshot.forEach((doc) => {
      getdiv.innerHTML +=`
   <div style='height:100%' onclick='details(this)' class="card p-0 mx-4 my-4">
          <div class="card-image">
              <img id='setimg' style='height:360px' src="${doc.data().image}" alt="Product Image">
              <div class="discount-badge">20% OFF</div>
          </div>
          <div  class="card-details">
              <h3 class="product-title">${doc.data().name}</h3>
              <p class="product-price">$ ${doc.data().price}</p>
              <p class="product-rating">⭐⭐⭐⭐☆ (4.5)</p>
              <p hidden>${doc.data().description}</P>
              <p hidden>${doc.data().sellerName}</P>
              <p hidden>${doc.data().contact}</P>
              <p hidden>${doc.data().address}</P>
          </div>
          <button class="add-to-cart">Check Details</button>
      </div>`
        });
  }
    else{
      getdiv.removeAttribute('class')
      getdiv.setAttribute('class','d-flex justify-content-center m-3 py-2')
      getdiv.innerHTML = `<img width="300px" src="../Images/product-not-found.jpg" alt="">`
    }
}

foo()
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
