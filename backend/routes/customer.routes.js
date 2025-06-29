const express =require('express');
const router = express.Router();
const customerCtrl = require('../controllers/customer.controller');

router.get('/',customerCtrl.getallcustomer);
router.get('/:id',customerCtrl.getCustomerbyId);
router.post('/',customerCtrl.createCustomer);
router.put('/:id',customerCtrl.updateCustomer);
router.delete('/:id',customerCtrl.deleteCustomer)

module.exports = router;