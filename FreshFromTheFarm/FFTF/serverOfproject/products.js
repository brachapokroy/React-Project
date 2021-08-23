const MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let productsRouter = express.Router()


productsRouter.use(function resetRouter(req, res, next) {
    next()
})

const connectionString = 'mongodb+srv://gina:gina1234@cluster0.kwdib.mongodb.net/FFTF?retryWrites=true&w=majority';
let db;
let products;

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    db = client.db('FFTF')

    products = db.collection('products')
})

productsRouter.get('/allProducts', (req, res) => {
    products.find().toArray()
        .then(result => {
            res.send(result);
        })
        .catch(error => console.error(error))
});

productsRouter.get('/getByID', (req, res) => {
    let query = { "id": req.body.id }
    products.findOne(query)
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
})



module.exports = productsRouter;