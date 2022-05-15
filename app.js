const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=e6dca6f212350a4ba7449e1ab83af504&q="+query;
    https.get(url,function(response){
        console.log(response.statusCode)
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p> The Weather is currently "+weatherDescription+"</p>");
            res.write("<h1> The temperature in " +query+ "is "+temp+" Kalvins </h1>");
            res.write("<img src="+imgURL+">");
            res.send(); 
        });
    });
});
app.listen(5000,function(){
    console.log("App is running on Port 5000");
});