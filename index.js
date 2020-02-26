var express = require ('express') //req modulo express
var bodyParser = require('body-parser') //req body-parser


var servidor = express() //inicializamos servidor
servidor.use(bodyParser.urlencoded({extended: false})) //trasforma cadenas de datos
servidor.use(bodyParser.json()) //transforma json
servidor.use(express.static('staticResourses')) //designa a la carpeta staticResourses para almacenar recursos estaticos

servidor.use(function(consulta, respuesta, siguiente){ //middleware
    console.log(`> [${consulta.method}] [${consulta.url}]`) //avisa en el servidor los tipos de conexiones
    consulta.tiempo = Date.now() //tiempo de conexion
    siguiente()
})

var alumnos = [
    {nombre: "maxi"}
] //json

servidor.get('/alumnos', function(consulta, respuesta){
    
    respuesta.json(alumnos) //devolver json
})
servidor.get('/alumnos/:nombre', function(consulta, respuesta){
    var nombre = consulta.params.nombre
    var alumno = alumnos.find(function(a){
        a.nombre === nombre
    })
    if(!alumno){
        respuesta.status(404).end('recurso no encontrado')
    }
    else{
        respuesta.json(alumno)
    }
})

servidor.post('/alumnos', function(consulta, respuesta){
    alumnos.push({
        nombre: consulta.body.nombre,
        edad: consulta.body.edad
    })
    respuesta.status(201).end('agregado!')

    // var nombre = consulta.body.nombre //obtengo nombre
    // var edad = consulta.body.edad //obtengo edad

    // respuesta.json({mensaje: 'tu nombre es ' + nombre})
})
servidor.delete('/alumnos/:nombre', function(){

})


// servidor.get('/api/tiempo', function(consulta, respuesta){
//     respuesta.end('el tiempo es ' + consulta.tiempo) //tiempo en que se hizo la consulta

// })
servidor.listen(3000, function(){
    console.log("escuchando en el puerto 3000")
})