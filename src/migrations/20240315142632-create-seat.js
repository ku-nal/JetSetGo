'use strict';
/** @type {import('sequelize-cli').Migration} */
const { Enums } = require('../utils/common/');
const { BUSINESS, PREMIUM_ECONOMY, ECONOMY, FIRST_CLASS } = Enums.SEAT_TYPE;

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Airplanes',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      col: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: [BUSINESS, PREMIUM_ECONOMY, ECONOMY, FIRST_CLASS],
        defaultValue: ECONOMY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('seats');
  }
};