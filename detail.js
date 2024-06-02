let cartCount = 0;
let imgSrc ="";
let sizePro = "";
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('productid');

function add() {
    cartCount++;
    document.getElementById('cartNumber').innerText = cartCount;
}
function minus() {
    cartCount--;
    document.getElementById('cartNumber').innerText = cartCount;
}
let cartCountTop = 0;
function addToCart() {
    cartCountTop++;
    console.log("kkk",imgSrc);
    var pri =  document.getElementById('price').textContent;
    var item_order = {
        pr_id : productId,
        qty :cartCount,
        price: pri,
        name : document.getElementById('name').textContent,
        size: sizePro,
        img : imgSrc,
        total_price: cartCount *  pri
    }
    console.log(item_order);
    
    var list = JSON.parse(localStorage.getItem('items_cart'))
    if(list){
        if(list.find(item=> item.pr_id === item_order.pr_id && item.size === item_order.size && item.img === item_order.img)){
            list.map((item) => ({
                ...item,
                    qty : item.qty + item_order.qty,
                    total_price  : item.total_price + item_order.total_price 
                }))
                 localStorage.setItem('items_cart',JSON.stringify(list))
        }
       else {
            list = [...list,item_order]
            localStorage.setItem('items_cart',JSON.stringify(list))
            alert('Đã thêm thành công vào giỏ hàng')
        }
        
        console.log("them 1 ");
    }else {
        list = [item_order]
        localStorage.setItem('items_cart',JSON.stringify(list))
        alert('Đã thêm thành công vào giỏ hàng')
    }
}
function callAPIDetail(){

    fetch(`http://localhost:8000/api/product/getProductById/${productId}`)
        .then(response => response.json())   
        .then(data => {
            document.getElementById('price').innerText = data?.product.price
            console.log(data); 
            document.getElementById('name').innerText = data?.product.name
            const imageContainer = document.getElementById('imageContainer');
            if (data?.product.image && data.product.image.length > 0) {
                const firstImage = data.product.image[0];
                const imageElement = document.createElement('img');
                imageElement.src = firstImage;
                imageContainer.appendChild(imageElement);
            } else {
                imageContainer.innerText = "No images available";
            }
            const imageContainerChild = document.getElementById('imageContainerChild');
            const chooseColorMin = document.getElementById('chooseColorMin');
            chooseColorMin.innerHTML ="";
            if (data?.product.image && data.product.image.length > 0) {
                const firstImage = data.product.image[1];
                const imageElement = document.createElement('img');
                imageElement.src = firstImage;
                imageContainerChild.appendChild(imageElement);
                data?.product?.image?.map((item)=>{
                    chooseColorMin.innerHTML += `
                <button class ="color-btn" onclick="highlightColor(this)">
                <img src=${item} alt="" class="color-btn">
                
                </button>`
                })
                
            } else {
                imageContainerChild.innerText = "No images available";
            }
            const chooseColor = document.querySelector('.chooseColor');
            chooseColor.addEventListener('click', (event) => {
                if (event.target.tagName === 'BUTTON') {
                    const imageContainerChild = document.getElementById('imageContainerChild');
                    imageContainerChild.innerHTML = ''; // Clear previous images
                    const imgSrc = event.target.querySelector('.color-btn').src;
                    const imageElement = document.createElement('img');
                    imageElement.src = imgSrc;
                    imageContainerChild.appendChild(imageElement);
                }
            });
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}

function highlightColor(button) {
    var buttons = document.querySelectorAll('.color-btn');
    buttons.forEach(function(btn) {
      btn.classList.remove('selected');
    });
    button.classList.add('selected');
    var img = button.querySelector("img")
    var imageUrl = img.getAttribute('src');
    imgSrc = imageUrl
    console.log(imageUrl);
    console.log("ddđ",button);
  }
  
function highlightSize(button) {
    var buttons = document.querySelectorAll('.size-btn');
    buttons.forEach(function(btn) {
      btn.classList.remove('selected');
    });
    button.classList.add('selected');
    console.log("nnnn",button.textContent);
    sizePro = button.textContent
}
