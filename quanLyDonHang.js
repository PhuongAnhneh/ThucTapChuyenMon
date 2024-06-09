var userId = null
// Lấy dữ liệu từ Local Storage
var userInfoString = localStorage.getItem("user_info");

// Kiểm tra xem dữ liệu có tồn tại hay không
if (userInfoString) {
    // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
    var userInfo = JSON.parse(userInfoString);

    // Sử dụng dữ liệu userInfo ở đây
    console.log(userInfo);
} else {
    console.log("Không tìm thấy dữ liệu trong Local Storage");
}

// Gọi API để lấy đơn hàng dựa trên user_id
async function getOrdersByUserId(userId) {
    try {
        const response = await fetch(`/orders/${userId}`);
        if (!response.ok) {
            throw new Error('Lỗi khi lấy đơn hàng');
        }
        const orders = await response.json();
        return orders;
    } catch (error) {
        console.error(error);
    }
}

// Gọi hàm để lấy đơn hàng dựa trên user_id cụ thể
const userId = 'your_user_id_here'; // Thay 'your_user_id_here' bằng user_id cụ thể bạn muốn lấy đơn hàng
getOrdersByUserId(userId)
    .then(orders => {
        // Xử lý dữ liệu đơn hàng ở đây
        console.log('Đơn hàng của user_id', userId, ' là:', orders);
    })
    .catch(error => {
        console.error('Lỗi:', error);
    });




// window.onload = function() {
//     // Lấy thông tin đơn hàng từ localStorage
//     var order = JSON.parse(localStorage.getItem('orderDetails'));

//     // Hiển thị thông tin đơn hàng lên bảng
//     var tableBody = document.getElementById("table"); // Thay "your_table_body_id" bằng id thực của tbody

//     var tableRow = `
//         <tr  id="orderRow">
//             <th scope="row">1</th>
//             <td>
//                 <div class="infor">
//                     <span>Họ và tên: </span> <span>${order.full_name}</span>
//                 </div>
//                 <div class="infor">
//                     <span>Số điện thoại: </span> <span>${order.phone}</span>
//                 </div>
//                 <div class="infor">
//                     <span>Địa chỉ: </span> <span>${order.address}</span>
//                 </div>
//                 <div class="infor">
//                     <span>Email: </span> <span>${order.email}</span>
//                 </div>
//             </td>
//             <td>
//             </div>
//             <div class="infor">
//               <span>Tên sản phẩm: </span> <span>Skirt Beautiful</span>
//             </div>
//             <div class="infor">
//               <span>Số lượng: </span> <span>1</span>
//             </div>
//             <div class="infor">
//               <span>Đơn giá: </span> <span>200,000</span>
//             </div>
//             <div class="infor">
//               <span>Tổng số tiền: </span> <span>200,000</span>
//             </div>
//             <div class="totalPrice">
//               <span>Tổng giá trị đơn hàng: </span> <span>200,000</span>
//             </div>
//             </td>
//             <td>
//                 <button class="unconfimred-btn" onclick="confirmOrder(this)">Chưa xác nhận</button>
//                 <button class="clear-btn"  onclick="clearRow(this)">X</button>
//             </td>
//             <td></td>
//         </tr>
//     `;

//     tableBody.innerHTML = tableRow;
// };

// // Hàm xác nhận đơn hàng và thay đổi màu sắc của nút
// function confirmOrder(button) {
//     button.textContent = 'Đã xác nhận';
//     button.classList.remove('unconfirmed-btn');
//     button.classList.add('confirmed-btn');
// }

// // Hàm xóa toàn bộ thông tin trong hàng
// function clearRow(button) {
//     var row = button.closest('tr');
//     row.innerHTML = ''; // Xóa toàn bộ nội dung trong hàng
// }




