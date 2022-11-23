const express = require("express");
const mongo = require("mongoose");
const router = express.Router();

var uri = "mongodb+srv://user:MYLAaxtu3YPEQ2bL@cluster0.fzxyqt5.mongodb.net/nodeApp1?retryWrites=true&w=majority";


router.get("/",async (req,res)=>{
    mongo.connect(uri,function(err, db) {
        if (err) throw err;
        db.collection("wishList").find({ }).toArray(async function(err, result) {
            if (err) throw err;
              res.render("wishList.ejs",{data:result});
            db.close();
            });
    });
});

// Export the router
module.exports = router;