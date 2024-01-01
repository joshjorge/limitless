const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  vehicleMake: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    lowercase: true,
  },
  vehicleModele: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 100,
    lowercase: true,
  },
  vehicleBagage: {
    type: String,
    required: true,
  },
  vehicleDoor: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  vehicleSeat: {
    type: String,
    required: true,
  },
  vehicleColor: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
    minlength: 3,
  },
  image: {
    type: Buffer,
    required: true,
  },
  imageType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 50000,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  dailyPrice: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 6,
  },
});

vehicleSchema.virtual('imagePath').get(function () {
  if (this.image != null && this.imageType != null) {
    return `data:${this.imageType};chartset=utf-8;base64,${this.image.toString(
      'base64'
    )}`;
  }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

exports.publishSchema = vehicleSchema;
exports.Vehicle = Vehicle;
