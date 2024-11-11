import {menuArray} from "/data.js"

const orderHeader = document.getElementById('order-header')
const order = document.getElementById('order')
const total = document.getElementById('total')
const completeOrderBtn = document.getElementById('complete-order-btn')
const modal = document.getElementById('modal')
const message = document.getElementById('message')

let orderArray = []
let totalPrice = 0
let indexForRemove = -1
let disableButtons = false

document.addEventListener ('click', function(e){
   console.log(e.target)
    if(e.target.dataset.add && disableButtons===false){
        //push item to order array
        addItemToOrder(e.target.dataset.add)
    }
    else if(e.target.dataset.remove && disableButtons === false){
        //remove item from order array
        removeOrderedItem(e.target.dataset.remove)
        document.getElementById('order').innerHTML = renderOrderHTML(orderArray)
        document.getElementById('total').innerHTML = renderTotalHTML()
        updateVisibility()
    }
    else if(e.target.id==='complete-order-btn' && disableButtons===false) {
        //disable all buttons on main screen when the modal comes up
        disableMainButtons ()
        modal.style.display="block"
    }
    else if(e.target.id==='pay-btn') {
        handlePaymentAndClose()
    }
    else if(e.target.id==='close-modal'){
        modal.style.display = "none"
        enableMainButtons()
    }
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
            location,
            price,
            thumbnail,
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

function disableMainButtons() {
    disableButtons = true
}

function enableMainButtons() {
    disableButtons = false
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
    //remove an ordered item
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
        //enable buttons
        enableMainButtons()
    }
}
 
document.getElementById('menu').innerHTML = renderMenuHTML(menuArray)