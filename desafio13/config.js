const yargs = require('yargs/yargs')(process.argv.slice(2))
require('dotenv').config(); 
const MOGOURL = process.env.MOGOURL
const PORT = yargs.alias({
    p: 'puerto', 
    m: 'modo'
})
.default({
    puerto:8080, 
    modo: 'FORK'
}).argv

module.exports = {MOGOURL, PORT}