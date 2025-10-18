// const users = require("../models/users");
const User = require("../models/users");
const CreateUser = async(req, res) => {
    try{
        const newUser = new users({
            name: req.body.user,
            email: req.body.email,
            password: req.body.password,
            addres: req.body.address,
            isAdmin: req.body.isAdmin
        })
        const User = await newUser.save();
        res.status(200).json({
            status : error,
            message : "User Tidak Ditemukan",
            data : User
        });
    }catch(err){
        res.status(500).json ({
            status : false,
            message : "Internal Server Error"
        });
    } 
};

const detailUser = async(req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);

        if(!user) {
            return res.status(404).json({
                status  : false,
                message : "User Tidak Ditemukan"
            });
        }
    }
}