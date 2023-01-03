const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


var app=express();
var apikey="";
var list_id="";

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res)
{
  var fname=req.body.fname;
  var lname =req.body.lname;
  var email=req.body.email;
  var data={
    members:[{
    email_address:email,
    status:"subscribed",
    merge_fields:
    {
      FNAME:fname,
      LNAME:lname
    }
  }]
};
  var jsondata=JSON.stringify(data);
  var url="https://us21.api.mailchimp.com/3.0/lists/8d38c2a717";
  var options={
    method:"POST",
    auth:"divyam_arora:95ce780d6edc614ae204e4c829e8d11a-us21"
  }
  const request=https.request(url,options,function(response){
      response.on("data",function(data){

        console.log(JSON.parse(data));
        var x=response.statusCode;
        console.log(x);
        if(x>=200&&x<300){
          res.sendFile(__dirname+"/success.html");
        }
        else{
          res.sendFile(__dirname+"/failure.html");
        }
      });
  });
  request.write(jsondata);
  request.end();
});

app.post("/failure",function(req,res)
{
  res.redirect("/");
});
app.listen(process.env.PORT||3000,function(){
  console.log("server 3000 is running");
});
