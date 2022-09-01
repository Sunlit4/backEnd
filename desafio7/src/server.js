const fs = require('fs')
const express = requir('express');
const apiProductos = require ('./routes/products');
const knexProductos = require('./managers/conexionDB')

const app= express();

