import {menuArray} from "/data.js"

const orderHeader = document.getElementById('order-header')
const order = document.getElementById('order')
const total = document.getElementById('total')
const completeOrderBtn = document.getElementById('complete-order-btn')
const modal = document.getElementById('modal')
const payBtn = document.getElementById('pay-btn')
const message = document.getElementById('message')
const closeModal = document.getElementById('close-modal')

let orderArray = []
let totalPrice = 0
let indexForRemove = -1

document.addEventListener ('click', function(e){
   
    if(e.target.dataset.add){
        //function to push item to order array
        addItemToOrder(e.target.dataset.add)
    }
    if(e.target.dataset.remove){
        //function to remove item from order array
        removeOrderedItem(e.target.dataset.remove)
        document.getElementById('order').innerHTML = renderOrderHTML(orderArray)
        document.getElementById('total').innerHTML = renderTotalHTML()
        updateVisibility()
    }
    if(e.target.dataset.btnComplete) {
        console.log(e.target.dataset.btnComplete)
    }
})

completeOrderBtn.addEventListener('click', function(){
    completeOrderBtn.parentElement.classList.add('gradient')
    modal.style.display="block"
})

payBtn.addEventListener('click', function(){
    handlePaymentAndClose()
})

closeModal.addEventListener('click', function(){
    modal.style.display = "none"
    completeOrderBtn.parentElement.classList.remove('gradient')
})

function renderMenuHTML(menuArr) {
    return menuArr.map(menuItem => {
        const {
            name,
            location,
            price,
            thumbnail,
            id
        } = menuItem
        
        return `
            <div class="menu-container" id="menu-container">
                <div class="item-picture">
                   <img class="item-icon" src="/images/${thumbnail}">
                </div>
                <div class="item-info">
                   <p class="item-title">${name}</p>
                   <p class="item-ingredients">${location}</p>
                   <p class="item-price">$${price}</p>
                </div>
                <div class="add-item">
                   <button class="add-item-btn" data-add="${id}">+</button>
                </div>
            </div>  
            <hr class="menu-line">
        `
    }).join('')
}

function addItemToOrder (menuId) {
    //if an order was already created and paid for, clear message before starting again
    if(message != ''){
        message.textContent = ''
        message.style.display = "none"
    }
    
    //add item clicked to array and get total price for order
    orderArray.push(menuArray[menuId])
    document.getElementById('order').innerHTML = renderOrderHTML(orderArray)
    document.getElementById('total').innerHTML = renderTotalHTML()
    updateVisibility()
}

function renderOrderHTML(orderArr) {
    let total = 0
        return orderArr.map(orderItem => {
        const {
            name,
            ingredients,
            price,
            emoji,
            id
        } = orderItem
        total += price
        totalPrice = total
        
        return `
            <div class="order-container" id="order-container">
                <div class="order-item-container" id="order-item-container">
                    <p class="item-ordered">${name}</p>
                    <button class="remove-btn" data-remove="${id}">remove</button>
                    <p class="item-cost">$${price}</p>
            </div> 
            `    
        }).join('')
}

function renderTotalHTML() {
        return `
            <hr class="total-line" id="total-line">
            <div class="total-container" id="total-container">
                <p class="total-label" id="total-label">Total price:</p>
                <p class="total-cost" id="total-cost">$${totalPrice}</p>
            </div>
        `
}

function removeOrderedItem(orderId) {
    //function to remove an ordered item
    const arr = orderArray.map(function(order, index){ 
        if(order.id === Number(orderId)){
            indexForRemove = index
        }
    })   
    return orderArray.splice(indexForRemove,1)
}

function updateVisibility() {
    if(orderArray.length>0){
        orderHeader.style.display = "block"
        order.style.display = "block"
        total.style.display = "block"
        completeOrderBtn.style.display = "block"
    }
    else {
        orderHeader.style.display = "none"
        order.style.display = "none"
        total.style.display = "none"
        completeOrderBtn.style.display = "none"
    }
}

function handlePaymentAndClose() {
    const fullName = document.getElementById('fullName').value
    const cardNumber = document.getElementById('cardNumber').value
    const cvv = document.getElementById('cvv').value
   
    if(fullName !== '' && cardNumber !== '' && cvv !== '') {
         //gradient on main screen will be removed when payment is complete
        completeOrderBtn.parentElement.classList.remove('gradient')
        //first make the modal and the order section go away
        modal.style.display = "none"
        orderArray = []
        updateVisibility()
        //then set the thank you message
        message.innerText = `Thanks, ${fullName}!  Your order is on its way!`
        message.style.display = "block"
        //then clear the form inputs
        document.getElementById('fullName').value = ''
        document.getElementById('cardNumber').value = ''
        document.getElementById('cvv').value = ''
    }
}
 
document.getElementById('menu').innerHTML = renderMenuHTML(menuArray)