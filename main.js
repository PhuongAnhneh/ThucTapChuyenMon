function isEmailExist(email) {
    for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            var value = JSON.parse(localStorage.getItem(key));
            if (value.email === email) {
                return true;
            }
        }
    }
    return false;
}
function register(e){
    event.preventDefault();
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var user = {
        full_name : username,
        email : email,
        pass : password,
    }
    var json = JSON.stringify(user);
    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
        alert("Vui lòng điền đầy đủ thông tin");
        return false;
    }
    if (password !== confirmPassword) {
        alert("Mật khẩu khác nhau");
        return false;
    }
    if (username.length >= 2 && password.length >= 8) {
        fetch(`http://localhost:8000/api/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                // Thành công thì đóng modal và alert
                // formProduct.style.transform = "translate(-100%, 0)"
                alert("Tạo thành công");
                window.location.href="login.html"
            })
            .catch(error => {
                console.error("Lỗi: " + error);
                alert("Lỗi: " + error);
            });
        // if (isEmailExist(email)) {
        //     alert("Email đã được sử dụng. Vui lòng nhập email khác!");
        //     return false;
        // }
        // var json = JSON.stringify({username: username, email: email, password: password});
        // localStorage.setItem(username, json);
        // alert("Bạn đã đăng ký thành công!");
        // return true;
    }  else {
        if (username.length < 2) {
            alert("Tên người dùng phải có ít nhất 2 kí tự");
        } else {
            alert("Mật khẩu phải có ít nhất 8 kí tự");
        }
        return false;
    }
}
function login(e){
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var login ={
        email : email,
        pass : password
    }

    if (email == null){
        alert("Vui lòng nhập thông tin")
    }
    else {
        fetch(`http://localhost:8000/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(login)
        })
            .then(response => response.json())
            .then(responseData => {
                console.log("dđfffff",responseData?.data);

                // Thành công thì đóng modal và alert
                // formProduct.style.transform = "translate(-100%, 0)"
                var us = {
                    full_name : responseData?.data?.full_name,
                    email : responseData?.data?.email,
                    id: responseData?.data?._id
                }
                localStorage.setItem("user_info", JSON.stringify(us));
                alert("Đăng nhập thành công");

                window.location.href="Leleshop.html"

            })
            .catch(error => {
                console.error("Lỗi: " + error);
                alert("Lỗi: " + error);
            });
      
    }
}