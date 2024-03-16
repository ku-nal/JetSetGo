const AppError = require('../utils/errors/app-error');
const {StatusCodes} = require('http-status-codes');
const {FlightRepository} = require('../repositories');
const {Op} = require('sequelize');
const { ErrorResponse } = require('../utils/common');


const flightRepository = new FlightRepository();

async function createFlight(data){
    try{
        const response = await flightRepository.create(data);
        return response;
    }catch(error){
        throw new AppError("Error occured during the creation of flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

// url = trips=AMD-BLR&price=0-2100&travellers=2&sort=price-desc

async function getAllFlights(query){
    try{
        const endingTripTime = " 23:59:00";
        let customFilter = {};
        let sortFilter = []; 
        if(query.trips){
            [departureAirportId, arrivalAirportId] = query.trips.split('-');
            customFilter.departureAirportId = departureAirportId;
            customFilter.arrivalAirportId = arrivalAirportId;
        }

        if(query.price){
            [minPrice, maxPrice] = query.price.split('-');
            customFilter.price = {
                [Op.between]: [minPrice==undefined ? 0 : minPrice, maxPrice == undefined ? 20000: maxPrice]
            }
        }
        
        if(query.travellers){
            customFilter.totalSeats = {
                [Op.gte]: query.travellers
            }
        }

        if(query.tripDate){
            customFilter.departureTime={
                [Op.between]:[query.tripDate, query.tripDate+endingTripTime]
            }
        }

        if(query.sort){
            const params = query.sort.split(',');
            const sortFilters = params.map((param)=>param.split('_'));
            sortFilter = sortFilters;
        }
        console.log(customFilter, sortFilter);

        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    }
    catch(error){
        throw new AppError("Cannot fetch data of all flights", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id){
    try{
        const flight = await flightRepository.findByPk(id);
        return flight;
    }
    catch(error){
        if(error instanceof AppError){
            throw new AppError("There is no flight with flight ID: "+ id, StatusCodes.NOT_FOUND);
        }
        throw new AppError("Error occured while fetching the flight", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data){
    try{
        console.log(data);
        const response = await flightRepository.findByPk(data.flightId);
        console.log(response);
        if(!data.dec || response.totalSeats >= data.seats){
            console.log("In changing seats");
            return flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        }
        else{
            throw new AppError("Not enough seats in this flight",StatusCodes.BAD_REQUEST);
        }
    }
    catch(error){
        if(error instanceof AppError){
            return error;
        }
        return new AppError("Error occured while updating seats", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}