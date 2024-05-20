let cartCount = 0;
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
    document.getElementById('cartNumberTop').innerText = cartCount;
    alert('Đã thêm thành công vào giỏ hàng')
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
            if (data?.product.image && data.product.image.length > 0) {
                const firstImage = data.product.image[1];
                const imageElement = document.createElement('img');
                imageElement.src = firstImage;
                imageContainerChild.appendChild(imageElement);
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
