const express = require('express');
const router = express.Router();
const staffCtrl = require('../controllers/staff.controller');

router.post('/', staffCtrl.createStaff);
router.get('/', staffCtrl.getAllStaff);
router.get('/:id', staffCtrl.getStaffbyId);
router.put('/:id', staffCtrl.updateStaff);
router.delete('/:id', staffCtrl.deleteStaff);
router.post('/login', staffCtrl.loginStaff);

module.exports = router;
