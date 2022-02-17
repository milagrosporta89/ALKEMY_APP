const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const apiController = require("../controllers/apiController");
const db = require ("../database/models")

//RUTAS
router.get("/", mainController.index);
router.get("/entry", mainController.entry);
router.get("/withdrawal", mainController.withdrawal)
router.get("/edit/:id", mainController.edit)

router.post ("/entry", mainController.entryForm)
router.post ("/withdrawal",mainController.withdrawalForm)

//ENDPOINTS
router.get("/balance", apiController.balance) 
router.get("/entryData", apiController.entryData) 
router.get("/withdrawalData", apiController.withdrawalData) 


module.exports = router; 