const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product.controller');

// 🌐 GET all products
router.get('/', productCtrl.getAllProducts);

// 🔍 GET single product
router.get('/:id', productCtrl.getProductById);

// ➕ POST new product with image
router.post('/', productCtrl.upload, productCtrl.createProduct);

// ✏️ PUT update product
router.put('/:id', productCtrl.upload, productCtrl.updateProduct);


// ❌ DELETE product
router.delete('/:id', productCtrl.deleteProduct);

module.exports = router;
