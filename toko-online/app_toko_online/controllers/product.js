const products = require("../../data/products.json");
const Product = require("../models/product");
const index = async(req,res) => {
   try {
    //gunakan find({})
    //untuk mengambil seluruh data dari collection
        const prod = await Product.find({});
        res.render('index', {
            title : 'Toko Online Sederhana - ini dari mongo DB',
            products : prod,
        });
    } catch (err) {
        res.ststus(500).send('Gagal memuat produk')
    }
};

const detail = async (req, res) => {
    try{
        //const productId = parseInt(req.params.id); //Tangkap ID dari URL
        //const product = products.find(p => p.id === productId); //Cari produk by id
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if(!product){ //jika produk tidak ditemukan
            return res.status(404).send('Produk tidak ditemukan!');
        }
        res.render('product-detail',{
            title : product.name,
            product : product
        });
    }catch(err){
        res.status(404).send("Gagal Memuat detail produk")
    }
};

// Membuat ress API
const all = async (req, res) => {
    try{
        const prod = await Product.find({});
        res.status(200).json(
            {
                status : true,
                message : "Data produk Berhasil di Ambil",
                data : prod
            });
    }catch (err) {
        res.status(500).json({
            status : false,
            message : "Gagal Memuat produk"
        });
    }
};

//CRUD  controller
//Create atau insert data
const create = async(req, res) => {
    try {
        // Ambil data dari request body
        const newProduct = new Product({
            name : req.body.name,
            price : req.body.price,
            description : req.body.description,
            stock : req.body.stock || 0
        });
        // simpan data ke db melalui model product
        const product = await newProduct.save();
        
        // kirim respon dari request ke user
        res.status(200).json ({
            status : true,
            message : "Produk Berhasil Disimpan",
            data : product
        });
    } catch (err) {
        res.status(500).json ({
            status : false,
            message : "Internal Server Error"
        });
    }
};

//read one /detail product
const detailproduk = async(req, res) => {
    try{
        const productId = req.params.id;
        const product = await Product.findById(productId);

        if(!product) {
            return res.status(404).json({
                status : false,
                message : "Produk Tidak di temukan"
            });
        }
        res.status(200).json({
            status : true,
            message : "Detail Produk Ditemukan",
            data : product
        });
    } catch (err) {
        res.status(500).json({
            status : false,
            message : "Gagal Memuat Detail Produk"
        });
    }
};

const update = async(eq, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new : true,             // Mengembalikan dokumen yang telas di update
            runValidators : true    // menjalankan validasi schema saat update
        });
    } catch (err) {
        if(err.name === 'Validation Error') {
            res.status(400).json({
                status : false,
                message : "Format ID tidak valid"
            });
        } else if(err.name === 'ValidationError'){
            res.status(400).json({
                status : false,
                message : err.message
            });
        } else {
            res.status(500).jason({
                status : false, 
                message : "Internal Server Error"
            });
        }
    }
};

const remove = async(req, res) => {
    try{
        //hapus menggunakan method FindByIdAndDelete
        const product = await Product.findByIdAndDelete(req.params.id);

        if(!product) {
            res.status(404).json({
                status : false, 
                message : "Produk Tidak Ditemukan"
            });
        } else {
            // Kirim respon sukses
            res.status(200).json({
                status : true,
                message : "Produk Berhasil Dihapus"
            });
        }
    }catch (err) {
        if(err.name  === 'CastError'){
            res.status(400).json({
                status : false,
                message : "Format ID tidak valid"
            });
        } else {
            res.status(500).json({
                status : false, 
                message : "Internal Server error"
            });
        }
    }
};

module.exports = { index, detail, all, create, detailproduk,
    update, remove }