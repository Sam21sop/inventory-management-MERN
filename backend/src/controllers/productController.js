import productModel from "../models/productModel.js";


/**
 * Add new product.
 * 
 * @param {Object} req - The request object from the client.
 * @param {Object} req.body - The body of the request containing the new product data.
 * @param {string} req.body.productName - The name of the product.
 * @param {string} req.body.productImage - The image of the product.
 * @param {string} req.body.subcategory - The subcategory of the product.
 * @param {string} req.body.category - The category of the product.
 * @param {string} req.body.status - The status of the product.
 * @param {Object} res - The response object to send the response to the client.
 * @returns {Object} - Returns a JSON response with a message and the newly created product if successful.
 * @throws {Error} - Returns a JSON response with an error message and a status code if an error occurs.
 * @desc    Creates a new product in the database.
 * @route   POST /api/v1/product
 * @access  Private
 */
const addNewProduct = async (req, res) => {
    try {
        const { productName, productImage, subcategory, category, status } = req.body;

        // Check if all required fields are provided
        if (!productName || !productImage || !subcategory || !category || !status) {
            return res.status(400).json({ message: "Please fill in all required fields!" });
        }
        // create new product
        const newProduct = await productModel.create({ productName, productImage, subcategory, category, status });

        res.status(201).json({
            message: "Product added successfully.",
            product: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server issue!"
        })
    }
};


/**
 * Update product by ID.
 * 
 * @param {Object} req - The request object from the client.
 * @param {Object} req.params - The parameters from the request.
 * @param {string} req.params.id - The ID of the product to be updated.
 * @param {Object} req.body - The updated product data.
 * @param {Object} res - The response object to send the response to the client.
 * @returns {Object} - Returns a JSON response with the updated product or an error message.
 * @throws {Error} - Returns a JSON response with an error message and a status code if an error occurs.
 * @desc    Updates a product by its ID with the new data.
 * @route   PUT /api/v1/product/:id
 * @access  Private
 */
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { productName, productImage, subcategory, category, status } = req.body;

        const product = await productModel.findById(productId);
        if(product) {
            product.productName = productName || product.productName;
            product.productImage = productImage || product.productImage;
            product.subcategory = subcategory || product.subcategory;
            product.category = category || product.category;
            product.status = status || product.status;

            const updatedProduct = await product.save();

            res.status(200).json({
                message: "Product updated successfully.",
                product: updatedProduct
            });
        } else {
            res.status(404).json({
                message: "Product not found!"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error!",
            error: error.message
        });
    }
};



/**
 * Delete product by ID.
 * 
 * @param {Object} req - The request object from the client.
 * @param {Object} req.params - The parameters from the request.
 * @param {string} req.params.id - The ID of the product to be deleted.
 * @param {Object} res - The response object to send the response to the client.
 * @returns {Object} - Returns a JSON response with a success message if the product is deleted or an error message if not.
 * @throws {Error} - Returns a JSON response with an error message and a status code if an error occurs.
 * @desc    Deletes a product by its ID from the database.
 * @route   DELETE /api/v1/product/:id
 * @access  Private
 */
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;

        // Find the product by ID and delete it
        const product = await productModel.findByIdAndDelete(productId);

        if (product) {
            res.status(200).json({
                message: "Product deleted successfully."
            });
        } else {
            res.status(404).json({
                message: "Product not found!"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error!",
            error: error.message
        })
    }
};


/**
 * Find product by ID.
 * 
 * @param {Object} req - The request object from the client.
 * @param {Object} req.params - The parameters from the request.
 * @param {string} req.params.id - The ID of the product to be retrieved.
 * @param {Object} res - The response object to send the response to the client.
 * @returns {Object} - Returns a JSON response with the found product or an error message.
 * @throws {Error} - Returns a JSON response with an error message and a status code if an error occurs.
 * @desc    Retrieves a product by its ID from the database.
 * @route   GET /api/v1/product/:id
 * @access  Public
 */
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id

        const product = await productModel.findById(productId);
        if (product) {
            res.status(200).json({
                message: "Product found.",
                product: product
            });
        } else {
            res.status(404).json({
                message: "Product not found!"
            });
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error!"
        })
    }
};


/**
 * Get all products.
 * 
 * @param {Object} req - The request object from the client.
 * @param {Object} res - The response object to send the response to the client.
 * @returns {Object} - Returns a JSON response with a list of all products.
 * @throws {Error} - Returns a JSON response with an error message and a status code if an error occurs.
 * @desc    Retrieves all products from the database.
 * @route   GET /api/v1/products
 * @access  Public
 */
const getAllProduct = async (req, res) => {
    try {
        const allProducts = await productModel.find().sort();

        res.status(200).json({
            message: "Products retrieved successfully.",
            products: allProducts
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error!"
        });
    }
};


export {
    addNewProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProduct,
};