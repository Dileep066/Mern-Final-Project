const Product = require("../model/product.model");

async function createProduct(req, res) {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating product",
            error: error.message,
        });
    }
}
async function getAllProducts(req, res) {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
async  function getProductsById(req,res){
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product found",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
           success:false,
            message: error.message,
        });
    }
} 
async function updateProduct(req,res){
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true,runValidators: true });
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}
async function deleteProduct(req,res){
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    createProduct,
    getProductsById,
    getAllProducts,
    updateProduct,
    deleteProduct,
};