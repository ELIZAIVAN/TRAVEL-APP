const express = require("express");

const {
    createSavedplaces,
    retrieveSavedplaces,
    updateSavedplacesBySavedplacesId,
    deleteSavedplacesBySavedplacesId,

} = require('../controllers/savedplacesController');
const { authenticateToken } = require("../middleware/authenticateToken");

const  multerConfig =  require('../middleware/multer');

const router = express.Router();

router.post("/places",multerConfig.array('image'),createSavedplaces);
router.get("/places", retrieveSavedplaces)
router.post("/places/:id",multerConfig.array('image'), updateSavedplacesBySavedplacesId)
router.delete("/places/:id", deleteSavedplacesBySavedplacesId)

module.exports = router;