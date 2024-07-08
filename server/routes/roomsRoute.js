const express = require("express");

const {
    createRooms,
    retrieveRooms,
    updateRoomsByRoomsId,
    deleteRoomsByRoomsId,

} = require('../controllers/roomsController');
const { authenticateToken } = require("../middleware/authenticateToken");

const  multerConfig =  require('../middleware/multer');

const router = express.Router();

router.post("",multerConfig.array('image'),createRooms);
router.get("", retrieveRooms)
router.post("/:id",multerConfig.array('image'), updateRoomsByRoomsId)
router.delete("/:id", deleteRoomsByRoomsId)

module.exports = router;