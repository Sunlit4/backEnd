import {ProductoService} from '../../services/producto.service.js'

export const CreateProductMutation =  ` 

    createProduct(data: ProductNewInput): Product
`

export async function createProduct({data}) {
    return ProductoService.getInstance().create(data);
}

