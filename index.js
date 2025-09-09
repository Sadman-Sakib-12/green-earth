
const categoryContainer = document.getElementById("category-Container")
const cardContainer = document.getElementById("card-Container")
const yourCart = document.getElementById("your-cart")
const yourcartContainer = document.getElementById("your-cart-container")
const cardsDetelsModal=document.getElementById("cards-detels-modal")
const modalContainer=document.getElementById("modal-container")



let all = []
const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((data) => showCategory(data.categories))
}


const showCategory = (categories) => {
    categoryContainer.innerHTML = ""
    categories.forEach((sakib) => {
        categoryContainer.innerHTML += `
        
        <div >
         <button id="${sakib.id}" class="b-4 hover:bg-[#15803D]  py-2 px-4 rounded mt-2" >${sakib.category_name}</button>
         </div>
        `
        categoryContainer.addEventListener("click", (e) => {
            //  console.log(e)
            const all = document.querySelectorAll("button")
            all.forEach((button) => {
                button.classList.remove("b-4")
            })
            if (e.target.localName == "button") {
                showLoading()
                e.target.classList.add("b-4")
                loadCart(e.target.id)
            }
        })
    })
}

const loadCart = (id) => {
    let url = id ? `https://openapi.programming-hero.com/api/category/${id}` : "https://openapi.programming-hero.com/api/plants"
    fetch(url)
        .then((res) => res.json())
        .then((data) => showcart(data.plants))
}

let carts = []

const showcart = (plants) => {
    cardContainer.innerHTML = ""
    plants.forEach((plant) => {
        cardContainer.innerHTML += `
        <div id="${plant.id}" class="bg-[#FFFFFF] p-5 w-72  space-y-1 h-94 gap-10 shadow">
                  <img class="w-70 h-40 rounded" src="${plant.image}" alt="">
                     <p onclick="handleDetels('${plant.id}')" class="bt font-bold">${plant.name}</p>
                     <p class="text-xs">${plant.description}</p>
                     
                     <div class="flex justify-between items-center">
                        <button class="bg-[#DCFCE7] py-2 px-3 rounded-full text-[#15803D]">${plant.category}</button>
                       <button>${plant.price}</button>
                        </div>
                    <button class="add-to-cart bg-[#15803D] text-white text-xs py-3 px-22 rounded-full ">Add to Cart</button>
        </div>
        `
    })
}
cardContainer.addEventListener("click", (e) => {

    if (e.target.innerText === "Add to Cart") {
        handleAdd(e)
    }
})
const handleAdd = (e) => {
    const name = e.target.parentNode.children[1].innerText
    const price = parseFloat(e.target.parentNode.children[3].children[1].innerText)
    const id = e.target.parentNode.id+Date.now()
    alert(`${name} has been added to cart`)
    carts.push({
        name,
        price,
        id
    })
    showAdd(carts)
}
const showAdd = (carts) => {
    yourcartContainer.innerHTML = " "
    let total = 0
    carts.forEach(cart => {
        total += cart.price
        yourcartContainer.innerHTML += `
        <div>
        <div class="flex justify-between items-center">
        <h1  class="font-bold">${cart.name}</h1>
        <button onclick="handleDelete('${cart.id}')" class="w-10"><img src="./assets/close-window.png" alt=""></button>
        </div>
        
        <h1>${cart.price}</h1>
        
       </div>
        `
    })
    const totalAll = document.createElement("div")
    totalAll.innerHTML += `
        <hr/>
        <div class="flex justify-between items-center">
        <h1>Total:</h1>
         <h1>${total}</h1>
        </div>
       
    `
    yourcartContainer.appendChild(totalAll)
}
const handleDelete=(cartId)=>{
    const filterCart=carts.filter(cart=>cart.id !== cartId)
    carts=filterCart
    showAdd(carts)
}
const showLoading=()=>{
    cardContainer.innerHTML=`
     <div class="w-9"><img src="./assets/interface.png" alt=""></div>
    `
}

const handleDetels=(id)=>{
 fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
 .then((res)=>res.json())
 .then((data)=>showdetels(data.plants)
    )
}
const showdetels=(plant)=>{
   modalContainer.innerHTML=""
    cardsDetelsModal.showModal()
    modalContainer.innerHTML= `
    <div class="p-2 space-y-4">
    <h1 class="font-bold">${plant.name}</h1>
    <img class="w-full h-60" src="${plant.image}" alt="">
    <p class="font-bold">Category:${plant.category}</p>
    <p class="font-bold">Price:${plant.price}</p>
    <p class="font-bold">Description:${plant.description}</p>
   
    </div>
   
    `
}

loadCart()
loadCategory()