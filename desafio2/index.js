const Contenedor = require("./contenedor.js");

const contenedor = new Contenedor('./prueba.txt');

contenedor.save({ title: "Regla", price: 75.66 })
contenedor.save({ title: "Goma", price: 57.75 })
contenedor.save({title: "Lapicera", price: 100})

const main = async () => {
    const object2= await contenedor.getById(2);
    console.log(object2) //  { title: 'Goma', price: 57.75, id: 2 }

    const allProductosArray = await contenedor.getAll();
    console.log(allProductosArray);
    /* [
        { title: 'Regla', price: 75.66, id: 1 },
        { title: 'Goma', price: 57.75, id: 2 },
        { title: 'Lapicera', price: 100, id: 3 }]*/
}
const delet = async () => {
    await contenedor.deleteById(2)
        /*
        { title: 'Regla', price: 75.66, id: 1 },
        { title: 'Lapicera', price: 100, id: 3 }
       */

    /*await contenedor.deleteAll()
    Comente la función deleteAll para que se pueda observar las demás funciones*/
}

main()
delet()






