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
        let sortFilter = {}; 
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

// async function getAllFlights(query) {
//     let customFilter = {};
//     let sortFilter = [];
//     const endingTripTime = " 23:59:00";
//     // trips=MUM-DEL
//     if(query.trips) {

//        [departureAirportId, arrivalAirportId] = query.trips.split("-"); 
//        customFilter.departureAirportId = departureAirportId;
//        customFilter.arrivalAirportId = arrivalAirportId;
//        // TODO: add a check that they are not same
//     }
//     if(query.price) {
//         [minPrice, maxPrice] = query.price.split("-");
//         customFilter.price = {
//             [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000: maxPrice)]
//         }
//     }
//     if(query.travellers) {
//         customFilter.totalSeats = {
//             [Op.gte]: query.travellers
//         }
//     }
//     if(query.tripDate) {
//         customFilter.departureTime = {
//             [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
//         }
//     }
//     if(query.sort) {
//         const params = query.sort.split(',');
//         const sortFilters = params.map((param) => param.split('_'));
//         sortFilter = sortFilters
//     }
//     console.log(customFilter, sortFilter);
//     try {
//         const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
//         return flights;
//     } catch(error) {
//         console.log(error); 
//         throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
//     }
// }

module.exports = {
    createFlight,
    getAllFlights
}