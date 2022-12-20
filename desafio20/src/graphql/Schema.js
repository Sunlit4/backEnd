import {buildSchema} from 'graphql';
import {ProductType} from './types/Producto.type.js';
import {ProductNewInput} from './inputs/ProductoNew.input.js';
import {ProductUpdateInput} from './inputs/ProductoUpdate.input.js';
import {GetAllProductsQuery, getAllProducts} from './queries/GetAllProductos.query.js';
import {GetProductByIdQuery, getProductById} from './queries/GetProductById.query.js';
import {CreateProductMutation, createProduct} from './mutations/CreateProducto.mutation.js';
import {UpdateProductByIdMutation, updateProductById} from './mutations/UpdateProductById.mutation.js';
import {DeleteProductByIdMutation, deleteProductById} from './mutations/DeleteProductById.mutation.js';

export const schema = buildSchema(`

    ${ProductType}
    ${ProductNewInput}
    ${ProductUpdateInput}

    type Query {
        ${GetAllProductsQuery}
        ${GetProductByIdQuery}
    }

    type Mutation {
        ${CreateProductMutation}
        ${UpdateProductByIdMutation}
        ${DeleteProductByIdMutation}
    }
`)

export const productSchema ={
    getAllProducts,
    getProductById,
    createProduct,
    updateProductById,
    deleteProductById
}
