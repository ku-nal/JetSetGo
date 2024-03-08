const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const {FlightRepository} = require('../repositories');


const flightRepository = new FlightRepository();

async function createFlight(data){
    try{
        const response = await flightRepository.create(data);
        return response;
    }catch(error){
        throw new AppError("Error occured during the creation of flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight
}