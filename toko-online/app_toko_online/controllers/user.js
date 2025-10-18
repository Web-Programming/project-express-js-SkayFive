const User = require("../models/users");

exports.test  = (req, res) => {
    res.status(200).json({
        status: true,
        message : "Test endpoint berhasil"
    });
}

//CRUD CONTROLLER UNTUK USER
//Read All - Mengambil semua Data  User
const all = async (req, res) => {
    try{
        const users = await User.find({}).select('-password');
        res.status(200).json({
            status : true,
            message : "Data User Berhasil Di Ambil",
            data : users
        });
    } catch (err) {
        console.error(" ERROR SAAT CREATE USER:", err);
        res.status(500).json({
            status : false,
            message : "Gagal Memuat User"
        });
    }
};

// CREATE/INSERT DATA USER
const create = async (req, res) => {
    try{
        //1. Ambil Data Dari Request Body
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            isAdmin: req.body.isAdmin || false
        });

        //2. Simpan Data Melalui MongoDb melalui model user
        const user = await newUser.save();

        //3. Hapus Password  Dari Respon
        const userRespon = user.toObject();
        delete  userRespon.password;

        //4. Kirim Respon Sukses ke User
        res.status(200).json({
            status : true,
            message : "User Berhasil Di Simpan",
            data : userRespon
        });
    } catch (err) {
        console.error(" ERROR SAAT CREATE USER:", err);
        if (err.name === 'validationError') {
            res.status(400).json({
                status : false,
                message : err.message
            });
        } else if (err.code === 11000) {
            // Error Duplicate key (Username atau Email Sudah Ada)
            res.status(400).json ({
                status : false,
                message : "Username Atau Email Sudah Terdaftar"
            });
        } else {
            res.status(500).json({
                status : false,
                message : "Internal Server Error"
            });
        }
    }
};

// READ ONE/DETAIL USER
const detailuser = async (req, res) => {
    try {
        //Ambil id
        const userId = req.params.id;
        //Cari Berdasarkan Id
        const user = await User.findById(userId).select('-password'); // Exclude Password

        // Kirim Respon Sukses 
        res.status(200).json({
            status : true,
            message : "Detail User Berhasil Diambil",
            data : user
        });
    } catch (err) {
        res.status(500).json({
            status : false,
            messsage : "Gagal Memuat Detail User"
        });
    }
};

//UPDATE DATA USER
const  update = async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select("-password");

        if (!user) {
            res.status(404).json({
                status : false,
                message : "User Tidak Ditemukan"
            });
        }
        // Kirim respon Sukses
        res.status(200).json({
            status : true,
            message : "User Berhasil Di Update",
            data : user
        });
    } catch (err) {
        if (err.name === 'CastError') {
            res.status(400).json({
                status : false,
                message : "Format ID Tidak Valid"
            });
        } else if (err.name === 'ValidationError') {
            res.status(400).json ({
                status : false,
                messsage : err.message
            });
        } else if (err.code === 11000) {
            res.status(400).json({
                status : false,
                message : "Username atau Email Sudah terdaftar"
            });
        } else {
            res.status(500).json({
                status : false,
                message : "Internal Server Error"
            });
        }
    }
};

// DELETE/REMOVE/DESTROY DATA USER
const remove = async (req, res) => {
    try{
        // Hapus  Menggunakan method findbyIdAndUpdate
        const user = await user.findByIdAndUpdate(req.params.id);

        if (!user) { // Kirim Respon Gagal
            res.status(404).json({
                status  : false,
                message : "User Tidak Ditemukan"
            });
        } else {
            // Kirim respon Sukses
            res.status(200).json({
                status : true,
                message : "User Berhasil Dihapus"
            });
        }
    } catch (err) {
        if (err.name === 'CastError') {
            res.status(400).json({
                status : false,
                message : "Format ID Tidak Valid"
            });
        } else {
            res.status(500).json({
                status: false,
                message : "Internal Server Error"
            });
        }
    }
};

module.exports = {all, create, detailuser, update, remove};