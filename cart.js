let cartCount = 0;
function add() {
    cartCount++;
    document.getElementById('cartNumber').innerText = cartCount;
}
function minus() {
    cartCount--;
    document.getElementById('cartNumber').innerText = cartCount;
}

function callApi() {
    console.log("12344");
    var list = JSON.parse(localStorage.getItem('items_cart'));
    console.log(list.length);
    if (list) {
        var table = document.getElementById('tbody_item');
        table.innerHTML = ''; // Xóa nội dung cũ của bảng trước khi thêm dữ liệu mới
        list.forEach((item, index) => {
            console.log("item", item?.img);
            var totalPricePerItem = item.price * item.qty; // Tính tổng tiền của mỗi sản phẩm
            table.innerHTML += `
                <tr>
                    <th scope="row" class="productLeft">
                        <div>
                            <img src=${item?.img} alt="">
                        </div>
                        <div>
                            <p>${item?.name}</p>
                            <p>Phân loại hàng: ${item?.size}</p>
                        </div>
                    </th>
                    <td>${item?.price.toLocaleString()}</td>
                    <td>
                        <div class="chooseQuantity">
                            <div class="quantity-minus" data-index="${index}">-</div>
                            <div class="quantity" id="cartNumber_${index}">${item?.qty}</div>
                            <div class="quantity-plus" data-index="${index}">+</div>
                        </div>
                    </td>
                    <td id="totalPrice_${index}">${totalPricePerItem.toLocaleString()}</td>
                    <td class="deleteProduct"><button class="delete-btn" data-index="${index}"><i class="uil uil-trash-alt"></i></button></td>
                </tr>
            `;
        });

        // Lắng nghe sự kiện click trên các nút "+" và "-"
        var quantityPlusButtons = document.querySelectorAll('.quantity-plus');
        var quantityMinusButtons = document.querySelectorAll('.quantity-minus');
        quantityPlusButtons.forEach(button => {
            button.addEventListener('click', function() {
                var index = parseInt(this.getAttribute('data-index'));
                var quantityElement = document.getElementById(`cartNumber_${index}`);
                var totalPriceElement = document.getElementById(`totalPrice_${index}`);
                list[index].qty++; // Tăng số lượng sản phẩm
                quantityElement.textContent = list[index].qty; // Cập nhật số lượng trong DOM
                var totalPricePerItem = list[index].price * list[index].qty; // Tính tổng tiền của sản phẩm
                totalPriceElement.textContent = totalPricePerItem; // Cập nhật tổng tiền trong DOM
                localStorage.setItem('items_cart', JSON.stringify(list)); // Lưu lại danh sách mới
            });
        });
        quantityMinusButtons.forEach(button => {
            button.addEventListener('click', function() {
                var index = parseInt(this.getAttribute('data-index'));
                var quantityElement = document.getElementById(`cartNumber_${index}`);
                var totalPriceElement = document.getElementById(`totalPrice_${index}`);
                if (list[index].qty > 1) {
                    list[index].qty--; // Giảm số lượng sản phẩm
                    quantityElement.textContent = list[index].qty; // Cập nhật số lượng trong DOM
                    var totalPricePerItem = list[index].price * list[index].qty; // Tính tổng tiền của sản phẩm
                    totalPriceElement.textContent = totalPricePerItem; // Cập nhật tổng tiền trong DOM
                    localStorage.setItem('items_cart', JSON.stringify(list)); // Lưu lại danh sách mới
                }
            });
        });
        var deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                var index = parseInt(this.getAttribute('data-index'));
                list.splice(index, 1); // Xóa phần tử khỏi mảng list
                localStorage.setItem('items_cart', JSON.stringify(list)); // Lưu lại danh sách mới
                callApi(); // Gọi lại hàm callApi để cập nhật bảng
            });
        });
    } else {
        alert('Chưa có sản phẩm nào được thêm vào giỏ hàng');
    }
}



