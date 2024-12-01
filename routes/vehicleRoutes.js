const express = require('express');
const {
    addVehicle,
    getVehicles,
    getVehicleById,
    updateVehicle,
    deleteVehicle,
} = require('../controllers/VehicleController');
const router = express.Router();

router.post('/', addVehicle);
router.get('/', getVehicles);
router.get('/:vehicleId', getVehicleById);
router.put('/:vehicleId', updateVehicle);
router.delete('/:vehicleId', deleteVehicle);

module.exports = router;
