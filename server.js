const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve static files from the React app

const port = process.env.PORT || 5000;

const router = express.Router();

router.get('/tester', (req, res) => {
    res.json({'status': 200, 'test': true, 'data': [{
        "name": "Joe",
        "age": 24,
        "priority": 1,
        "category": "cat2"
  }]});
});

router.get('/users', (req, res) => {
    res.json(users);
});

app.use('/api', router);

app.listen(port);

console.log(`Zola app server listening on ${port}`);

const users = [
    {
        "name": "Joe",
        "age": 24,
        "priority": 1,
        "category": "cat2"
    }, 
    {
        "name": "Jane",
        "age": 76,
        "priority": 4,
        "category": "cat1"
    },
    {
        "name": "Kevin",
        "age": 32,
        "priority": 2,
        "category": "cat2"
    },
    {
        "name": "Lucy",
        "age": 54,
        "priority": 10,
        "category": "cat3"
    },
    {
        "name": "Colin",
        "age": 34,
        "priority": 3,
        "category": "cat1"
    },
    {
        "name": "Franny",
        "age": 36,
        "priority": 5,
        "category": "cat3"
    },
    {
        "name": "Neil",
        "age": 74,
        "priority": 4,
        "category": "cat2"
    },
    {
        "name": "Katy",
        "age": 55,
        "priority": 8,
        "category": "cat2"
    }
];