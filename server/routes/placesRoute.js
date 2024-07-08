const express = require("express");

const {
    createPlaces,
    retrievePlaces,
    updatePlacesByPlacesId,
    deletePlacesByPlacesId,

} = require('../controllers/placesController');
const { authenticateToken } = require("../middleware/authenticateToken");

const  multerConfig =  require('../middleware/multer');

const router = express.Router();

router.post("",multerConfig.array('image'),createPlaces);
router.get("", retrievePlaces)
router.post("/:id",multerConfig.array('image'), updatePlacesByPlacesId)
router.delete("/:id", deletePlacesByPlacesId)

module.exports = router;