

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//  ---------------------------------MONGODB--------------------------------------------

// Conexión a MONGODB

mongoose.connect('mongodb://localhost/prueba2', { useMongoClient: true }); 

var alumnosSchemaJSON = {
    name: String,
    age: String
};

// Creando Schema
var alumnoSchema = new Schema(alumnosSchemaJSON);

// Creando Modelo
var Alumno = mongoose.model("prueba2",alumnoSchema);

// Mostrar datos por pantalla via GET


app.get("/list",(req,res) => {

    Alumno.find((err,result) => {

	//console.log(result);
	res.send(result);
  
      });
});

//  ---------------------------------MYSQL--------------------------------------------

// Conexión a MYSQL

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ohiohi17',
    database: 'jugadores'
});

//Comprobación de conexión

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... \n\n");
    } else {
        console.log("Error connecting database ... \n\n");
    }
});

// Mostrar datos por pantalla via GET


app.get("/bd",function(req,res){
    connection.query('SELECT * from jugador', function(err, rows, fields) {
    connection.end();
      if (!err){
        //console.log('The solution is: ', rows),
        res.send(rows);
      }else
        console.log('Error while performing Query.');
      });
});

//-----------------------------------API REST----------------------------------------

//API REST: GET 

app.get('/api/alumno', (req, res) => {

	Alumno.find({}, (err, products) => {

		if(err) return res.status(500).send({message: "Error al realizar la peticion: ${err}"});

		if(!products) return res.status(404).send({mesagge: "No existen productos"});

		res.send(200, {products});


	});
});

//API REST: GET (Por ID)

app.get('/api/alumno/:_id', (req, res) => {

	let productId = req.params._id

	Alumno.findById(productId, (err, product) => {

		if (err) return res.status(500).send({message: "Error al realizar la peticion: ${err}"})

		if(!product) return res.status(404).send({mesagge: "el producto no existe"})

		res.status(200).send({ product: product})


	})

})

//API REST: POST

app.post('/api/alumno', (req, res) => {

	let alumno = new Alumno()

	alumno.name = req.body.name
	alumno.age = req.body.age

	alumno.save((err, alumnoGuardado) =>{

		if (err) return res.status(500).send({message: "Error al salvar la BD: ${err}"})

		res.status(200).send({alumno: alumnoGuardado})
	})

})

//API REST: DELETE
app.delete('/api/alumno/:_id', (req, res) => {

	let alumnoID = req.params._id


	Alumno.findById(alumnoID, (err, alumno) => {

		if (err) return res.status(500).send({message: "Error al borrar alumno: ${err}"})

		alumno.remove(err =>{

			if(err) res.status(500).send({mesagge: "Error al borrar alumno"})
			res.status(200).send({mesagge: "eliminado"})
		})


	})


})

//API REST: PUT

app.put('/api/alumno/:_id', (req, res) => {

	let alumnoID = req.params._id
	let update = req.body


	Alumno.findByIdAndUpdate(alumnoID, update, {new: true}, (err, alumnoUpdated) => {

		if (err) return res.status(500).send({message: "Error al actual alumno: ${err}"})

		res.status(200).send({ alumno: alumnoUpdated})

	})

})

//TEXTO PLANO POR PANTALLA TRAS INGRESAR UNA DETERMINADA RUTA

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/hola', (req, res) => res.send('Hola! Bienvenido'));

app.get('/contacto', (req, res) => res.send('Contactame a scarrascofuentes@gmail.com'));

app.listen(80, () => console.log('Example app listening on port 80!'));
