class UI {

  async checkAdd () {
    const id = localStorage.getItem('idProduct') || 1;  //ADD JHONAIKER
    const size = localStorage.getItem('size').toUpperCase();
    const data = (await (await fetch('http://localhost:4000/products')).json()).find(e => e.id == id);
    
    
    if (data.cantidad[size] > 0) {
      data.cantidad[size]--;
      alert("entra");

      console.log(data);

      await fetch(`http://localhost:4000/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json; charset=UTF-8" }
      });

      this.addProduct(data);

    } else {
      alert("No más productos de esa talla");
    }
  }

  addProduct (data) {
    
    /* MIre si hay producto */

    const currCompra = JSON.parse(localStorage.getItem('Compra'));
    const id = localStorage.getItem('idProduct') || 1;  //ADD JHONAIKER
    const size = localStorage.getItem('size');

    if (currCompra.some(e => e.id == id)) {
      currCompra.find(e => e.id == id).cantidad ++;
    } else {
      const p = {
        "img": data.img[0],
        "nombre": data.title ,
        "precio": data.precio,
        "cantidad": data.cantidad ,
        "id": data.id,
      }
      
      currCompra.push(p); 
    }

    localStorage.setItem('Compra', JSON.stringify(currCompra));
  }

  changeSizeStyle (allSize, size) {
    allSize.querySelectorAll('.size').forEach(e => e.style.border = '.2rem solid #ffffff');
    size.style.border = '.2rem solid #000000';
  }


  async showProduct () {
    const id = localStorage.getItem('idProduct') || 1;  //ADD JHONAIKER
    const data = (await (await fetch('http://localhost:4000/products')).json()).find(e => e.id == id);

    document.getElementById('injeccion').innerHTML =
    `
  
    <div class="col-md-2"> 
      <div class="model-2"> <img src="${data.img[0]}" alt=""> </div>
      <div class="model-2"> <img src="${data.img[0]}" alt=""> </div>
      <div class="model-2"> <img src="${data.img[0]}" alt=""> </div>
    </div>
    <div class="col-md-4">
      <div class="model-1"> <img src="${data.img[0]}" alt=""> </div>
      <div class="model-1"> <img src="${data.img[0]}" alt=""> </div>
      <div class="model-1"> <img src="${data.img[0]}" alt=""> </div>
    </div>
    <div class="col-md-5">
      <h2 class="titulo-1"> ${data.title} </h2>
      <div class="precio">
        <h3 class="card-title pricing-card-title ">$<span class=""> ${data.precio} </span></h3>
      </div>  
      <div class="tallas"  id="Ticki">
        <h5> Size </h5>
        <span><img src="./img/S.png" id="s" class="size"></span>
        <span><img src="./img/M.png" id="m" class="size"></span>
        <span><img src="./img/L.png" id="l" class="size"></span>
        <span><img src="img/XL.png" id="xl" class="size"></span>
        <span><img src="img/XXL.png" id="xxl" class="size"></span>
      </div>
      <div class="but-ons">
        <button type="button" class="btn btn-primary" id="addCard" > ADD TO CART </button>
      </div>
      <div class="but-ons off-less">
        <button type="button" class="btn btn-dark" id="compraHref"> BUY IT NOW </button>  <!--ENLACE A CARRITO -->
      </div>  
      <div class="texto">
        <p> ${data.descripcion} </p>
      </div>
    </div>
    `

    return "true";
  }
}


window.addEventListener('DOMContentLoaded', e =>{
  const userInterface = new UI();
  const currCompra = JSON.parse(localStorage.getItem('Compra')) || [];
  localStorage.removeItem('size');
  localStorage.setItem('Compra', JSON.stringify(currCompra));
  userInterface.showProduct();
});


document.getElementById('injeccion').addEventListener('click', e => {
  const userInterface = new UI();

  if(e.target.classList.contains('size')){
    localStorage.setItem('size', e.target.id);
    userInterface.changeSizeStyle(e.target.parentElement.parentElement, e.target);
  }
  
  if(e.target.id == 'addCard'){
    if(localStorage.getItem('size'))
      userInterface.checkAdd();
  }

  if(e.target.id == 'compraHref') window.open('compra.html', '_self');

});
