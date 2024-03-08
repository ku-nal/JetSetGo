const {StatusCodes} =  require('http-status-codes');
const {SuccessResponse, ErrorResponse} = require('../utils/common');
const {AirportService} = require('../services');

/**
 * post /airports: Create a new Airport.
 * body:{
 * name: "Shivaji Airport",
 * code: "Shiv",
 * address: null,
 * cityId : 2
 * }
 * @param {*} req 
 * @param {*} res 
 */
async function createAirport(req,res){
    try{
        const response = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId
        });
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirports(req,res){
    try{
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirport(req,res){
    try{
        console.log('In getAIrport');
        const airport = await AirportService.getAirportById(req.params.id);
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function deleteAirport(req,res){
    try{
        const response = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}




module.exports = {
    createAirport,
    getAirport,
    getAirports,
    deleteAirport
}
