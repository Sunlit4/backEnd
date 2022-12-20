import {ProductoService} from '../../services/producto.service.js';

export const GetAllProductsQuery = `

    getAllProducts: [Product]

`

export async function getAllProducts() {
    return ProductoService.getInstance().getAll();
}