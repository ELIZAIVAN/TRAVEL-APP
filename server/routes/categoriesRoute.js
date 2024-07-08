const express = require("express");
//const categoriesController = require('../controllers/categoriesController');
const {
    createCategories,
    retrieveCategories,
    updateCategoriesByCategoriesId,
    deleteCategoriesByCategoriesId,

} = require('../controllers/categoriesController');
const { authenticateToken } = require("../middleware/authenticateToken");

const  multerConfig =  require('../middleware/multer');

const router = express.Router();

router.post("/categories",multerConfig.single('icon'),createCategories);
router.get("/categories", retrieveCategories)
router.post("/categories/:id",multerConfig.single('icon'), updateCategoriesByCategoriesId)
router.delete("/categories/:id", deleteCategoriesByCategoriesId)

module.exports = router;