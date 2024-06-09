import axios from 'axios';


// backend url
const PRODUCT_API_URL = "http://localhost:8080/api/products";


// create new product api 
const addProduct = async (formData) => {
    const response = await axios.post(PRODUCT_API_URL, formData);
    return response.data;
};


// get all products 
const getAllProduct = async () => { 
    const response = await axios.get(PRODUCT_API_URL);
    return response.data;
};


// get product by id 
const getProduct = async (productId) => { 
    const response = await axios.get(PRODUCT_API_URL + productId);
    return response.data;
};


// delete product based on id 
const deleteProduct = async (productId) => { 
    const response = await axios.delete(PRODUCT_API_URL + productId);
    return response.data;
};


// update product based on id 
const updateProduct = async (productId, formData) => {
    const response = await axios.patch(`${PRODUCT_API_URL}${productId}`, formData);
    return response.data;
};


// export API services 
const productAPI = {
    addProduct,
    getProduct,
    getAllProduct,
    deleteProduct,
    updateProduct
};

export default productAPI;