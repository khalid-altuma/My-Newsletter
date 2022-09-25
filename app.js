const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    const memberData = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(memberData);
    const url = "https://us8.api.mailchimp.com/3.0/lists/93b7251f4d"
    const options = {
        method: "POST",
        auth: "khalid1:06ca0c2820d2109c73bb7437bbaa60cb-us8"
    }

    const myRequest = https.request(url, options, function(response){
        response.on("data", function(d){
            const dataGot = JSON.parse(d);
            if(response.statusCode == 200){
                res.sendFile(__dirname + "/success.html")
            } else {
                res.sendFile(__dirname + "/failure.html")
            }
        })
    })
    myRequest.write(jsonData); 
    myRequest.end(); 
})

app.post("/failure", function(req, res){
    res.redirect("/")
})
app.post("/success", function(req, res){
    res.redirect("/")
})

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})
app.listen(process.env.PORT || 3000, function(req, res){
    console.log("server is running on port 3000");
})

// 06ca0c2820d2109c73bb7437bbaa60cb-us8

// 93b7251f4d

// add reverse rotation of the icon on click
