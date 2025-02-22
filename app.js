require("dotenv").config();

const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

const users = [
    { user: "leo"},
    { user: "david" },
  ];

app.use((req, res, next) => {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!validMethods.includes(req.method)) {
        return res.status(405).json({ error: 'Método HTTP no permitido.' });
    }
    next();
});

app.post("/login", function (req, res) {
    const username = req.body.username;
    const user = users.find((user) => user.user === username);
    if (!user) {
      res.status(401).send({ error: "Invalid user name or password" });
    }

    const token = jwt.sign(
      {
        username: username,
      },
      process.env.SECRET_KEY);
  
    res.send({ token });
});

function JWTValidation(req, res, next) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.username = decoded.username;
        next();
    } catch (err) {
        res.status(401).send({ error: "No tienes permisos para acceder a este recurso" });
    }
}

app.get("/leoPrivateDirectory", JWTValidation, (req, res) => {
    res.send({ message: "Este es el directorio privado de Leo" });
});

app.use('/list', listViewRouter);
app.use('/list', listEditRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

const data = [
    {
        id: 123456,
        isCompleted: false,
        description: 'Walk the dog'
    },
    {
        id: 123457,
        isCompleted: true,
        description: 'Feed the cat'
    },
    {
        id: 123458,
        isCompleted: false,
        description: 'Wash the dishes'
    },
    {
        id: 123459,
        isCompleted: true,
        description: 'Do laundry'
    }
];

app.get('/', (req, res) => {
  res.json(data);
});