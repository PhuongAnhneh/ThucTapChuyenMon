let cartCount = 0;
function add() {
    cartCount++;
    document.getElementById('cartNumber').innerText = cartCount;
}
function minus() {
    cartCount--;
    document.getElementById('cartNumber').innerText = cartCount;
}

function callApi () {
    console.log("12344");
    var list = JSON.parse(localStorage.getItem('items_cart'))
    console.log(list.length);
    if(list.length > 0){
        var table = document.getElementById('tbody_item')
        list.map(item =>{
            console.log("item",item?.img);
            table.innerHTML += `
            <tr>
            <th scope="row" class="productLeft">
                <div>
                    <img src=${item?.img} alt="">
                </div>
                <div>
                    <p>${item?.name}</p>
                    <p>Phân loại hàng:  ${item?.size}</p>
                </div>
            </th>
            <td>${item?.price}</td>
            <td>
                <div class="chooseQuantity">
                    <div>-</div>
                    <div id="cartNumber">${item?.qty}</div>
                    <div>+</div>
                </div>
            </td>
            <td>${item?.total_price}</td>
            <td class="deleteProduct"><i class="uil uil-trash-alt"></i></td>
          </tr>
            `
        })
    }
}