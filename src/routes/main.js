const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const apiController = require("../controllers/apiController");
const db = require ("../database/models")

//RUTAS
router.get("/", mainController.index);
router.get("/categoryEdit", mainController.categoryEdit)

router.post ("/add", mainController.add)
router.post ("/categoryEdit", mainController.newCategory)
router.delete ("/edit/:id", mainController.delete)
router.post ("/edit/:id", mainController.update )
//ENDPOINTS
router.get ("/category", apiController.category)
router.get("/balance", apiController.balance) 

module.exports = router; 