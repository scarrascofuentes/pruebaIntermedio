'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('Hello World!'));

app.get('/hola', (req, res) => res.send('Hola! Bienvenido'));

app.get('/contacto', (req, res) => res.send('Contactame a scarrascofuentes@gmail.com'));

app.listen(80, () => console.log('Example app listening on port 80!'));
