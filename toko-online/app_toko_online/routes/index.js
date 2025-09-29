var express = require('express');
var router = express.Router();
var mainControllers = require('../controllers/main');

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Toko Online Sederhana', products: products });
// });

// router.get("/search", function(req,res, next){
// //tulis kode untuk mendapatkan query pencarian 'q' dari req.query
// const q = req.query.q ? req.query.q.toLowerCase():"";
// //filter array 'products berdasarkan q'
// let filteredProducts;
// if (q === "") {
//   //Jika query kosong tampilkan semua product
//   filteredProducts = products;
// } else {
//   // Jika query filter berdasarkan nama product
//   filteredProducts = products.filter((product) => 
//     product.name.toLocaleLowerCase().includes(q)
//   );
// }
// // kirim hasil filter ke view 'index' atau view 'search-result' baru
// res.render("index", {
//     title: "Hasil Pencarian",
//     products: filteredProducts,
//     query: q
//   });
// });

//Home
router.get("/", mainControllers.index);
//Search
router.get("/search", mainControllers.search);

module.exports = router;
