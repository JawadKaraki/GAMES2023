const express = require("express");
const bcrypt = require("bcrypt");
const mongo = require("mongoose");
const  mongoSanitize = require("express-mongo-sanitize");
const session = require("express-session");

const router = express.Router();

const user = {
    email : "",
    pass : ""
}


var uri = "mongodb+srv://user:MYLAaxtu3YPEQ2bL@cluster0.fzxyqt5.mongodb.net/nodeApp1?retryWrites=true&w=majority";


router.get("/",async (req,res)=>{
    const isLogged = session.email;
    if(isLogged){
        res.render("hello.ejs",{email : isLogged});
    }else{
        res.render("login.ejs");
    }
    
});

router.post("/",(req,res,next)=>{
    mongo.connect(uri,function(err, db) {
        if (err) throw err;
        var query = {email:req.body.email}
        mongoSanitize.sanitize(query);
        db.collection("users").find(query).toArray(async function(err, result) {
            if (err) throw err;
            if(result.length == 1){ 
                user.email = result[0].email;
                user.pass = result[0].pass;
            }else{
                res.render("login.ejs");
            }

            bcrypt.compare(req.body.password, user.pass, function(err, result) {
                if (result) {
                    session.email = user.email;
                    res.render("hello.ejs",{email : session.email});
           
                }else{
                    res.redirect("/");
                }
            });

            
            db.close();
            });
    });
});
// Export the router
module.exports = router;