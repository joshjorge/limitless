const express = require('express');
const router = express.Router();
const { Vehicle } = require('../models/vehicles');

router.get('/:id', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    let otherItem = await Vehicle.find({
      vehicleMake: vehicle.vehicleMake,
      transmission: vehicle.transmission,
    }).limit(13);
    res.render('itemdetails', { vehicle, otherItem });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
