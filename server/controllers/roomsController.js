const Places = require('../models/placesModel');
const verifyAndDecodeIdFromJWT = require("../middleware/decodeToken");
const placesSchema = require("../models/placesValidationSchema");
const updatePlacesSchema = require("../models/updatePlacesSchema");
                                                               
require("dotenv").config();


exports.createPlaces = async (req, res) => {
    const { error } = placesSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            message: "Bad request: " + error.details[0].message,
            dataFound: false,
            status: false,
        });
    }

    // if(!req.file) {
    //     res.status(400).json({
    //     message:'image is required',
    //         dataFound: false,
    //         status: false,
    //     });
    // }
    

    const {
        placename,location,state,rate,about,facilities} = req.body;
        const parsedFacilities = JSON.parse(facilities);
    
        console.log(parsedFacilities);
    const image = req.files.map(file => file.filename)


    try {
        const newPlaces = new Places({
            placename,location,state,rate,about,facilities:parsedFacilities,image,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        await newPlaces.save();

        res.status(201).json({
            message: 'Places created successfully',
            dataFound: true,
            status: true,
        });
    } catch (error) {
        console.error('Error creating places:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};

exports.retrievePlaces = async (req, res) => {
    
    try {

        const places = await Places.find();


        if (!places || places.length === 0) {
            return res.status(200).json({
                message: 'No places found for the user',
                dataFound: false,
                status: true,
                data: [],
            });
        }


        const formattedPlaces = places.map(places => ({
            _id: places._id,
            placename: places.placename,
            location: places.location,
            state: places.state,
            rate: places.rate,
            about: places.about,
            facilities: places.facilities,
            image: `${process.env.domain}/uploads/places/${places.image}`
        }));


        res.status(200).json({
            message: 'places retrieved successfully',
            dataFound: true,
            status: true,
            data: formattedPlaces,
        });
    } catch (error) {
        console.error('Error retrieving places:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};


exports.updatePlacesByPlacesId = async (req, res) => {

    const { error } = updatePlacesSchema.validate(req.body);
    // if (error) {
    //     return res.status(400).json({
    //         message: "Bad request: " + error.details[0].message,
    //         dataFound: false,
    //         status: false,
    //     });
    // }

    

    const placesId = req.params.id;

    try {

        let existingPlaces = await Places.findOne({_id: placesId });

        if (!existingPlaces) {
            return res.status(404).json({
                message: 'Places not found',
                dataFound: false,
                status: false,
            });
        }


        //const icon = req.file.filename
        

      
    const updateData = { ...req.body };

    

    if (req.file) {
      updateData.icon = req.file.filename;
    }

    const updatedPlaces = await Places.findByIdAndUpdate(placesId, updateData, {
      new: true,
      runValidators: true,
    });



        res.status(200).json({
            message: 'Places updated successfully',
            dataFound: true,
            status: true,
            data: updatedPlaces,
        });
    } catch (error) {
        console.error('Error updating places:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};

exports.deletePlacesByPlacesId = async (req, res) => {
    
    const placesId = req.params.id;

    try {

        const existingPlaces = await Places.findOne({_id: placesId });

        if (!existingPlaces) {
            return res.status(404).json({
                message: 'Places not found',
                dataFound: false,
                status: false,
            });
        }

        await Places.findOneAndDelete({_id: placesId });

        res.status(200).json({
            message: 'Places deleted successfully',
            dataFound: true,
            status: true,
        });
    } catch (error) {
        console.error('Error deleting Places:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};

