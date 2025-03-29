import {menuArray} from "/data.js"

const orderArray = []

document.addEventListener("click", e => {
    if (e.target.dataset.id) {
        handleAddOrder(Number(e.target.dataset.id))
    } else if (e.target.dataset.index) {
        handleRemoveOrder(Number(e.target.dataset.index))
        console.log(e.target.dataset.index)
    } else if (e.target.id === "order-btn") {
        handleCompleteOrder()
    } else if (e.target.id === "pay-btn") {
        e.preventDefault()
        thankUser()
    }
})

function handleAddOrder(id) {
    if (orderArray.length === 0) {
        document.getElementById("container-bottom").classList.toggle("hidden")
    }
    for (const menuItem of menuArray) {
        if (menuItem.id === id) {
            orderArray.push(menuItem)
            break
        }
    }
    render()
}

function handleRemoveOrder(index) {
    orderArray.splice(index, 1)
    if (orderArray.length === 0) {
        document.getElementById("container-bottom").classList.toggle("hidden")
    }
    render()
}

function handleCompleteOrder() {
    document.getElementById("modal").classList.toggle("hidden")
}

function thankUser() {
    document.getElementById("modal").classList.toggle("hidden")
    document.getElementById("container-bottom").innerHTML = `
        <div class="thanks-modal">Thanks, James! Your order is on its way!</div>
    `
}

function getMenuHtml() {
    return menuArray.map(item => {
        const {emoji, name, ingredients, price, id} = item
        
        return `
            <div class="item">
                <span class="emoji">${emoji}</span>
                <div>
                    <p class="name">${name}</p>
                    <p class="ingredients">${ingredients.join(", ")}</p>
                    <p class="price">$${price}</p>
                </div>
                <div class="btn-bg"><span class="cross-btn" data-id="${id}">+</span></div>
            </div>   
        `
    }).join("")
}

function getOrderHtml() {
    let orderHtml = `
        <h3>Your order</h3>
        <div class="order-list">
    `
    
    orderHtml += orderArray.map((item, index) => {
        const {name, price} = item
        
        return `
            <div class="order-item">
                <span class="order-name">${name}</span>
                <span class="order-remove" data-index="${index}">remove</span>
                <span class="order-price">$${price}</span>
            </div>
        `
    }).join("")
    
    orderHtml += `</div>`
    orderHtml += `
        <div class="order-item">
            <span class="order-name">Total</span>
            <span class="order-price">$${orderArray.reduce((total, current)=>total+current.price, 0)}</span>
        </div>
    `
    orderHtml += `<button class="order-btn" id="order-btn">Complete order</button>`
    return orderHtml
}

function render() {
    document.getElementById("container-middle").innerHTML = getMenuHtml()
    document.getElementById("container-bottom").innerHTML = getOrderHtml()
}

render()