const MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express();
var bodyParser = require('body-parser');

var nodemailer = require('nodemailer');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let usersRouter = express.Router()



var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'freshfromthefarmshop@gmail.com',
        pass: 'freshfarm123'
    }
});

usersRouter.use(function resetRouter(req, res, next) {
    next()
})

const connectionString = 'mongodb+srv://gina:gina1234@cluster0.kwdib.mongodb.net/FFTF?retryWrites=true&w=majority';



let db;
let users;

MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    db = client.db('FFTF')
    users = db.collection('users')
})



const validId = (id) => {
    var id = String(id).trim();
    if (id.length > 9 || id.length < 5 || isNaN(id)) return false;
    // Pad string with zeros up to 9 digits
    id = id.length < 9 ? ("00000000" + id).slice(-9) : id;

    return Array
        .from(id, Number)
        .reduce((counter, digit, i) => {
            const step = digit * ((i % 2) + 1);
            return counter + (step > 9 ? step - 9 : step);
        }) % 10 === 0;

}

const validPassword = (password1) => {
    var size = 0,
        key;
    for (key in password1) {
        size++;
    }
    return size >= 6;

}


usersRouter.put('/logUser', (req, res) => {
    console.log(" gmail:"+req.body.email);
    console.log("password:"+req.body.password);
    if ( req.body.password == undefined || req.body.email == undefined){
        console.log("this fields are required: "+req.body.password);
        res.send("this fields are required")
    }
    
    let query = { "email": req.body.email, "password": req.body.password }
    users.findOne(query)
        .then(a => {
            if (a == undefined) {
                console.log("a is undefined")
                res.send("The username or password is incorrect");
                return;
            }
            return res.send(a);
        }).catch(error => console.error(error));
    })
    


usersRouter.put('/updateCart',(req,res)=>{
    console.log("cart"+req.body.myCart)
    let query = { "email": req.body.email, "password": req.body.password };
    users.findOne(query).then((result)=>{
        if(result!=undefined){ 
           let b={email: req.body.email,
                  password:req.body.password,
                  currentShopping:req.body.myCart,
            
           };

           users.findOneAndUpdate(
            {_id:result._id},
            {
                $set: {
                 email: b.email,
                  password:b.password,
                  currentShopping:b.currentShopping,
             
                }
            },
            {
                upsert: true
            }
        )
        }
        
      })
      .then(() => res.send("ok"))
        .catch(error => console.error(error))
})






usersRouter.put('/payment',(req,res)=>{

    

    var mailOptions = {
        from: 'freshfromthefarmshop@gmail.com',
        to: req.body.email ,
        subject: 'Mesege from fresh from the farm shop',
        text: 'You order at Fresh FromThe Farm is ready!!!: '
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
      


    let query = { "email": req.body.email, "password": req.body.password };
    users.findOne(query).then((result)=>{
        if(result!==undefined){ 
          let  a=[...result.paidShopping, result.currentShopping];
           let b={email: req.body.email,
                  name:result.name,
                  id:result.id,
                  password:req.body.password,
                  confirmedPassword:result.confirmedPassword,
                  currentShopping:[],
                  paidShopping:a
           };

           users.findOneAndUpdate(
            {_id:result._id},
            {
                $set: {
                 email: b.email,
                  name:b.name,
                  id:b.id,
                  password:b.password,
                  confirmedPassword:b.confirmedPassword,
                  currentShopping:b.currentShopping,
                  paidShopping:b.paidShopping,
                  
                }
            },
            {
                upsert: true
            }
        )
        }
        
      })
      .then(() => res.send("ok"))
        .catch(error => console.error(error))
  })



usersRouter.post('/createUser', (req, res) => {

    if ( req.body.name == undefined || req.body.email == undefined || req.body.id == undefined|| req.body.password == undefined|| req.body.confirmedPassword == undefined) {
        console.log("this fields are required");
        res.send("this fields are required");
        return;
    }
    console.log("name: "+req.body.name)
    var regex = /^[a-zA-Z\s]+$/;
    if (!req.body.name.match(regex)) {
        console.log("The name is incorrect");
       return res.send("The name is incorrect");
    }

   
    var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!req.body.email.match(pattern)) {
        console.log("The email adress is incorrect");
        return res.send("The email adress is incorrect");
    }

    if (!validId(req.body.id)) {
        console.log("The Id is incorrect");
        return res.send("The id is incorrect");
    }


    if (req.body.password !== req.body.confirmedPassword) {
        console.log("couldn't confirm your password");
        return res.send("couldn't confirm your password");
    }
    if (!validPassword(req.body.password )) {
        console.log("the password must contain at least 6 characters");
        return res.send("the password must contain at least 6 characters");
    }

    let query = { "email": req.body.email, "password": req.body.password };
    let user = req.body;
                    
    user={...user, ...{currentShopping:[]},...{paidShopping:[]},}
    users.findOne(query).then((result)=>{
        if(result==undefined){ 
            users.insertOne(user)
        .then(() => {
            return res.send("ok");
        })}
        else{
            res.send("user already exists");
        }
    })


        .catch(err => { console.log(err); })
    })



module.exports = usersRouter;