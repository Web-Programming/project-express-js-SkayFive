// Install paket mongoose menggunakan npm: npm install mongoose
const mongoose = require("mongoose");
const dbURL = "mongodb://localhost:27017/paw2-si5c";

mongoose.connect(dbURL, {});
mongoose.mongoose.connection.on("connected", () => {
    console.log(`mongoose connected to ${dbURL}`);
});
mongoose.connection.on("error", (err) => {
    console.log("Mongoose Connection error:", err);
});
mongoose.connection.on("disconnected", ()  => {
    console.log("Mongoose disconnected")
});