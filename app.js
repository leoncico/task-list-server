const express = require('express');
const app = express();

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');


app.use((req, res, next) => {
    const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
    if (!validMethods.includes(req.method)) {
        return res.status(405).json({ error: 'Método HTTP no permitido.' });
    }
    next();
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