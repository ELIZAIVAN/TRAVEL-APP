const Categories = require('../models/categoriesModel');
const verifyAndDecodeIdFromJWT = require("../middleware/decodeToken");
const categoriesSchema = require("../models/categoriesValidationSchema");
const updateCategoriesSchema = require("../models/updateCategoriesSchema");
                                                               
require("dotenv").config();


exports.createCategories = async (req, res) => {
    const { error } = categoriesSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            message: "Bad request: " + error.details[0].message,
            dataFound: false,
            status: false,
        });
    }

    // if(!req.file) {
    //     res.status(400).json({
    //     message:'icon is required',
    //         dataFound: false,
    //         status: false,

    //     });
    // }
    

    const {
        entity } = req.body;
    const icon = req.file.filename;


    try {
        const newCategories = new Categories({
            entity,icon,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        await newCategories.save();

        res.status(201).json({
            message: 'Categories created successfully',
            dataFound: true,
            status: true,
        });
    } catch (error) {
        console.error('Error creating categories:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};

exports.retrieveCategories = async (req, res) => {
    
    try {

        const categories = await Categories.find();


        if (!categories || categories.length === 0) {
            return res.status(200).json({
                message: 'No categories found for the user',
                dataFound: false,
                status: true,
                data: [],
            });
        }


        const formattedCategories = categories.map(categories => ({
            _id: categories._id,
            entity: categories.entity,
            icon: `${process.env.domain}/uploads/categories/${categories.icon}`
        }));


        res.status(200).json({
            message: 'categories retrieved successfully',
            dataFound: true,
            status: true,
            data: formattedCategories,
        });
    } catch (error) {
        console.error('Error retrieving categorieses:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};


exports.updateCategoriesByCategoriesId = async (req, res) => {

    const { error } = updateCategoriesSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request: " + error.details[0].message,
            dataFound: false,
            status: false,
        });
    }

    

    const categoriesId = req.params.id;

    try {

        let existingCategories = await Categories.findOne({_id: categoriesId });

        if (!existingCategories) {
            return res.status(404).json({
                message: 'Categories not found',
                dataFound: false,
                status: false,
            });
        }


        //const icon = req.file.filename
        

      
    const updateData = { ...req.body };

    

    if (req.file) {
      updateData.icon = req.file.filename;
    }

    const updatedCategories = await Categories.findByIdAndUpdate(categoriesId, updateData, {
      new: true,
      runValidators: true,
    });



        res.status(200).json({
            message: 'Categories updated successfully',
            dataFound: true,
            status: true,
            data: updatedCategories,
        });
    } catch (error) {
        console.error('Error updating categories:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};

exports.deleteCategoriesByCategoriesId = async (req, res) => {
    
    const categoriesId = req.params.id;

    try {

        const existingCategories = await Categories.findOne({_id: categoriesId });

        if (!existingCategories) {
            return res.status(404).json({
                message: 'Categories not found',
                dataFound: false,
                status: false,
            });
        }

        await Categories.findOneAndDelete({_id: categoriesId });

        res.status(200).json({
            message: 'Categories deleted successfully',
            dataFound: true,
            status: true,
        });
    } catch (error) {
        console.error('Error deleting Categories:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};


