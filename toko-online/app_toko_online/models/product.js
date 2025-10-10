const mongoose = require("mongoose");
//Buat schema produk
const ProductSchema = new mongoose.Schema ({
    // Tidak perlu membuat properti id karena akan di buat otomatis
    // dengan nama .id
    name : {
        type : String,
        required: [true, "Nama Produk Harus Diisi"],
        trim : true, // Menghilangkan spasi di awal dan di akhir
    },
    price: {
        type : Number,
        required : [true, "Harga Produk Harus Diisi"],
        min : [1000, "Harga Produk Minimal 1000"], // Nilai minimum
        // max :  [1000000, "Harga Produk Maximal 1000000"] // Nilai maximum jika perlu 
    },
    description: {
        type : String,
        required : false, // Menandakan kolom wajib diisi atau tidak
    },
    stock: {
        type : Number,
        default : 0, // Memberikan nilai bawaan
    },
    createAt: {
        type : Date,
        default: Date.now
    }
});
// buat model dari schema
const Product = mongoose.model('Product',ProductSchema);

module.exports = Product;