const {ErrorResponse} = require('../utils/common');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError("flightNumber is not present in incoming request in correct form", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError("airplaneId is not present in incoming request in correct form", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError("departureAirportId is not present in incoming request in correct form", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError("arrivalAirportId is not present in incoming request in correct form", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError("arrivalTime is not present in incoming request in correct form", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError("departureTime is not present in incoming request in correct form", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError("price is not present in incoming request in correct form", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}