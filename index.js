const  express =  require("express");
const  mongoSanitize = require("express-mongo-sanitize");
const app = express();

const session = require('express-session');
const cors = require('cors');

const PORT = process.env.PORT || 3030;

const data = [
    {
        title : "CALL OF DUTY",
        description : "",
        img : "https://images6.alphacoders.com/124/1245270.jpg"
    },
    {
        title : "ASSASSIN CREED MIRAGE",
        description : "",
        img : "https://images2.alphacoders.com/127/1271236.jpg"
    },
    {
        title : "GOD OF WAR",
        description : "",
        img : "https://free4kwallpapers.com/uploads/originals/2019/02/18/kratos-god-of-war-wallpaper.jpg"
    },
    {
        title : "FORTNITE",
        description : "",
        img : "https://c4.wallpaperflare.com/wallpaper/253/128/906/fortnite-travis-scott-hd-wallpaper-preview.jpg"
    },
    {
        title : "GHOST OF TUSHIMA",
        description : "",
        img : "https://www.psu.com/wp/wp-content/uploads/2020/09/Ghost-of-Tsushima-PS4-PS5-Wallpapers-Backgrounds-8-min.jpg"
    },
]


app.use(mongoSanitize());
app.set("view-engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended : false}));

const login = require("./routes/login");
const register = require("./routes/register");
const games = require("./routes/games");
const wishList = require("./routes/wishList");


app.use(cors());
app.use("/register",register);
app.use("/games",games);
app.use("/wishList",wishList);
app.use("/",login);

app.get("/logout",(req,res)=>{
    session.email = null;
    res.redirect("/");
});

app.get("/react",(req,res)=>{
    res.send(data);
})

app.listen(PORT,()=>{
    console.log("listening");
});
