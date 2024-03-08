const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try{
    console.log("Creating Airplane in service");
    const airplane = await airplaneRepository.create(data);
    return airplane;
    }
    catch(error){
        console.log(error);
    }
}

async function getAirplanes(){
    try{
        console.log("Getting AIrplane inside the service layer");
        const airplanes = await airplaneRepository.getAll();
        console.log("In service ", airplanes);
        return airplanes;
    }
    catch(error){
        throw error;
    }
}

async function getAirplane(id){
    try{
        const airplane = await airplaneRepository.findByPk(id);
        console.log("In Airplane", airplane);
        return airplane;
    }
    catch(error){
        throw error("Error retreiving Airplane by finding airplane by id");
    }
}

async function deleteAirplane(id){
    try{
        const response = await airplaneRepository.destroy(id);
        if(!response){
            throw("Airplane doesn't exist with id ", id);
        }
        return response;
    }
    catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airplane you requested to delete is not present", error.statusCode);
        }
        throw("Error deleting the airplane with id ", id);
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    deleteAirplane
}