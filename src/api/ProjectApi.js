const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors({ origin: ["http://localhost:3009", "http://127.0.0.1:5173"] }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let user = [{ firstName: "chris", lastName: "mario", id: 1}];

let response = {
  error: false,
  codigo: 200,
  mensaje: "",
};

app.get("/user", function (req, res) {
  response = {
    error: false,
    codigo: 200,
    mensaje: "",
  };
  if (user.firstName === "" || user.lastName === "") {
    response = {
      error: true,
      codigo: 501,
      mensaje: "El usuario no ha sido creado",
    };
  } else {
    response = {
      error: false,
      codigo: 200,
      mensaje: "respuesta del usuario",
      response: user,
    };
  }
  res.send(response);
});
app.post("/user", function (req, res) {
  if (!req.body.firstName || !req.body.lastName) {
    response = {
      error: true,
      codigo: 502,
      mensaje: "El campo nombre y apellido son requeridos",
    };
  } else {
    /*if(usuario.nombre !== '' || usuario.apellido !== '') {
      respuesta = {
       error: true,
       codigo: 503,
       mensaje: 'El usuario ya fue creado previamente'
      };
     } else {*/
    user.push({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    response = {
      error: false,
      codigo: 200,
      mensaje: "Usuario creado",
      response: user,
    };
    /* }*/
  }

  res.send(response);
});

app.listen(3009, () => {
  console.log("El servidor está inicializado en el puerto 3009");
});
