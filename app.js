const mysql = require('mysql');
const express = require('express');
const file = require('fs');
const http = require('http');

const app = express();

const db = mysql.createConnection({
    host: 'neil-dev.c6nail1iwzsm.us-east-1.rds.amazonaws.com',
    user: 'dev',
    password: 'j3fpT4xAnjTKLaQKEceK',
    database: 'demo'
});




db.connect((err) => {
    if(err){
        console.log(err);
    } else{
        console.log('Connected to database');
    }
});
     
app.use(express.static(__dirname));
const videoInfo = require('./videoInfo');


// app.get('*', (req, res) => {
//     // res.sendFile(path.join(__dirname, 'public/index.html'));
//     console.log("Hello");
//     document.getElementById("views") = "0";
// });

app.listen('3000', () => {
    console.log('Server started on port 3000');
});

