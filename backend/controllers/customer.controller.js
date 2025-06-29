const customer = require('../models/customer');

// Get all customers
exports.getallcustomer = async (req, res) => {
  try {
    const customerlist = await customer.find();
    res.json(customerlist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a customer
exports.createCustomer = async (req, res) => {
  try {
    if (req.body.email && await customer.findOne({ email: req.body.email })) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const Customer = await customer.create(req.body);
    res.status(201).json(Customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a customer by ID
exports.getCustomerbyId = async (req, res) => {
  try {
    const Customer = await customer.findById(req.params.id);
    res.json(Customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCustomer = async (req,res)=>
{
  try {
    const Customer = await customer.findByIdAndDelete(req.params.id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
    
  }
}


// Update a customer
exports.updateCustomer = async (req,res)=>
{
  try {
    const Customer = await customer.findByIdAndUpdate(req.params.id, req.body,{new:true});
    res.json(Customer);
  } catch (error) {
    
    res.status(400).json({error:error.message});
  }
}

