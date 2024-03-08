const { all } = require('../routes');
const {AirplaneService} = require('../services');
const {StatusCodes} = require('http-status-codes');
const {ErrorResponse, SuccessResponse} = require('../utils/common');

/**
 * POST: /airplanes
 * @param {*} req 
 * @param {*} res 
 */
async function createAirplane(req, res){
    try{
        console.log("In contoller");
        console.log(req.body, req.body.modelNumber,req.body.capacity );
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Successfully create an airplane",
            data: airplane,
            error: {}
        });
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
            {
                success: false,
                message: "Something went wrong"
            }
        );
    }
}

async function getAirplanes(req,res){
    try{
        const allAirplane = await AirplaneService.getAirplanes();
        console.log(allAirplane);
        return res.status(StatusCodes.OK).json(allAirplane);

    }catch(error){
        console.log("Error retreiving all airplanes", error);
    }
}

async function getAirplane(req,res){
    try{
        const oneAirplane = await AirplaneService.getAirplane(req.params.id);
        console.log("Data ", oneAirplane);
        return res.status(StatusCodes.OK).json(oneAirplane);
    }
    catch(error){
        console.log(error);
    }
}

async function deleteAirplane(req,res){
    try{
        const response = await AirplaneService.deleteAirplane(req.params.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }
    catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
        console.log(error);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane
}