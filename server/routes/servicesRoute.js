const express = require("express");
const {
    createServices,
    retrieveServices,
    updateServicesByServicesId,
    deleteServicesByServicesId,

} = require('../controllers/servicesController');
const { authenticateToken } = require("../middleware/authenticateToken");

const  multerConfig =  require('../middleware/multer');

const router = express.Router();

router.post("/services",multerConfig.single('icon'),createServices);
router.get("/services", retrieveServices);
router.post("/services/:id",multerConfig.single('icon'), updateServicesByServicesId)
router.delete("/services/:id", deleteServicesByServicesId)

module.exports = router;