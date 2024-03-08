const AppError = require('../utils/errors/app-error');
const {AirportRepository} = require('../repositories');
const {StatusCodes} = require('http-status-codes');

const airportRepository = new AirportRepository();

async function getAirports(){
    try{
        const airports = await airportRepository.getAll();
        return airports;
    }catch(error){
        throw new AppError("Error occured while fetching all the airports", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirportById(id){
    try{
        const airports = await airportRepository.findByPk(id);
        return airports;
    }catch(error){
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airplane with id "+ id + " is not present", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Error occured while fetching all the airports", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function createAirport(data){
    try{
        console.log("Service", data);
        const response = await airportRepository.create(data);
        return response;
    }catch(error){
        throw new AppError("Error occured while creating the airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try{
        const response = await airportRepository.destroy(id);
        return response;
    }catch(error){
        console.log(error);
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airplane with id "+ id + " is not present", StatusCodes.NOT_FOUND);
        }
        throw new AppError("Error occured while fetching all the airports", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getAirports,
    getAirportById,
    createAirport,
    destroyAirport
}
