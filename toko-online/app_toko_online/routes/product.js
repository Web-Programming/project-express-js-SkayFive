var express = require("express");
var router = express.Router();
var products = require("../../data/products.json");

router.get("/:productId/review/:reviewId", function(req, res,next) {

    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    // const product = products.find(p => p.id === productId);

    // if (!product) {
    //     return res.status(404).send("Produk Tidak Ditemukan");
    // }

    res.render("review-detail", {
        title : `ulasan ${reviewId} untuk produk ${productId}`,
        // product : product,
        productId : productId,
        reviewId : reviewId
    });
});

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