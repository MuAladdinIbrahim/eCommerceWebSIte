var p = document.querySelector("#p");
function reqListener() {
  //console.log(this.responseText);
  var data = JSON.parse(this.responseText);
  console.log(data);

  //p.innerHTML=data["data"][0]["Name"];
  //parents div
  for (i = 0; i < data["data"].length; i++) {
   //product-grid__wrapper
   const productGrid=document.createElement('div');
   productGrid.classList="product-grid__product-wrapper";
   productGrid.id=`${data["data"][i]["ProductId"]}`;
   document.getElementById("product-grid").appendChild(productGrid);
   //product-grid__product
   const productGrid__product=document.createElement('div');
   productGrid__product.classList="product-grid__product wow bounceInUp";
   productGrid__product.id=`productgrid__product${i}`;
   document.getElementById(`${data["data"][i]["ProductId"]}`).appendChild(productGrid__product);

   //product-grid__img-wrapper
   const productGrid__img=document.createElement('div');
  productGrid__img.classList="product-grid__img-wrapper";
   productGrid__img.id=`productImg${i}`;
   document.getElementById(`productgrid__product${i}`).appendChild(productGrid__img);
  //add button
  const btncontainer = document.createElement('div');
  btncontainer.id = `Cart${i}`
  const add_button=document.createElement('button');
  add_button.classList="product-grid__btn product-grid__add-to-cart shop-item-button";
  add_button.innerText="Add To Cart";
  add_button.id =`AddCart${i}`;
  document.getElementById(`productgrid__product${i}`).appendChild(btncontainer);
  document.getElementById(`Cart${i}`).appendChild(add_button);

   //link ->`Product_details.html?id=${data["data"][i]["ProductId"]}`
   const productLink =document.createElement('a');
   productLink.id=`link${i}`
   productLink.href=`Product_details.html?id=${data["data"][i]["ProductId"]}`;
   document.getElementById(`productImg${i}`).appendChild(productLink)
   //productImg
   const productImg=document.createElement('img');
   productImg.src=data["data"][i]["ProductPicUrl"];
   productImg.classList="product-grid__img";
   productImg.id=`img${i}`;
   document.getElementById(`link${i}`).appendChild(productImg);
   //link
   const productLink2 =document.createElement('a');
   productLink2.id=`link2${i}`
   productLink2.href=`Product_details.html?id=${data["data"][i]["ProductId"]}`;
   document.getElementById(`productgrid__product${i}`).appendChild(productLink2)
   //product-grid__title
   const productTitle=document.createElement('span');
   productTitle.innerText=data["data"][i]["Name"];
   productTitle.classList="product-grid__title";
   productTitle.id=`title${i}`;
   document.getElementById(`link2${i}`).appendChild(productTitle);
   //product-grid__price
   const productGrid__price=document.createElement('span');
   productGrid__price.innerText=data["data"][i]["Price"];
   productGrid__price.classList="product-grid__price";
   productGrid__price.id=`price${i}`;
   document.getElementById(`link2${i}`).appendChild(productGrid__price);
   //product-grid__extend-wrapper
   const productGrid__extend=document.createElement('div');
   productGrid__extend.classList="product-grid__extend-wrapper";
   productGrid__extend.id=`product-extend${i}`;
   document.getElementById(`productgrid__product${i}`).appendChild(productGrid__extend);
   //product-grid__extend
   const productIn__extend=document.createElement('div');
   productIn__extend.classList="product-grid__extend";
   productIn__extend.id=`Inextend${i}`;
   document.getElementById(`product-extend${i}`).append(productIn__extend);
   //product-grid__description
   const productGrid__description=document.createElement('p');
   productGrid__description.classList="product-grid__description";
   productGrid__description.innerText=data["data"][i]["Description"];
   document.getElementById(`Inextend${i}`).appendChild(productGrid__description);

  }
  
  if ( i == data["data"].length){
    loadCart();
  }

  //pagination
  const TotalPage = data["total_pages"];
  for (i = 0; i < TotalPage; i++) {
    //pagination li
    const PaginationLi = document.createElement("li");
    PaginationLi.id = `page${i}`;
    document.getElementById("pagination").appendChild(PaginationLi)
    //pagination a
    const PaginationLink = document.createElement('a');
    PaginationLink.href = "?page=" + (i + 1);
    PaginationLink.id = `pag${i}`
    if (myParam == (i + 1)) {
      PaginationLink.classList = "active";
    }


    document.getElementById(`page${i}`).appendChild(PaginationLink)
    //title of link 
    const PaginationText = document.createElement('p');
    if(myParam == (i+1)) {PaginationText.classList = "text-light";}
    else{PaginationText.classList = "text-dark"};
    PaginationText.innerText = `${i + 1}`;
    document.getElementById(`pag${i}`).appendChild(PaginationText)
  }
}
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
const urlParams = new URLSearchParams(window.location.search);
var myParam = urlParams.get('page');
console.log(myParam);
if (myParam == null) {
  myParam = 1;
}
oReq.open("GET", "https://afternoon-falls-30227.herokuapp.com/api/v1/products?page=" + myParam, true);
oReq.send();

//setting he Product Id in the local storage
function getId(productId) {
  const pId = { id: productId };
  localStorage.setItem('pId', JSON.stringify(pId));
}

//function for search 
const formSubmit=document.getElementById("form_search");
// search cat
const searchBtn=document.getElementById("searchBtn");
//event
formSubmit.addEventListener("submit",(ev)=>{
  
  event.preventDefault();
  console.log(searchBtn.value);
  // Simulate an HTTP redirect:
  window.location.href="./search.html?cat="+searchBtn.value;
})
