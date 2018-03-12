

// window.onload = function(){

//     db.query("SELECT * FROM videos WHERE filename = 'https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/who_is_24g.mp4'", (err, result, fields) => {
//         if(err){
//             throw err;
//         }
//         document.getElementById("views").innerHTML = result[0].views;
//     })

module.exports.start1 = function(){
    
    window.document.getElementById("thumbs-up").innerHTML = "0 ";
    window.document.getElementById("thumbs-down").innerHTML = "0 ";
}

function loadVideo(video){
    
    if(video === "video1"){
        document.getElementById("main-video").src = "https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/who_is_24g.mp4";
        document.getElementById("main-video").autoplay="true";
    }
    if(video === "video2"){
        document.getElementById("main-video").src = "https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/ces_overview.mp4";
        document.getElementById("main-video").autoplay="true";

    }
    if(video === "video3"){
        document.getElementById("main-video").src = "https://static-email-hosting.s3.amazonaws.com/24G_Test_Project/videos/future_of_drones.mp4";
        document.getElementById("main-video").autoplay="true";
    }
    
}

