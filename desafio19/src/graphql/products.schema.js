const {buildSchema} = require ('graphql');

const productSchema = buildSchema(`
type Product {
    id: ID!
    title: String,
    price: String,
    thumbnail: String,
}
input ProductInput {
    title: String,
    price: String,
    thumbnail: String,
}
type Query {
    getProducts: [Product],
    getProductById(id:String): Product,
}
type Mutation {
    postProduct(data: ProductInput): Product
    putProduct(id:String, datos: ProductInput): Product
    deleteProductById(id:String): Product
}
`);

module.exports = productSchema;