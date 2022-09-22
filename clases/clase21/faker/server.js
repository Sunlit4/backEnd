import express from 'express';
import { faker } from '@faker-js/faker'
import { writeFile } from 'fs'

const app = express()


faker.locale = 'es'
const { name, internet, random } = faker


let str = 'NOMBRE;APELLIDO;EMAIL;TRABAJO;LUGAR\n'


app.get('/', (req, res) => {
    for (let i = 0; i < 100; i++) {
        str += name.firstName() +
            ';' + name.lastName() +
            ';' + internet.email() +
            ';' + name.jobTitle() +
            ';' + random.locale() +
            '\n'
     }
     
     writeFile('./test.csv', str, err => {
        if (err) console.log(err);
        console.log('archivo guardado')
     })
    res.send('archivo guardado')
})

app.listen(4000, () => {
    console.log('Server is running on port 4000')
})
