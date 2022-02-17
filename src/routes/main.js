const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const apiController = require("../controllers/apiController");
const db = require ("../database/models")

//INICIO
router.get("/", mainController.index);
router.get("/entry", mainController.entry);

router.get("/withdrawal", mainController.withdrawal)


router.get("/balance", apiController.balance) 
router.get("/entryData", apiController.entryData) 

router.post ("/entry", mainController.entryForm)
router.post ("/withdrawal",mainController.withdrawalForm)
router.get("/edit/:id", mainController.edit)



module.exports = router; 
// ENDPOINTS