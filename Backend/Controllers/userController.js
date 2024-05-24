const Users = require("../Model/Users")

async function login(req, res) {
    try {
        const{email, pass} = req.body
        const newUsers = await Users.findOne({
            email : email,
            pass : pass
        })
        console.log(req.body);

        return res.json({
            message: "Đăng nhập thành công",
            data : newUsers
        })
    } catch (error) {
        console.log(error);
    }
}

async function register(req, res) {
    try {
        const{full_name, email, pass } = req.body
        console.log(req.body);
        const users = await Users.findOne({ email : email });
        if (users !== null) {
            return res.json({
                message: "Tài khoản đã tồn tại!"
            })
        } 
        else {
            const newUsers = await Users.create({
                full_name, email, pass
            })
         
            return res.json({
                message: "Sửa thành công"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {login,register}

