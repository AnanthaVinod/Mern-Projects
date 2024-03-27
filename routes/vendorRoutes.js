
const vendorController = require('../controllers/venderControllers');
const express = require('express');

const router = express.Router();
router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin)

router.get('/all-vendors', vendorController.getAllVendor)
router.get('/single-vendor/:apple', vendorController.getVendorById)
module.exports = router;
