const express = require("express")
const router = express.Router()
const productController = require("../Controllers/productCotroller")

router.get("/getAll",productController.getAllProduct)
router.put("/edit",productController.editProduct)
router.delete("/delete",productController.deleteProduct)
router.get("/getProductById/:productId",productController.getProductById)


module.exports = router