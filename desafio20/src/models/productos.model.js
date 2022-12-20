import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true
        },

        image: {
            type: String,
            trim: true,
            required: false
        },

        description: {
            type: String,
            trim: true,
            required: false
        },

        price: {
            type: Number,
            trim: true,
            required: true
        },

        stock: {
            type: Number,
            trim: true,
            required: true
        },
    },

    { timestamps: true }
)

export const ProductosModel = mongoose.model('productos', Schema)