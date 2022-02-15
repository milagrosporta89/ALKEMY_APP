const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");
const apiController = require("../controllers/apiController");


//INICIO
router.get("/", mainController.index);
router.get("/entry", mainController.entry);
router.post("/entry", mainController.entryForm)
router.get("/withdrawal", mainController.withdrawal)
router.get ("/index2", mainController.index2)
module.exports = router; 
// ENDPOINTS

router.get("/balance", apiController.balance) 