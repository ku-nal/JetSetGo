const {AirportController} = require('../../controllers');
const  express = require("express");

const router = express.Router();

router.post('/',AirportController.createAirport);

router.get('/:id',AirportController.getAirport);

router.get('/', AirportController.getAirports);

router.delete('/:id', AirportController.deleteAirport);

module.exports = router;
