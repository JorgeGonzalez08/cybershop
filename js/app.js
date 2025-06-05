const notification = document.getElementById('notification')
let title = document.getElementById('title')
let code = document.getElementById('code')
let price = document.getElementById('price')
let stock = document.getElementById('stock')

async function fetchApi(){
    let res = await fetch('http://localhost:3000/api/products')
    let data = await res.json()
    return data
}
let sendProducts=async (title,code,price,stock) => {
    let res = await fetch('http://localhost:3000/api/products',{
        method:"post",
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
    window.location.reload()
    return 
}

let deteleProduct=async (id) => {
    let res= await fetch(`http://localhost:3000/api/products/${id}`,{
        method:'delete'
    })
    let data = await res.json()
    window.location.reload()
    return  
}

let updateProduct= (id) => {
    console.log(id)
    
}


const cards = document.querySelector('.cards')
fetchApi()
    .then(result => {
        result.payload.forEach(product => {
            // console.log(product.title)

            const deleteButton = document.createElement('button')
            deleteButton.classList='button'
            deleteButton.textContent='Eliminar'
            deleteButton.onclick=()=>deteleProduct(product._id)

            // const updateButton = document.createElement('a')
            // updateButton.classList='button'
            // updateButton.textContent='Modificar'
            // updateButton.href=`./pages/update.html?id=${product._id}`
            // updateButton.onclick=() => updateProduct(product._id)

            let card = document.createElement('div')
            card.classList='card'
            card.innerHTML=
                `<h2>${product.title}</h2>
                <p>Code: ${product.code}</p>
                <p>Price: $${product.price}</p>
                <p>Stock: ${product.stock}</p>
                <a class="button" href="pages/update.html?id=${product._id}">Modificar</a>`
                card.appendChild(deleteButton)
                // card.appendChild(updateButton)
                
            cards.appendChild(card)
        });
    })
    .catch(error => console.log(error))


const form = document.getElementById('form')

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

    // fetch('http://localhost:3000/api/products',{
    //     method:"post",
    //     headers:{
    //         'Content-Type':'application/json'
    //     },
    //     body: JSON.stringify({
    //         title,
    //         code,
    //         price,
    //         stock
    //     })
    // })
    sendProducts(title,code,price,stock)
    // .then(response=>{
    //     if(!response.ok) throw new Error('Error en el servidor')
    //     return response.json()
    // })
    .then(data => notification.innerText='Producto enviado')
    .catch(error=>{
        console.log(error)
        return notification.innerText='Error al enviar el producto'
    })
    
    // console.log(title)
    // console.log(code)
    // console.log(price)
    

})