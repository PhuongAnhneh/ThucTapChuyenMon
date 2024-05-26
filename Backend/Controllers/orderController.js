const Orders = require("../Model/Order")

async function createOrder(req, res) {
    try {
        const{user_id, email, pass, address, phone, full_name, avatar, total_price, status, items, payment} = req.body
        const newProduct = await Orders.create({
            user_id, email, pass, address, phone, full_name, avatar, total_price, status, items, payment
        })
        return res.json({
            message: "Tạo thành công"
        })
        console.log(req.body);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {createOrder}

