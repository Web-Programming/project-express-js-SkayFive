const mongoose = require("mongoose");
// const { create } = require("./product");
// const Product = require("./product");

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "username hasur diisi"],
        unique : true,
        trim : true
    },
    email : {
        type : String,
        required : [true, "Email Harus Diisi"],
        unique : true,
        // Regex Untuk Validasi Vormat Email
        match : [
            /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
            "Harap Isi Alamat Email Yang Valid", 
        ]
    },
    password : {
        type : String,
        required : [true, "Password harus diisi"],
        minlength : [8, "Kata sandi wajib diisi"],
        Select : false, // Penting jangan sertakan password saat query get
    },
    addres : {
        type : String,
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    createAt : {
        type : Date,
        default : Date.now
    }
});

const User = mongoose.model("user", UserSchema)
module.exports = User;