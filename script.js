const products = [
{id:1,name:"Floral Printed Midi Dress",price:1200,image:"images/dress1.jpg",category:"dresses"},
{id:2,name:"Brown Printed Midi Dress",price:1300,image:"images/dress2.jpg",category:"dresses"},
{id:3,name:"Cotton Off-White Midi Dress",price:1400,image:"images/dress3.jpg",category:"dresses"},
{id:4,name:"Solid Yellow Long Dress",price:1100,image:"images/dress4.jpg",category:"dresses"},
{id:5,name:"Off-Shoulder Pink Long Dress",price:1600,image:"images/dress5.jpg",category:"dresses"},

{id:6,name:"Printed Grey Top",price:500,image:"images/top1.jpg",category:"tops"},
{id:7,name:"Yellow Printed Top",price:600,image:"images/top2.jpg",category:"tops"},
{id:8,name:"Cotton Printed Green Top",price:700,image:"images/top3.jpg",category:"tops"},
{id:9,name:"Off-White Poncho Top",price:800,image:"images/top4.jpg",category:"tops"},
{id:10,name:"Solid Black Top",price:500,image:"images/top5.jpg",category:"tops"},

{id:11,name:"Baggy Jeans",price:1200,image:"images/jeans1.jpg",category:"jeans"},
{id:12,name:"Slim Fit Jeans",price:900,image:"images/jeans2.jpg",category:"jeans"},
{id:13,name:"Ripped Jeans",price:1200,image:"images/jeans3.jpg",category:"jeans"},
{id:14,name:"Black Bootcut Jeans",price:1300,image:"images/jeans4.jpg",category:"jeans"},
{id:15,name:"Blue Flared Jeans",price:1200,image:"images/jeans5.jpg",category:"jeans"},

{id:16,name:"Cotton Floral Kurti",price:900,image:"images/kurti1.jpg",category:"kurtis"},
{id:17,name:"Straight Printed Pink Kurti",price:900,image:"images/kurti2.jpg",category:"kurtis"},
{id:18,name:"Cotton White Kurti",price:1100,image:"images/kurti3.jpg",category:"kurtis"},
{id:19,name:"Ethnic Pink Kurti",price:1200,image:"images/kurti4.jpg",category:"kurtis"},
{id:20,name:"Yellow Collared Kurti",price:1100,image:"images/kurti5.jpg",category:"kurtis"}
];

let cart = [];

/* 🏠 HOME */
function showHome(){
let box=document.getElementById("products");
box.innerHTML="";

let cats=["dresses","tops","jeans","kurtis"];

cats.forEach(cat=>{
let item=products.find(p=>p.category===cat);

box.innerHTML+=`
<div class="card">
<img src="${item.image}">
<h3>${item.name}</h3>
<p>₹${item.price}</p>
<button onclick="filterCategory('${cat}')">View All</button>
</div>
`;
});
}

/* 📂 CATEGORY */
function filterCategory(cat){
let box=document.getElementById("products");
box.innerHTML="";

products.filter(p=>p.category===cat).forEach(p=>{
box.innerHTML+=`
<div class="card">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button onclick="add(${p.id}, this)">Add to Cart</button>
</div>
`;
});
}

/* 🔍 SEARCH */
function searchProducts(){
let val=document.getElementById("searchInput").value.toLowerCase();
let box=document.getElementById("products");
box.innerHTML="";

let filtered=products.filter(p=>
p.name.toLowerCase().includes(val)
);

filtered.forEach(p=>{
box.innerHTML+=`
<div class="card">
<img src="${p.image}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button onclick="add(${p.id}, this)">Add to Cart</button>
</div>
`;
});
}

/* 🛒 ADD TO CART */
function add(id, btn){
let item=products.find(p=>p.id===id);

let existing=cart.find(i=>i.id===id);

if(existing){
existing.qty++;
} else {
cart.push({...item, qty:1});
}

if(btn){
btn.innerText="Added ✔";
btn.disabled=true;
}

updateCart();
}

/* 🛒 UPDATE CART */
function updateCart(){
let count=0;
let total=0;

cart.forEach(i=>{
count+=i.qty;
total+=i.price*i.qty;
});

document.getElementById("cartCount").innerText=count;

let box=document.getElementById("cartItems");
box.innerHTML="";

cart.forEach(i=>{
box.innerHTML+=`
<div style="padding:10px;border-bottom:1px solid #ddd">
<h4>${i.name}</h4>
<p>₹${i.price}</p>

<div style="display:flex;gap:10px;align-items:center">
<button onclick="decrease(${i.id})">-</button>
<span>${i.qty}</span>
<button onclick="increase(${i.id})">+</button>
</div>

<p>Total: ₹${i.price*i.qty}</p>
</div>
`;
});

document.getElementById("total").innerText=total;
}

/* ➕ INCREASE */
function increase(id){
let item=cart.find(i=>i.id===id);
item.qty++;
updateCart();
}

/* ➖ DECREASE */
function decrease(id){
let item=cart.find(i=>i.id===id);
item.qty--;

if(item.qty<=0){
cart=cart.filter(i=>i.id!==id);
}

updateCart();
}

/* 🛒 CART TOGGLE */
function toggleCart(){
document.getElementById("cart").classList.toggle("active");
}

/* 🧾 CHECKOUT */
function openCheckout(){
document.getElementById("checkout").classList.add("active");

let box=document.getElementById("orderSummary");
let total=0;

box.innerHTML="<h4>Order Summary</h4>";

cart.forEach(i=>{
total+=i.price*i.qty;
box.innerHTML+=`<p>${i.name} x ${i.qty} = ₹${i.price*i.qty}</p>`;
});

box.innerHTML+=`<hr><b>Total: ₹${total}</b>`;
}

function closeCheckout(){
document.getElementById("checkout").classList.remove("active");
}

function placeOrder(e){
e.preventDefault();

alert("🎉 Order Placed Successfully!");

cart=[];
updateCart();

closeCheckout();
toggleCart();
}

/* INIT */
showHome();