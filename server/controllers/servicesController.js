const Services = require('../models/servicesModel');
const verifyAndDecodeIdFromJWT = require("../middleware/decodeToken");
const servicesSchema = require("../models/servicesValidationSchema");
const updateServicesSchema = require("../models/updateServicesSchema");
                                                               
require("dotenv").config();


exports.createServices = async (req, res) => {
    const { error } = servicesSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request: " + error.details[0].message,
            dataFound: false,
            status: false,
        });
    }

    if(!req.file) {
        res.status(400).json({
        message:'icon is required',
            dataFound: false,
            status: false,

        });
    }    

    

    const {
        entity } = req.body;
    const icon = req.file.filename;


    try {
        const newServices = new Services({
            entity,icon,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        await newServices.save();

        res.status(201).json({
            message: 'Services created successfully',
            dataFound: true,
            status: true,
        });
    } catch (error) {
        console.error('Error creating services:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};

exports.retrieveServices = async (req, res) => {
    
    try {

        const services = await Services.find();


        if (!services || services.length === 0) {
            return res.status(200).json({
                message: 'No services found for the user',
                dataFound: false,
                status: true,
                data: [],
            });
        }


        const formattedServices = services.map(services => ({
            _id: services._id,
            entity: services.entity,
            icon: `${process.env.domain}/uploads/services/${services.icon}`
        }));


        res.status(200).json({
            message: 'Services retrieved successfully',
            dataFound: true,
            status: true,
            data: formattedServices,
        });
    } catch (error) {
        console.error('Error retrieving services:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};


exports.updateServicesByServicesId = async (req, res) => {

    const { error } = updateServicesSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Bad request: " + error.details[0].message,
            dataFound: false,
            status: false,
        });
    }

    

    const servicesId = req.params.id;

    try {

        let existingServices = await Services.findOne({_id: servicesId });

        if (!existingServices) {
            return res.status(404).json({
                message: 'Services not found',
                dataFound: false,
                status: false,
            });
        }


        //const icon = req.file.filename
        

      
    const updateData = { ...req.body };

    

    if (req.file) {
      updateData.icon = req.file.filename;
    }

    const updatedServices = await Services.findByIdAndUpdate(servicesId, updateData, {
      new: true,
      runValidators: true,
    });



        res.status(200).json({
            message: 'Services updated successfully',
            dataFound: true,
            status: true,
            data: updatedServices,
        });
    } catch (error) {
        console.error('Error updating services:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};

exports.deleteServicesByServicesId = async (req, res) => {
    
    const servicesId = req.params.id;

    try {

        const existingServices = await Services.findOne({_id: servicesId });

        if (!existingServices) {
            return res.status(404).json({
                message: 'Services not found',
                dataFound: false,
                status: false,
            });
        }

        await Services.findOneAndDelete({_id: servicesId });

        res.status(200).json({
            message: 'Services deleted successfully',
            dataFound: true,
            status: true,
        });
    } catch (error) {
        console.error('Error deleting Services:', error);
        res.status(500).json({
            message: 'Internal server error',
            dataFound: false,
            status: false,
        });
    }
};


