const express = require("express");
// const users = require("../../models/users");
const router = express.Router();
const orderController = require("../../controllers/order");
const auth = require('../Middleware/authMiddleware');

//Url create --> POST (/api/order)
router.post("/", auth.authMiddleware , orderController.create);
//url read all --> GET (/api/order)
router.get("/", orderController.all);
//url read one - detail --> GET (/api/order/:id)
router.get("/:id", orderController.detailOrder);
//url update --> PUT (/api/order/:id)
router.put("/:id",auth.authMiddleware ,orderController.update);
//url delete --> DELETE (/api/user/:id)
// router.delete("/:id", orderController.remove);

module.exports = router;