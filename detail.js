let cartCount = 0;
let imgSrc ="";
let sizePro = "";
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
    var item_order = {
        pr_id : 0,
        qty :cartCount,
        price: document.getElementById('price').textContent,
        name : document.getElementById('name').textContent,
        size: sizePro,
        img : imgSrc,
        total_price:100
    }
    console.log(item_order);
    // localStorage.removeItem('items_cart')
    var list = localStorage.getItem('items_cart')
    if(list){
        var ld = JSON.parse(list)
    console.log("ffff",ld);

        var newlist = ld.push(item_order)
        localStorage.setItem('items_cart',JSON.stringify(newlist))
        console.log("them 1 ");
    }else {
        localStorage.setItem('items_cart',JSON.stringify([item_order]))
        console.log("tao new");
    }
    // document.getElementById('cartNumberTop').innerText = cartCount;
    // alert('Đã thêm thành công vào giỏ hàng')
}
function callAPIDetail(){
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productid');

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
