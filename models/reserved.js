const mongoose = require("mongoose");
const { Vehicle } = require("./vehicles");

const reservedSchema = new mongoose.Schema({
    leaser: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    vehicleLeased: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Vehicle',
        required: true
    },
    leasingDate: {
        type: Date,
    },
    lastDay: {
        type: Date,
        required: true
    },

    isQualified: {
        type: Boolean,
        default: true
    },
    isInWarehouse: {
        type: Boolean
    },
    totalDaysToPay: {
        type: Number,
        default: 0
    }
})



// let difference = await this.leasingDate.getTime() - this.lastDay.getTime();
// let totalDays = Math.ceil(difference / (1000 * 3600 * 24));

// if (totalDays == 0 && isInWarehouse == false) this.isQualified = false

// if (totalDays == 0 && this.isQualified == false) {
//     let otherDays = new Date();
//     let daysToPay = await this.lastDay.getTime() - otherDays.getTime();
//     this.totalDaysToPay = Math.ceil(daysToPay / (1000 * 3600 * 24));

const Reserved = mongoose.model('Reserved', reservedSchema);

module.Reserved = Reserved;
module.reservedSchema = reservedSchema;