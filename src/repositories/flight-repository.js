const CrudRepository = require('./crud-repository');
const {Flight, Airplane, Airport} = require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const {Sequelize} = require('sequelize');


class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    async getAllFlights(filter, sort){
        try{
            const response = await Flight.findAll({
                where: filter,
                order: sort,
                include:[
                    {
                        model: Airplane,
                        required: true,
                        as: 'airplaneDetail'
                    },
                    {
                        model: Airport,
                        required: true,
                        as: 'departureAirport',
                        on: Sequelize.where(Sequelize.col("Flight.departureAirportId"),"=",Sequelize.col("departureAirport.code"))
                    },
                    {
                        model: Airport,
                        required: true,
                        as:'arrivalAirport',
                        on: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                    }
                ]
            });
            console.log("ajkd",response);
            return response;
        }
        catch(error){
            console.log(error);
            throw new AppError("Some issue occured while getting all flights in sql", StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    // async getAllFlights(filter, sort) {
    //     const response = await Flight.findAll({
    //         where: filter,
    //         order: sort
    //     });
    //     return response;
    // }
}

module.exports = FlightRepository;