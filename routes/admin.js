const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Vehicle } = require('../models/vehicles');
const admin = require('../middleware/admin');
const auth = require('../middleware/admin');
const { saveImage } = require('../utile/functions');

// router.get('/', [auth, admin], async (req, res) => {
//   try {
//     res.render('admin', {
//       vehicleMake: new VehicleMake({}),
//       vehicleModele: new VehicleModele({}),
//     });
//   } catch (error) {
//     let error_message = 'Something went wrong';
//     res.render('publishItem', { error_message });
//     console.log(error);
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     let vehicleMake = new VehicleMake({
//       vehicleMake: req.body.vehicleMake,
//     });
//     let vehicleModele = new VehicleModele({
//       vehicleModele: req.body.vehicleModele,
//     });

//     let collectionData = [vehicleMake, vehicleModele];
//     collectionData.forEach(callData => {
//       callData.save();
//     });
//     res.redirect(200, 'admin');
//   } catch (error) {
//     if (error) {
//       let error_message = 'Something went wrong';
//       res.redirect(400, 'admin');
//     }
//     console.log(error);
//   }
// });

router.get('/publishitem', [auth, admin], async (req, res) => {
  res.render('publishItem', {
    vehicle: Vehicle,
  });
});

router.post('/publishItem', async (req, res) => {
  let vehicle = new Vehicle({
    vehicleModele: req.body.vehicleModele,
    vehicleMake: req.body.vehicleMake,
    vehicleBagage: req.body.vehicleBagage,
    vehicleDoor: req.body.vehicleDoor,
    transmission: req.body.transmission,
    vehicleSeat: req.body.vehicleSeat,
    vehicleColor: req.body.vehicleColor,
    fuelType: req.body.fuelType,
    dailyPrice: req.body.dailyPrice,
    description: req.body.description,
  });
  try {
    saveImage(vehicle, req.body.image);
    vehicle.save();
    res.status(200).send('Created');
  } catch (error) {
    if (error) {
      res.status(400).send('Something went wrong');
      console.log(error);
    }
  }
});

router.get('/updateItem', [auth, admin], async (req, res) => {
  const vehicles = await Vehicle.find({});
  res.render('updateItem', {
    vehicles,
  });
});

// router.put('/updateItem/:id', [auth, admin], async(req, res) => {
//     let vehicle;
//     try {
//         vehicle = await Vehicle.findById(req.params.id);
//         if (!vehicle) return res.status(404);

//         vehicle.vehicleModele = req.body.vehicleModele;
//         vehicle.vehicleMake = req.body.vehicleMake;
//         vehicle.vehicleBagage = req.body.vehicleBagage;
//         vehicle.vehicleDoor = req.body.vehicleDoor;
//         vehicle.vehicleType = req.body.vehicleType;
//         vehicle.vehicleSeat = req.body.vehicleSeat;
//         vehicle.vehicleColor = req.body.vehicleColor;
//         vehicle.description = req.body.description;
//         saveImage(vehicle, req.body.image);
//         await vehicle.save();

//         res.redirect('updateItem');
//     } catch (error) {
//         if (error) res.locals.error;
//         console.error(error.message)
//         res.render('publishItem', 400);
//     }
// });

router.delete('/updateItem/:id', [auth, admin], async (req, res) => {
  let vehicle;
  try {
    vehicle = await Vehicle.findById(req.params.id);

    await vehicle.remove();

    res.status(200).send('Item deleted');
  } catch (error) {
    if (error) res.locals.error;
    console.error(error.message);
    res.status(400).send('Something went wrong');
  }
});

module.exports = router;
