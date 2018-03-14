const mysql = require('mysql');
const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const ejs = require('ejs');
const bodyParser = require('body-parser');




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

//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
let jsonParser = bodyParser.json();

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


app.get('/video:id', (req, res) => {
    let query = "SELECT * FROM videos where id = " + req.params.id;
    db.query(query, (err, result, fields) => {
        let query2 = "SELECT * FROM comments INNER JOIN videos ON comments.video_id = videos.id WHERE videos.id = " + req.params.id + " ORDER BY commentTime DESC";
        db.query(query2,(err, result1, fields) => { 
            for(i = 0; i < result1.length; i++){
                result1[i].commentTime = timeDifference(Date.now(), result1[i].commentTime);
            }
            res.render("index",{
                data: result,
                comments: result1
            });
        });
    });
});

app.post('/addComment', jsonParser, (req, res) => {
    let com = req.body;
    let query = "INSERT INTO comments (video_id, firstName, lastName, commentTime, comment) values (" + com.videoId + ", '"+ com.firstName+"','"+ com.lastName+"','"+ com.commentTime+"','"+ com.comment+"')";
    // console.log(query);
    db.query(query, (err, result, fields) => {
        if(err){
            console.log(err);
        } 
        else{
            let query2 = "SELECT * FROM comments INNER JOIN videos ON comments.video_id = videos.id WHERE videos.id = " + com.videoId + " ORDER BY commentTime DESC";
            db.query(query2,(err, result1, fields) => { 
                if(err){
                    console.log(err);
                }
                else { 
                    res.status(200);
                    for(i = 0; i < result1.length; i++){
                        result1[i].commentTime = timeDifference(Date.now(), result1[i].commentTime);
                    }
                    
                    res.render("comments",{
                        comments: result1
                    });
                    res.end();
                }
            });
        }
    });
});

app.post('/updateStats', jsonParser, (req, res) => {
    let com = req.body;
    

    let query = "UPDATE videos SET views = " + com.views + ",thumbsUp = " + com.thumbsUp + ",thumbsDown = " + com.thumbsDown + " WHERE id = "+ com.id; 
    db.query(query, (err, result, fields) => {
        if(err){
            console.log(err);
        } 
        else{
            
        }
    });
});

//Express server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});



function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
}