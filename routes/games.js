const express = require("express");
const mongo = require("mongoose");
const router = express.Router();

var uri = "mongodb+srv://user:MYLAaxtu3YPEQ2bL@cluster0.fzxyqt5.mongodb.net/nodeApp1?retryWrites=true&w=majority";


router.get("/",async (req,res)=>{
      res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    mongo.connect(uri,function(err, db) {
        if (err) throw err;
        db.collection("games").find({}).toArray(async function(err, result) {
            if (err) throw err;
              res.render("games.ejs",{data:result});
            db.close();
            });
    });
});
router.post("/",async (req,res)=>{
    console.log(req.body.id);
    await mongo.connect(uri,function(err, db) {
      if (err) throw err;
      db.collection("wishList").insertOne({gameId : req.body.id,userId : 1}, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
      });
      res.redirect("/");
  });
});

// Export the router
module.exports = router;