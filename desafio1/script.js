class Usser{
    constructor (nombre, apellido, libros, mascotas){
        this.nombre= (nombre == undefined || nombre == "") ? "Sin Nombre" : nombre;
        this.apellido = (apellido  == undefined || apellido == "") ? "Sin apellido" : apellido;
        this.libros = (libros == undefined) ? libros = [] : libros;
        this.mascotas = (mascotas == undefined) ? mascotas = [] : mascotas;
    }
    getFullName (){
        return `${this.nombre} ${this.apellido}`;
    }
    addMascota (mascota){
        return this.mascotas.push(mascota)
    }
    countMascotas (){
        return this.mascotas.length;
    }
    addBook (titulo, autor){
        const books = {titulo:titulo, autor: autor}
        this.libros.push(books)
    }
    getBookNames (){
        const titulos = []
        this.libros.forEach(libro =>{
            titulos.push (libro.titulo)
        });
        return titulos 
    }
}

// Declaración de instancias de la class usuario
const usuario = new Usser(
    "Sonsoles",
    "Grondona Fernández",
    [
        {titulo:' El principito', autor:'Antoine de Saint-Exupéry'},
        {titulo: ' El segundo sexo', autor: 'Simone de Beauvoir'}
    ],
    ['Cali', 'Laika', 'Xica']
)

const empty = new Usser()

// con clases de JavaScript
console.log (`El nombre completo del usuario es ${usuario.getFullName()}`)
usuario.addMascota('Pepe');
console.log (`La cantidad actualizada de mascotas de la persona es ${usuario.countMascotas()}`);

usuario.addBook(' Rayuela', ' Julio Cortázar')
console.log('Lista completa de sus libros favoritos:');
console.log (usuario.getBookNames())

console.log ("Datos completos de la persona agregada: ")
console.log(usuario)
console.log ('Datos completos de una persona sin datos: ')
console.log (empty)

//Mostrar información en el front-end con clases
let informacion = document.getElementById('informacion')
function mostrarInformacion(){
    informacion.innerHTML= `
        <ul>
            <li> El nombre completo del usuario es ${usuario.getFullName()}</li>
            <li> La cantidad de mascotas que tiene: ${usuario.countMascotas()}</li>
            <li> Sus libros favoritos son:  ${usuario.getBookNames()}</li>
        </ul>`
}
mostrarInformacion()