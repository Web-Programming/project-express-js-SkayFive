const express = require("express");
const users = require("../../models/users");
const router = express.Router();
const userController = require("../../controllers/users");

//Url create --> POST (/api/product)
router.post("/", userController.create);
//url read all --> GET (/api/product)
router.get("/", userController.all);
//url read one - detail --> GET (/api/product/:id)
router.get("/:id", userController.detailUser);
//url update --> PUT (/api/product/:id)
router.put("/:id", userController.update);
//url delete --> DELETE (/api/product/:id)
router.delete("/:id", userController.remove);

module.exports = router;