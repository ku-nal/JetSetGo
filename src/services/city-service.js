const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const city = require("../models/city");

const cityRepository = new CityRepository();

async function createCity(data) {
  try {
    const response = await cityRepository.create(data);
    return response;
  } catch (error) {
    throw new AppError("Error creating city", StatusCodes.BAD_REQUEST);
  }
}

async function getCities() {
  try {
    const response = await cityRepository.getAll();
    return response;
  } catch (error) {
    throw new AppError("Error getting cities", StatusCodes.BAD_REQUEST);
  }
}

async function deleteCity(id) {
  try {
    const response = await cityRepository.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode != StatusCodes.NOT_FOUND) {
      throw new AppError(
        "Cannot fetch data of all the cities",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    } else {
      throw error;
    }
  }
}

async function getCityByID(id){
    try{
        const city = await cityRepository.findByPk(id);
        return city;
    }
    catch(error){
        console.log("In service")
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("City with "+ id + " is not present",StatusCodes.NOT_FOUND);
        }else{
            throw new AppError("Error Occurred while fetching city with id "+ id, StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

module.exports = {
  createCity,
  getCities,
  deleteCity,
  getCityByID,
};
