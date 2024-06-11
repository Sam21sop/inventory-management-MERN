import mongoose from 'mongoose';


const productSchema = mongoose.Schema(
    {
        productName: {
            type: String,
            required: [true, "Please add a product name!"],
        },
        productImage: {
            type: String,
            required: [true, "Please add a product image!"]
        },
        subcategory: {
            type: String,
            required: [true, "Please add a subcategory!"],
        },
        category: {
            type: String,
            required: [true, "Please add a category!"],
        },
        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Inactive",
            required: true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    },
    {
        timestamp: true
    }
);


const productModel = mongoose.model("Product", productSchema);
export default productModel;