const express = require('express');
const router = express.Router();
const { filterData } = require('../utile/functions');
const { Vehicle } = require('../models/vehicles');

router.get('/', async (req, res) => {
  const vehicles = await Vehicle.find({}).select(['-createAt', '-description']);

  let getData = [...vehicles];
  let input = req.query.search;
  let filtered = input
    ? [
        ...getData.filter(
          elem =>
            elem['vehicleModele'].includes(input) ||
            elem['vehicleMake'].includes(input)
        ),
      ]
    : getData;
  res.render('home', { vehicles, filtered, input });
});

module.exports = router;
