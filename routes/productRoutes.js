const express = require("express");
const router = express.Router();
const product = require("../controller/productController");

router.post("/addproduct", product.addProduct);
router.get("/getallProduct", product.getallProduct);
router.patch("/updated/:productId", product.updateProductbyName);
router.delete("/delete/:productId", product.deleteProduct);
module.exports = router;
