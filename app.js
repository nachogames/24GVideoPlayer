const mysql = require('mysql');
const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const ejs = require('ejs');

//Connect to MYSQL Database
const db = mysql.createConnection({
    host: 'neil-dev.c6nail1iwzsm.us-east-1.rds.amazonaws.com',
    user: 'dev',
    password: 'j3fpT4xAnjTKLaQKEceK',
    database: 'demo'
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to database');
    }
});


const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//Set View engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
// res.sendFile(path.join(__dirname+'/index.html'));


//Routes
//------------------------------------------------------------

//Home Route
app.get('/', (req, res) => {
    res.redirect('/video1');

});


app.get('/video1', (req, res) => {
    let query = "SELECT * FROM videos where id = 1"
    db.query(query, (err, result, fields) => {
        res.render('index',{
            data: result
        });
    });
});

//Route
app.get('/video2', (req, res) => {  
    let query = "SELECT * FROM videos where id = 2"
    db.query(query, (err, result, fields) => {
        res.render('index',{
            data: result
        });
    });
});

//Route
app.get('/video3', (req, res) => {
    let query = "SELECT * FROM videos where id = 3"
    db.query(query, (err, result, fields) => {
        res.render('index',{
            data: result
        });
    });
});


app.post('/addComment', (req, res) => {
    console.log(req.body.commentTyped);
    // db.query("Insert INTO comments (video_id, firstName, lastName, commentTime, comment) VALUES(1,'Neil','McEachin','January'"+req.body.comment,(err,result, fields) => {
    //     console.log("Post made " + );
    //     if(err){
    //         console.log("Result not found");
    //     } else{

    //     }
    // });
});

//Express server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});