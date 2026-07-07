const express = require("express");
const router = express.Router();

const {
    createProduct,
    getProductsById,
    getAllProducts,
    updateProduct,
    deleteProduct,
} = require("../controllers/product.controller");

router.post("/", createProduct);
router.get("/", getAllProducts);      // GET /products
router.get("/:id", getProductsById);  // GET /products/:id
router.put("/:id", updateProduct);    // PUT /products/:id
router.delete("/:id", deleteProduct); // DELETE /products/:id
module.exports = router;