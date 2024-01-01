const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Vehicle } = require('../models/vehicles');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const { saveImage } = require('../utile/functions');

router.get('/:id', [auth, admin], async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  res.render('adminItemDetailsAndUpdate', {
    vehicle,
  });
});

router.put('/:id', [auth, admin], async (req, res) => {
  let vehicle;
  try {
    vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        vehicleModele: req.body.vehicleModele,
        vehicleMake: req.body.vehicleMake,
        vehicleBagage: req.body.vehicleBagage,
        vehicleDoor: req.body.vehicleDoor,
        transmission: req.body.transmission,
        vehicleSeat: req.body.vehicleSeat,
        vehicleColor: req.body.vehicleColor,
        fuelType: req.body.fuelType,
        description: req.body.description,
      },
      { new: true }
    );
    if (!vehicle) return res.status(404);
    saveImage(vehicle, req.body.image);

    await vehicle.save();

    res.redirect('updateItem');
  } catch (error) {
    if (error) res.locals.error;
    console.error(error.message);
    res.render('adminItemDetailsAndUpdate', 400);
  }
});

module.exports = router;
