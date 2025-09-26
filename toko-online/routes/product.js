var express = require("express");
var router = express.Router();
var products = require("../data/products.json");

router.get("/:id", function(req,res, next){
    const productId = parseInt(req.params.id); //Tangkap ID dari URL
    const product = products.find(p => p.id === productId);

    if(!product){ // jika produk tidak di temukan
        return res.status(404).sen('Produk Tidak Ditemukan');
    }

    res.render('product-detail',
        {
            title : product.name,
            product : product
        }
    );
});
module.exports =  router;