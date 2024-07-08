const express = require('express');
const authController = require('../controllers/authController');


const{authenticateToken} = require("../middleware/authenticateToken");

const  multerConfig =  require('../middleware/multer')

const router = express.Router();

router.post('/signup',authController.signup);
router.post('/login', authController.login);
router.post("/refresh", authController.refreshToken)
router.post("/update", authenticateToken, multerConfig.single('image'), authController.updateCustomer);
router.post("/logout",authenticateToken,authController.logout)


module.exports = router;