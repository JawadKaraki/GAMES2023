const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const mongo = require("mongoose");
const mongoSanitize = require("express-mongo-sanitize");
const cookieParser = require("cookie-parser");

var uri = "mongodb+srv://user:MYLAaxtu3YPEQ2bL@cluster0.fzxyqt5.mongodb.net/?retryWrites=true&w=majority";

router.use(cookieParser());

router.get("/",async (req,res)=>{
    res.render("reg.ejs");
});

router.post("/",async (req,res)=>{
    var user;
    var InputEmail = req.body.email;
    var InputPass = req.body.password;
    //sanitize input
    mongoSanitize.sanitize(InputEmail);
    mongoSanitize.sanitize(InputPass);
    await bcrypt.hash(InputPass, 10, function(err, hash) {
        user = {
            email:InputEmail,
            pass:hash
        }
    });
    await mongo.connect(uri,function(err, db) {
        
        if (err) throw err;
        db.collection("users").insertOne(user, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
        res.redirect("/");
    });

});

// Export the router
module.exports = router;