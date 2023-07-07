const socketProducts = io()  

socketProducts.on("realtimeproducts", async(data) => {
    let htmlContent = `<h3>Se encontraron :</h3>`
    data.forEach(element => {
         htmlContent += `
        <div>
            <p>Id: ${element.id}</p>
            <p>Titulo: ${element.title}</p>
            <p>Descripcion: ${element.description}</p>
            <p>Codigo: ${element.code}</p>
            <p>Precio: ${element.price}</p>
            <p>Estado: ${element.status}</p>
            <p>Stock: ${element.stock}</p>            
            <p>Categoria: ${element.category}</p>
            <p>Thumbnail ${element.thumbnail}</p>
        </div>
        `        
    });
    const productContainer = document.getElementById("containerProducts")
    productContainer.innerHTML = htmlContent;  

});
const productForm = document.getElementById("productForm")
productForm.addEventListener("submit", (evt)=>{
    evt.preventDefault()
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        code: document.getElementById("code").value,
        price: document.getElementById("price").value,
        status:true,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        thumbnail: [document.getElementById("thumbnail").value]
    }
    socketProducts.emit("newProduct",product);
    productForm.reset()
})
    


