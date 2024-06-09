import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";


// define initial state
const initialState = {
    allProducts: [],
    product: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    category: [],
    subCategory: [],
    message: '',
    filteredProducts: []
};


// create new product
const createProduct = createAsyncThunk(
    'product/create',
    async (formData, thunkAPI) => {
        try {
            return await productAPI.addProduct(formData);
        } catch (error) {
            const message = (error.message && error.respone.data && error.respone.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        };
    }
);


// get all products 
const getAllProduct = createAsyncThunk(
    'product/getAllProduct',
    async (_, thunkAPI) => {
        try {
            return await productAPI.getAllProduct();
        } catch (error) {
            const message = (error.message && error.respone.data && error.respone.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// get product by id
const getProduct = createAsyncThunk(
    'product/getProduct',
    async (productId, thunkAPI) => {
        try {
            return await productAPI.getProduct(productId);
        } catch (error) {
            const message = (error.message && error.respone.data && error.respone.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// delete product by id 
const deleteProduct = createAsyncThunk(
    'product/deleteProduct',
    async (productId, thunkAPI) => {
        try {
            return await productAPI.deleteProduct(productId);
        } catch (error) {
            const message = (error.message && error.respone.data && error.respone.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        };
    }
);


// update product based on id
const updateProduct = createAsyncThunk(
    'product/updateProduct',
    async ({ productId, formData }, thunkAPI) => {
        try {
            return await productAPI.updateProduct(productId, formData);
        } catch (error) {
            const message = (error.message && error.respone.data && error.respone.data.message) || error.message || error.toString();
            console.log(message);
            return thunkAPI.rejectWithValue(message);
        }
    }
)

// define product slice 
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        filterProduct: (state, action) => {
            const { allProducts, search } = action.payload;
            const filterResult = allProducts.filter((product) => (
                product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.category.toLowerCase().includes(search.toLowerCase())
            ));

            state.filteredProducts = filterResult;
        }
    },
    extraReducers: (builder) => {
        builder
            //create product
            .addCase(createProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;

                // push the product
                state.products.push(action.payload);
                toast.success("Product added  successfully.")
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // get all product
            .addCase(getAllProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.allProducts = action.payload;

            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // get product by id
            .addCase(getProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.product = action.payload;
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // delete product by id
            .addCase(deleteProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Product deleted successfully");
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
            // update product by id
            .addCase(updateProduct.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Product updated successfully");
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload);
            })
    }
});


export const { filterProduct } = productSlice.actions;
export const productSelector = (state) => state.product;
const productReducer = productSlice.reducer;
export default productReducer;