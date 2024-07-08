const express = require("express");

const {
    createHotels,
    retrieveHotels,
    updateHotelsByHotelsId,
    deleteHotelsByHotelsId,

} = require('../controllers/hotelsController');
const { authenticateToken } = require("../middleware/authenticateToken");

const  multerConfig =  require('../middleware/multer');

const router = express.Router();

router.post("/hotels",multerConfig.array('image'),createHotels);
router.get("/hotels", retrieveHotels);
router.post("/hotels/:id",multerConfig.array('image'), updateHotelsByHotelsId)
router.delete("/hotels/:id", deleteHotelsByHotelsId)

module.exports = router;