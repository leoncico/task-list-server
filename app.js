const express = require('express');
const app = express();



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