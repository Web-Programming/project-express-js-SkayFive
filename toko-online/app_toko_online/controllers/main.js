var products = require('../../data/products.json');

const index = (req, res) => {
  res.render('index', 
    { title: 'Toko Online Sederhana', 
        products: products });
}; 

const search = (req,res, next) => {
//tulis kode untuk mendapatkan query pencarian 'q' dari req.query
const q = req.query.q ? req.query.q.toLowerCase():"";
//filter array 'products berdasarkan q'
let filteredProducts;
if (q === "") {
  //Jika query kosong tampilkan semua product
  filteredProducts = products;
} else {
  // Jika query filter berdasarkan nama product
  filteredProducts = products.filter((product) => 
    product.name.toLocaleLowerCase().includes(q)
  );
}
// kirim hasil filter ke view 'index' atau view 'search-result' baru
res.render("index", {
    title: "Hasil Pencarian",
    products: filteredProducts,
    query: q
  });
};

module.exports = { index, search}; 
