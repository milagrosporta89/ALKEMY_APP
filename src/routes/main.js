const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const apiController = require("../controllers/apiController");
const db = require ("../database/models")

//RUTAS
router.get("/", mainController.index);
router.get("/entry", mainController.entry);
router.get("/withdrawal", mainController.withdrawal)
/* router.get("/edit/:id", mainController.edit) */
router.get("/desktop", mainController.desktop)
router.get("/categoryEdit", mainController.categoryEdit)

router.post ("/entry", mainController.entryForm)
router.post ("/withdrawal",mainController.withdrawalForm)
router.post ("/categoryEdit", mainController.newCategory)

router.delete ("/edit/:id", mainController.delete)
router.post ("/edit/:id", mainController.update )
//ENDPOINTS
router.get ("/category", apiController.category)
router.get("/balance", apiController.balance) 
router.get("/entryData", apiController.entryData) 
router.get("/withdrawalData", apiController.withdrawalData) 


module.exports = router; 