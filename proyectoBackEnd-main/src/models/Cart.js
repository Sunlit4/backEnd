import { Schema, model} from "mongoose";
import { ProductSchema } from "./Product.js";

const CartSchema = new Schema(
    {
        email: { type: String, require: true },
        products: { type: [ProductSchema], require: true },
        address: { type: String, require: true },
        total: { type: Number, default: 0 },
    },
    {
        timestamps: true
    }
);

const Cart = model ("Cart", CartSchema );

export default Cart; 
