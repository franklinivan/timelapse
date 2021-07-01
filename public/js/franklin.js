const btnAdd = document.querySelectorAll('.btn-add');
const items = document.getElementById('items');
const toPay = document.getElementById('toPay');
let cart = [];

// Get JSON from LocalStorage if it exists
window.onload = ()=>{
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        setToCart();
    }
}

// add data-id to buttons...
for (let i = 0; i < btnAdd.length; i++) {
    let product = btnAdd[i];
    
    product.dataset.id = i+1;
    product.addEventListener('click', e =>{
        
        if (e.target.closest('.single-service')) {
            addToCart_Store(e.target.closest('.single-service'));
        } else if(e.target.closest('.about-us')){
            addToCart_Details(e.target.closest('.about-us'));
        }
    });
}

// Add product from view Store
const addToCart_Store= data =>{
    id = data.querySelector('.btn-add').dataset.id;
    title  = data.querySelector('h5').textContent;
    image  = data.querySelector('img').getAttribute('src');
    price = data.querySelector('p').textContent;
    category = data.querySelectorAll('input')[0].value;
    description = data.querySelectorAll('input')[1].value;

    const newProduct = {
        id,
        title,
        image,
        price,
        category,
        description
    }
    addNewProduct(newProduct);
}

// Add product from view Products Details
const addToCart_Details= data =>{
    id = data.querySelector('.btn-add').dataset.id;
    title  = data.querySelectorAll('span')[1].textContent;
    image  = data.querySelector('img').getAttribute('src');
    price = data.querySelector('h2').textContent;
    category = data.querySelectorAll('input')[0].value;
    description = data.querySelectorAll('input')[1].value;

    const newProduct = {
        id,
        title,
        image,
        price,
        category,
        description
    }

    addNewProduct(newProduct);
}

const addNewProduct = newProduct =>{

    // Validate if the product already exists from localStorage
    if(localStorage.getItem('cart')){
        cart1 = JSON.parse(localStorage.getItem('cart'));
        for (let i = 0; i < cart1.length; i++) {
            if(cart[i].title === newProduct.title){
                return;
            }
        }
    }

    // Validate if the product already exists from cart[]
    for (let i = 0; i < cart.length; i++) {
        if(cart[i].title === newProduct.title){
            return;
        }
    }

    cart.push(newProduct);
    setToCart();
}

// Set to new product to cartShop
const setToCart = ()=> {

    items.innerHTML = '';
    cart.forEach(item =>{
        const div = document.createElement('div');
        const content = `
        
        <div class="row">

            <div class="row">
                <div class="col-lg-12 d-flex justify-content-end">
                    <h6 class="delete" data-id="${item.id}" style="cursor: pointer;">x</h6>
                </div>
                <div class="col-lg-4 text-center">
                    <img src="${item.image}" alt="imagen" class="" style="height: 100px;">
                </div>
                <div class="col-lg-8 d-flex align-items-center">
                    <p>${item.description}</p>
                </div>
                <hr class="my-3">
            </div>

        </div>
        `
        div.innerHTML = content;
        items.appendChild(div);
        
        // Event listener to delete product
        div.querySelector('.delete').addEventListener('click',removeProduct);
    });
    cartToPay();

    // add new product to localStorage
    localStorage.setItem('cart',JSON.stringify(cart));
}

const cartToPay = () =>{
    
    toPay.innerHTML = '';
    const price = Object.values(cart).reduce((acum, { price }) => acum + 1 * price, 0);
    const itmb = price * 0.07;
    const nPrecio = (price + itmb).toFixed(2);

    toPay.innerHTML = `
    <div class="row">
        <div class="col-lg-12 mb-3 px-4 d-flex justify-content-between">
            <p class="d-inline">Sub Total</p>
            <p class=""><span>B/.</span> ${price.toFixed(2)}</p>
        </div>
        <div class="col-lg-12 mb-3 px-4 d-flex justify-content-between">
            <p class="d-inline">+ Itbms</p>
            <p class="">7%</p>
        </div>
        <div class="col-lg-12 px-4 d-flex justify-content-between">
            <h4 class="d-inline">Total</h4>
            <h4 class=""><span>B/.</span> ${nPrecio}</h4>
        </div>

        <hr class="my-3">
    </div>

    <div class="">
        <div class="col-lg-12 mb-3">
            <p>¿Tienes algún cupón o tarjeta de regalo?</p>
        </div>
        <div class="col-lg-12">
            <p>¿Te falta algún curso? <a href="/tienda" class="font-weight-bold" style="color: #3763EB !important;">Sigue comprando</a></p>
        </div>
    </div>
    `
}

// Delete Button
const removeProduct = e =>{

    const id = e.target.dataset.id;

    for (let i = 0; i < cart.length; i++) {
        if(cart[i].id === id){
            cart.splice(i,1);
            setToCart();
        }
    }
}