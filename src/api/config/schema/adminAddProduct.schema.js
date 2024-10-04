import mongoose from "mongoose";

const addProductSchema = new mongoose.Schema(
    {
        productName: { type: String,},
        description: { type: String,},
        price: { type: Number, },
        card_pic: { type: String, },
        images: { type: [String], default: [] }, 
        category: { type: String },
        quantity: { type: Number },
        insert_date_time: { type: Date, default: Date.now },
        update_date_time: { type: Date },
    },
    {
        collection: "addProduct_admin",
    }
);
const addProducts = mongoose.model("addProduct_admin", addProductSchema);

export default addProducts;