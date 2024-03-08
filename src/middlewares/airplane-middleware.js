const {StatusCodes} = require("http-status-codes");
const AppError = require("../utils/errors/app-error")
const {ErrorResponse} = require("../utils/common");

function validateCreateRequest(req, res, next){
    console.log("Middleware");
    if(!req.body.modelNumber){
        console.log("Inside mid");
        ErrorResponse.message = "Something went wrong while creating Airplane";
        ErrorResponse.error = new AppError("Airplane model number not found in the incoming request in the correct form", StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateCreateRequest
}