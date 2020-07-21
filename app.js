const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https= require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.listen(3000, function() {
  console.log("Server is up and running on port 3000");
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  const fname= req.body.fName;
  const lname= req.body.lName;
  const email= req.body.eMail;
  var data= {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: fname,
          LNAME: lname
      }
    }
    ]
  }
  const jsonData= JSON.stringify(data);
  const url= "https://us10.api.mailchimp.com/3.0/lists/ce892fc836";
  const options= {
    method: "POST",
    auth: "f003kj6:f9c75faab539b75185a3f33d5224996f-us10"
  }

  const request= https.request(url, options, function(response){

      if (response.statusCode==200){
        res.sendFile(__dirname + "/success.html");
      }
      else {
        res.sendFile(__dirname + "/failure.html");

      }
      response.on("data", function(data){
        console.log(JSON.parse(data));
      }
    )

  })



  //request.write(jsonData);
  request.end();
})

app.post("/failure", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

//API Key
//f9c75faab539b75185a3f33d5224996f-us10
//List
//ce892fc836
