const express = require("express");
const path = require('path');
require("dotenv").config();
var cors = require('cors')
const session = require("express-session");
const MongoDbSession = require("connect-mongodb-session")(session);

//file imports  
const db = require("./config/db");
const userRoutes = require("./routes/user");
const bookRoutes = require("./routes/book");

const app = express();

// serving frontend
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (_, res) {
    res.sendFile(
        path.join(__dirname, "./client/build/index.html"),
        function (err) {
            res.status(500).send(err);
        }
    );
});


//middlewares
app.use(cors())
app.use(express.json());

//store for mongodb session
const store = new MongoDbSession({
    uri: process.env.MONGO_URI,
    collection: "sessions"
})

//using the session middleware
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: store
    })
)

//addiong all routes from routes folder
app.use("/", userRoutes)
app.use("/", bookRoutes)

app.listen(process.env.SERVER_PORT, () => {
    console.log("server is running at port ", process.env.SERVER_PORT);
})
