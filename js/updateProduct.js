const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// console.log(productId)
let p=document.getElementById('id')
// p.textContent=productId

async function fetchApi(){
    let res = await fetch(`https://cybershop-backend-production.up.railway.app/api/products/${productId}`)
    let data = await res.json()
    return data.payload
}

let update =async (title,code,price,stock) => {
    let res = await fetch(`https://cybershop-backend-production.up.railway.app/api/products/${productId}`,{
        method:"put",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            title,
            code,
            price,
            stock
        })
    })
    let data = await res.json()
    return 
}

fetchApi()
.then(product => {
    let title = document.getElementById('title')
    let code = document.getElementById('code')
    let price = document.getElementById('price')
    let stock = document.getElementById('stock')
    // console.log(product.title)

    title.value=product.title
    code.value = product.code
    price.value = product.price
    stock.value = product.stock

    // let update = await
    const form = document.getElementById('updateForm')
    form.addEventListener('submit',(event) => {
        event.preventDefault()
        
    
        title = String(title.value).trim()
        code = String(code.value).trim()
    
        price = Number(price.value)
        stock = Number(stock.value)
    
        if (isNaN(price) || isNaN(stock)) {
            return notification.innerText='Price y Stock son campos numericos'
        }
        
        if (!title || !code || !price || !stock) {
            return notification.innerText='Debes enviar todos los campos'
        }
        update(title,code,price,stock)
        .then(data => notification.innerText='Producto modificado')
        .catch(error=>{
            console.log(error)
            return notification.innerText='Error al modificar el producto'
        })
    })
})