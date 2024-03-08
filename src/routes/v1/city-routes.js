const express = require('express');
const {CityController} = require('../../controllers');

const router = express.Router();

router.post('/', CityController.createCity);

router.get('/',CityController.getCities);

router.delete('/:id', CityController.deleteCity);

router.get('/:id',CityController.getCity);

module.exports = router;    