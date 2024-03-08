const express = require('express');

const airplaneRouter = require('./airplane-routes');

const cityRouter = require('./city-routes');

const airportRouter = require('./airport-routes');

const flightRouter = require('./flight-routes');

const router = express.Router();

router.use('/airplanes', airplaneRouter);

router.use('/cities', cityRouter);

router.use('/airports', airportRouter);

router.use('/flights', flightRouter);


module.exports = router;