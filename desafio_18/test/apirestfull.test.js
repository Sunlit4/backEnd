const supertest = require ('supertest')
const  { expect } = require ('chai')
const newProduct = require('./newProduct.js')
const  { httpServer } = require('../src/app.js')

let server
let request

describe(`Test api restful entregable 18 - productos`, ()=>{
    
    before(async ()=>{
        server = await startServer()
        request = supertest(`http://localhost:${server.address().port}/api/productos`)
    })

    after( () =>{
        server.close()
    })

    describe( 'GET', () =>{
        it('Debería retornar status 200', async ()=>{
            const response = await request.get('/')
            expect(response.status).to.eql(200)
            console.log(response.body)
        })
    })

    describe('POST', () =>{
        it('Debería agregar un producto', async()=>{
            const producto = newProduct()
            console.log('Producto para test:', producto)
            const response = await request.post('/').send(producto)
            expect(response.status).to.eql(200)
            console.log(response.body)
        })
    })

    describe('DELETE', ()=>{
        it('Debería eleminar un producto', async()=>{
            const prueba = '638e852c56135267a837e2c4'
            const response = await request.delete('/'+prueba)
            expect(response.status).to.eql(200)
            console.log(response.body)
        })
    })
})

async function startServer(){
    return new Promise((resolve, reject)=>{
        const PORT = 0
        const server = httpServer.listen(PORT, ()=>{
            console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
            resolve(server)
        })
        server.on('error', error =>{
            console.log(`Error en Servidor: ${error}`)
            reject(error)
        })
    })
}