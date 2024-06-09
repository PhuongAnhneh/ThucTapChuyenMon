const Orders = require("../Model/Order");

async function createOrder(req, res) {
    try {
        const { user_id, email, pass, address, phone, full_name, avatar, total_price, status, items, payment } = req.body;
        const newOrder = await Orders.create({
            user_id, email, pass, address, phone, full_name, avatar, total_price, status, items, payment
        });
        return res.json({
            message: "Tạo đơn hàng thành công",
            order: newOrder
        });
    } catch (error) {
        console.error("Lỗi khi tạo đơn hàng:", error);
        return res.status(500).json({
            message: "Đã có lỗi xảy ra, vui lòng thử lại sau"
        });
    }
}

async function getOrderByUserId(req, res) {
    const { user_id } = req.params;

    try {
        // Tìm kiếm các đơn hàng của user_id đã được lưu trong cơ sở dữ liệu
        const userOrders = await Orders.find({ user_id });

        if (!userOrders) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng cho user_id này" });
        }

        res.status(200).json(userOrders);
    } catch (error) {
        console.error("Lỗi khi lấy đơn hàng:", error);
        res.status(500).json({ message: "Đã có lỗi xảy ra, vui lòng thử lại sau" });
    }
}

module.exports = { createOrder, getOrderByUserId };
