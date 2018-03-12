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
    if(err){
        console.log(err);
    } else{
        console.log('Connected to database');
    }
});


const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//Set View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//Routes
//------------------------------------------------------------

//Home Route
app.get('/', (req, res) => {
    let vid;
    let com;
    db.query("SELECT * FROM comments INNER JOIN videos ON comments.video_id = videos.id WHERE videos.id = 1",(err,result, fields) => {
        if(err){

        } else{
            com = result;
        }
    });

    db.query("SELECT * FROM videos WHERE filename = 'https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/who_is_24g.mp4'",(err,result, fields) => {
        if(err){
            console.log("Result not found");
        } else{
            console.log(result[0].title);
            vid = result;
            
        }
    });

    res.render('index',{
        vidData: vid,
        comData: com
    });
    
});

//Route
app.get('/video2', (req, res) => {
    let obj = {};
    db.query("SELECT * FROM comments INNER JOIN videos ON comments.video_id = videos.id WHERE videos.id = 1",(err,result, fields) => {
        if(err){

        } else{
            res.render('index',{
                comData: result
            });
        }
    });

    db.query("SELECT * FROM videos WHERE filename = 'https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/ces_overview.mp4'",(err,result, fields) => {
        if(err){
            console.log("Result not found");
        } else{
            console.log(result[0].title);
            // obj= {
            //     vidData: result
            // };
            
        }
    });

    
    
});

//Route
app.get('/video3', (req, res) => {
    let obj = {};
    db.query("SELECT * FROM videos WHERE filename = 'https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/future_of_drones.mp4'",(err,result, fields) => {
        if(err){
            console.log("Result not found");
        } else{
            console.log(result[0].title);
            res.render('index',{
                data: result
            });
        }
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

