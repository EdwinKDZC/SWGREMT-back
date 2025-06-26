import ProductModel from "../models/product.model.js";
import uploadImage from "../helpers/upload.js";
import generarCodProducto from "../helpers/generarCodProducto.js";

const createProduct = async (req, res) => {
    const product = new ProductModel(req.body);
    try {
        const existingProduct = await ProductModel.findOne({
            category: product.category,
            brand: product.brand,
            model: product.model,
            quality: product.quality,
            
        });

        if (existingProduct) {
            return res.status(400).json({ message: "Product already exists" });
        }
        product.codigo = generarCodProducto(product);

        const imageUrl = await uploadImage(req.file);

        product.image = imageUrl;
        console.log("producto:", product);
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;
        console.log("idProduct:", idProduct);
        const product = await ProductModel.findById(idProduct);
        
        console.log("product:", product);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        console.log("marca:", req.body.brand);

        if( req.body.brand && req.body.model && req.body.category && req.body.quality) {
            const existingProduct = await ProductModel.findOne({
                category: req.body.category,
                brand: req.body.brand,
                model: req.body.model,
                quality: req.body.quality,
            });

            if (existingProduct && existingProduct._id.toString() !== idProduct) {
                return res.status(400).json({ message: "Product already exists" });
            }
        }

        product.brand = req.body.brand ?? product.brand;
        product.model = req.body.model ?? product.model;
        product.category = req.body.category ?? product.category;
        product.description = req.body.description ?? product.description;
        product.quality = req.body.quality ?? product.quality;
        product.pricePurchase = req.body.pricePurchase ?? product.pricePurchase;
        product.priceSold = req.body.priceSold ?? product.priceSold;
        if (req.file) {
            const imageUrl = await uploadImage(req.file);
            product.image = imageUrl;
        }

        const updatedProduct = await product.save();
        console.log("updatedProduct:", updatedProduct);

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await ProductModel.findById(productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await product.deleteOne();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
