const express = require("express");
const router = express.Router();
const productController = require("../../controllers/product");

//Url create --> POST (/api/product)
router.post("/", productController.create);
//url read all --> GET (/api/product)
router.get("/", productController.all);
//url read one - detail --> GET (/api/product/:id)
router.get("/:id", productController.detailproduk);
//url update --> PUT (/api/product/:id)
router.put("/:id", productController.update);
//url delete --> DELETE (/api/product/:id)
router.delete("/:id", productController.remove);

module.exports = router;
