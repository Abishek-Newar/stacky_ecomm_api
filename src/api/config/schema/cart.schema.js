import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
        insert_date_time: { type: Date, default: Date.now },
        status: { type: Number, default: 0 },
        softDeleteDate: { type: Date },
        userDetail: {
            type: Object,
        },
        productDetail: {
            type: Object,
        }
    },
    {
        collection: "cart",
    }
);

const cart = mongoose.model("cart", cartSchema);

export default cart;
