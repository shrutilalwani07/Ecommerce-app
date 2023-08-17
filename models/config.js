const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect("mongodb://127.0.0.1:27017/E_commerce", { useNewUrlParser: true }).then((data) => {
    console.log("MongoDB database connection established", data.connection.name);
}).catch((error) => {
    console.log( error);
})
