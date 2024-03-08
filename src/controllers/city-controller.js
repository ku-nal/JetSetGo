const { StatusCodes } = require('http-status-codes');
const {CityService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createCity(req, res){
    try{
        const response = await CityService.createCity({
            name: req.body.name
        });

        SuccessResponse.data = response;

        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCodes).json(ErrorResponse);
    }
}

async function getCities(req, res){
    try{
        const response = await CityService.getCities();
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCodes).json(ErrorResponse);
    }
}

async function deleteCity(req,res){
    try{
        const response = await CityService.deleteCity(req.params.id);
        SuccessResponse.message = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getCity(req,res){
    try{
        const city = await CityService.getCityByID(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createCity,
    getCities,
    deleteCity,
    getCity
}