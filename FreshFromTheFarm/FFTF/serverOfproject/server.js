const cors = require ('cors');
const corsOptions={
    origin:'http://localhost:3000',
    credentials: true,
    optionSuccessStatus:200
}
let express = require("express");
let app = express();
app.use(cors(corsOptions));

let bodyParser = require("body-parser");
let router = express.Router()
const MongoClient = require('mongodb').MongoClient

router.use(function resetRouter(req, res, next) {
    next()
})

//const connectionString = 'mongodb+srv://pandgClothing:p&gClothing@cluster0.eznk0.mongodb.net/shop?retryWrites=true&w=majority';



let db;
let users;
let products;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/users', require('./users'));

app.use('/products', require('./products'));

let server = app.listen(27017, function () {   
    console.log("success");
});


app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.get('/', (req, res) => {
    res.json({ "message": "Congratulations! you are working great!" });
});

