const {Producto} = require('../DAO/index.js');
const producto = new Producto();

const getProducts = async () => {
	const listaProductos = await producto.getAll();
	return listaProductos;
};

const getProductById = async ({ id }) => {
	const productoById = await producto.getById(parseInt(id));
	return productoById;
};

const postProduct = async ({ data }) => {
	const idProduct = await producto.save(data);
	return idProduct;
};

const putProduct = async ({ id, data }) => {
	const response = await producto.updateById(parseInt(id), data);
	return response;
};

const deleteProductById = async ({ id }) => {
	const response = await producto.deleteById(parseInt(id));
	return response;
};

module.exports = {
	getProducts,
	getProductById,
	postProduct,
	putProduct,
	deleteProductById
};