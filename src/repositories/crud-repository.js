const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      console.log("Repo ", this.model);
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error("Something went wrong in CRUD repo: create");
    }
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data,
      },
    });

    if(!response){
      console.log("IN DESTROY ERROR");
      throw new AppError("Not able to found the resource", StatusCodes.NOT_FOUND);
    }
    console.log(response);
    return response;
  }

  async getAll() {
    try {
      const response = this.model.findAll();
      return response;
    } catch (error) {
      Logger.error("Something went wrong in CRUD repo: findAll");
    }
  }

  async findByPk(data) {
    try {
      const response = await this.model.findByPk(data);
      if(!response){
        throw new AppError("Resource not found", StatusCodes.NOT_FOUND)
      }
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      const response = await this.model.update(data, {
        where: {
          id: id,
        },
      });
    } catch (error) {
      Logger.error("Something went wrong in CRUD repo: update ");
    }
  }
}

module.exports = CrudRepository;
