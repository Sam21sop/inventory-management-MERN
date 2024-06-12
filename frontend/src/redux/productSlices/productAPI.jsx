import axios from 'axios';


// backend url
const PRODUCT_API_URL = "https://inventory-management-sopan.onrender.com/api/v1/product";


// create new product api 
const addProductApiHandler = async (formData) => {
    const response = await axios.post(PRODUCT_API_URL, formData);
    return response.data;
};


// get all products 
const getAllProductApiHandler = async () => { 
    const response = await axios.get(PRODUCT_API_URL);
    return response.data;
};


// get product by id 
const getProductApiHandler = async (productId) => { 
    const response = await axios.get(PRODUCT_API_URL + productId);
    return response.data;
};


// delete product based on id 
const deleteProductApiHandler = async (productId) => { 
    const response = await axios.delete(PRODUCT_API_URL + productId);
    return response.data;
};


// update product based on id 
const updateProductApiHandler = async (productId, formData) => {
    const response = await axios.patch(`${PRODUCT_API_URL}${productId}`, formData);
    return response.data;
};


// export API services 
export {
    addProductApiHandler,
    getProductApiHandler,
    getAllProductApiHandler,
    deleteProductApiHandler,
    updateProductApiHandler
};
