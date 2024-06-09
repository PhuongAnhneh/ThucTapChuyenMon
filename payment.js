
var listItem = []
var total = 0
var citis = document.getElementById("city");
    var districts = document.getElementById("district");
    var Parameter = {
        url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json", 
        method: "GET", 
        responseType: "application/json", 
    };
    var promise = axios(Parameter);
    promise.then(function (result) {
        renderCity(result.data);
    });

    function renderCity(data) {
        for (const x of data) {
        citis.options[citis.options.length] = new Option(x.Name, x.Id);
        }
        citis.onchange = function () {
        district.length = 1;
        if(this.value != ""){
            const result = data.filter(n => n.Id === this.value);

            for (const k of result[0].Districts) {
                district.options[district.options.length] = new Option(k.Name, k.Id);
            }
        }
        }
    }

    function callApi() {
        console.log("12344");
        var list = JSON.parse(localStorage.getItem('items_cart'));
        listItem = list
        if (list) {
            var table = document.getElementById('payment-item');
            table.innerHTML = ''; // Xóa nội dung cũ của bảng trước khi thêm dữ liệu mới
            var total_payment = 0;
            list.forEach((item, index) => {
                console.log("item", item?.img);
                var totalPricePerItem = item.price * item.qty; // Tính tổng tiền của mỗi sản phẩm
                total_payment += totalPricePerItem
                table.innerHTML += `
                    <div class="payment-product-infor">
                        <div class="payment-img">
                            <img src=${item?.img} alt="">
                        </div>
                        <div class="payment-product-text">
                            <p>${item?.name}</p>
                            <span>Phân loại: ${item?.size},</span> <span> x${item?.qty}</span>
                            <p>${totalPricePerItem.toLocaleString()}</p>
                        </div>
                    </div>
                `;
            });
            table.innerHTML += `
            <div class="totalPayment">
                <div class="productMoney">
                    <p>Tổng tiền</p> 
                    <p id="total_payment">
                        ${total_payment.toLocaleString()}
                    </p>
                </div>
                    
                <div class="paymentBtn">
                        <button onclick="addOrder()">Thanh toán</button>
                </div>
            </div>
            `
           total = total_payment
        } else {
            alert('Chưa có sản phẩm nào được thêm vào giỏ hàng');
        }
    }

   async function addOrder (){
        var idu =  JSON.parse(localStorage.getItem("user_info"))
        var full_name = document.getElementById("input_fullname").value;
        var full_email = document.getElementById("input_email").value;
        var phone = document.getElementById("input_phone").value;
        var city = document.getElementById("city")
        var value_city = city.options[city.selectedIndex].text
        var district = document.getElementById("district")
        var value_district = district.options[district.selectedIndex].text
        var address = document.getElementById("input_address").value;
        console.log(document.getElementById("input_phone").value);
        const data = {
            user_id: idu.id,
            full_name: full_name,
            email:full_email,
            city : value_city,
            district : value_district,
            phone: phone,
            address: address,
            total_price:total,
            status : 0,
            items: listItem,
            payment : "online"
        }
        console.log(data);

        fetch('http://localhost:8000/api/orders/createOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            localStorage.removeItem("items_cart")
            var xacNhan = confirm("Đặt hàng thành công! Tự động chuyển đến trang chủ");
            if (xacNhan) {
                // Nếu người dùng nhấn "OK" (hoặc "Yes" tùy theo ngôn ngữ)
                window.location.href = "Leleshop.html"; // Điều chỉnh URL tùy theo trang quản lý đơn hàng của bạn
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
                
 
    }

    // async function addOrder() {
        
    //     // Lấy thông tin đơn hàng
    //     var fullName = document.getElementById("input_fullname").value;
    //     var email = document.getElementById("input_email").value;
    //     var phone = document.getElementById("input_phone").value;
    //     var address = document.getElementById("input_address").value;
       
    //     // Tạo đối tượng đơn hàng
    //     var order = {
    //         full_name: fullName,
    //         email: email,
    //         phone: phone,
    //         address: address,
    //     };
    
    //     // Lưu thông tin đơn hàng vào localStorage
    //     localStorage.setItem('orderDetails', JSON.stringify(order));
    
    //     // Chuyển hướng tới trang quản lý đơn hàng
    //     window.location.href = "quanLyDonHang.html";
    // }
    