const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

router.post("/createOrder", orderController.createOrder);
router.get("/getOrderByUserId/:user_id", orderController.getOrderByUserId); // Thêm đường dẫn mới

module.exports = router;
