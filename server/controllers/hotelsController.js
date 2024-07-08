const Hotels = require('../models/hotelsModel');
const verifyAndDecodeIdFromJWT = require("../middleware/decodeToken");
const hotelsSchema = require("../models/hotelsValidationSchema");
const updateHotelsSchema = require("../models/updateHotelsSchema");
                                                               
require("dotenv").config();


exports.createHotels = async (req, res) => {
    const { error } = hotelsSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            message: "Bad request: " + error.details[0].message,
            dataFound: false,
            status: false,
        });
    }

    if(!req.file) {
        res.status(400).json({
        message:'image is required',
            dataFound: false,
            status: false,

        });
    }
    

    const {
        hotelname,location,state,rate,review,overallrating,about,facilities } = req.body;

    const image = req.files.map(file => file.filename)


    try {
        const newHotels = new Hotels({
            hotelname,location,state,rate,review,overallrating,about,facilities,image,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        await newHotels.save();

        res.status(201).json({
            message: 'Hotels created successfully',
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

exports.retrieveHotels = async (req, res) => {
    
    try {

        const hotels = await Hotels.find();


        if (!places || hotels.length === 0) {
            return res.status(200).json({
                message: 'No hotels found for the user',
                dataFound: false,
                status: true,
                data: [],
            });
        }


        const formattedHotels = hotels.map(hotels => ({
            _id: hotels._id,
            hotelname: hotels.hotelname,
            location: hotels.location,
            state: hotels.state,
            rate: hotels.rate,
            review: hotels.review,
            overallrating: hotels.overallrating,
            about: hotels.about,
            facilities: hotels.facilities,
            image: hotels.image
        }));


        res.status(200).json({
            message: 'Hotels retrieved successfully',
            dataFound: true,
            status: true,
            data: formattedHotels,
        });
    } catch (error) {
        console.error('Error retrieving hotels:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};


exports.updateHotelsByHotelsId = async (req, res) => {

    const { error } = updateHotelsSchema.validate(req.body);
    // if (error) {
    //     return res.status(400).json({
    //         message: "Bad request: " + error.details[0].message,
    //         dataFound: false,
    //         status: false,
    //     });
    // }

    

    const hotelsId = req.params.id;

    try {

        let existingHotels = await Hotels.findOne({_id: hotelsId });

        if (!existingHotels) {
            return res.status(404).json({
                message: 'Hotels not found',
                dataFound: false,
                status: false,
            });
        }


        //const icon = req.file.filename
        

      
    const updateData = { ...req.body };

    

    if (req.file) {
      updateData.icon = req.file.filename;
    }

    const updatedHotels = await Hotels.findByIdAndUpdate(hotelsId, updateData, {
      new: true,
      runValidators: true,
    });



        res.status(200).json({
            message: 'Hotels updated successfully',
            dataFound: true,
            status: true,
            data: updatedHotels,
        });
    } catch (error) {
        console.error('Error updating hotels:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};

exports.deleteHotelsByHotelsId = async (req, res) => {
    
    const hotelsId = req.params.id;

    try {

        const existingHotels = await Hotels.findOne({_id: hotelsId });

        if (!existingHotels) {
            return res.status(404).json({
                message: 'Hotels not found',
                dataFound: false,
                status: false,
            });
        }

        await Hotels.findOneAndDelete({_id: hotelsId });

        res.status(200).json({
            message: 'Hotels deleted successfully',
            dataFound: true,
            status: true,
        });
    } catch (error) {
        console.error('Error deleting Hotels:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};


