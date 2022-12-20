import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true
        },

        password: {
            type: String,
            trim: true,
            required: true
        }
    }
)

export const UsuariosModel = mongoose.model('usuarios', Schema)