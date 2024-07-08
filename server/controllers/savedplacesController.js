const Savedplaces = require('../models/savedplacesModel');
const verifyAndDecodeIdFromJWT = require("../middleware/decodeToken");
const savedplacesSchema = require("../models/savedplacesValidationSchema");
const updateSavedplacesSchema = require("../models/updateSavedplacesSchema");
const Places = require("../models/placesModel");
                                                               
require("dotenv").config();


exports.createSavedplaces = async (req, res) => {
    const { error } = savedplacesSchema.validate(req.body);
    
    // if (error) {
    //     return res.status(400).json({
    //         message: "Bad request: " + error.details[0].message,
    //         dataFound: false,
    //         status: false,
    //     });
    // }

    // if(!req.file) {
    //     res.status(400).json({
    //     message:'image is required',
    //         dataFound: false,
    //         status: false,

    //     });
    // }
    

    const {
        user_id,place_id } = req.body;

    //const image = req.files.map(file => file.filename)


    try {
        const newSavedplaces = new Savedplaces({
            user_id,place_id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        await newSavedplaces.save();

        res.status(201).json({
            message: 'Savedplaces created successfully',
            dataFound: true,
            status: true,
        });
    } catch (error) {
        console.error('Error creating Savedplaces:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};

exports.retrieveSavedplaces = async (req, res) => {
    
    try {

        const saved = await Saved.find();


        if (!saved || saved.length === 0) {
            return res.status(200).json({
                message: 'No savedplaces found for the user',
                dataFound: false,
                status: true,
                data: [],
            });
        }

        // Retrieve images for each saved place
        const formattedSavedplaces = await Promise.all(Savedplaces.map(async (Savedplaces) => {
            const place = await Places.findById(Savedplace.place_id, 'image');

            return {
                _id: Savedplace._id,
                user_id: Savedplaces.user_id, // Assuming you have a user_id field in Saved
                place_id: Savedplaces.place_id,
                images: place ? place.image : [], // Return images if place is found, otherwise an empty array
            };
        }));


        // const formattedSavedplaces = savedplaces.map(savedplaces => ({
        //     _id: saved._id,
        //     user_id: savedplaces.placename,
        //     place_id: savedplaces.placename,
        
        // }));


        res.status(200).json({
            message: 'savedplaces retrieved successfully',
            dataFound: true,
            status: true,
            data: formattedSavedplaces,
        });
    } catch (error) {
        console.error('Error retrieving savedplaces:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};


exports.updateSavedplacesBySavedplacesId = async (req, res) => {

    const { error } = updateSavedplacesSchema.validate(req.body);
    // if (error) {
    //     return res.status(400).json({
    //         message: "Bad request: " + error.details[0].message,
    //         dataFound: false,
    //         status: false,
    //     });
    // }

    

    const savedplacesId = req.params.id;

    try {

        let existingSavedplaces = await Savedplaces.findOne({_id: savedplacesId });

        if (!existingSavedplaces) {
            return res.status(404).json({
                message: 'savedplaces not found',
                dataFound: false,
                status: false,
            });
        }


        //const icon = req.file.filename
        

      
    const updateData = { ...req.body };

    

    if (req.file) {
      updateData.icon = req.file.filename;
    }

    const updatedSavedplaces = await Savedplaces.findByIdAndUpdate(savedplacesId, updateData, {
      new: true,
      runValidators: true,
    });



        res.status(200).json({
            message: 'savedplaces updated successfully',
            dataFound: true,
            status: true,
            data: updatedSaved,
        });
    } catch (error) {
        console.error('Error updating savedplaces:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};

exports.deleteSavedplacesBySavedplacesId = async (req, res) => {
    
    const savedplacesId = req.params.id;

    try {

        const existingSavedplaces = await Savedplaces.findOne({_id: savedplacesId });

        if (!existingSavedplaces) {
            return res.status(404).json({
                message: 'savedplaces not found',
                dataFound: false,
                status: false,
            });
        }

        await Savedplaces.findOneAndDelete({_id: savedplacesId });

        res.status(200).json({
            message: 'savedplaces deleted successfully',
            dataFound: true,
            status: true,
        });
    } catch (error) {
        console.error('Error deleting savedplaces:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};


