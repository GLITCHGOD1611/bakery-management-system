const Staff = require('../models/Staff');

// Create staff
// Staff login
exports.loginStaff = async (req, res) => {
  const { email, password } = req.body;

  try {
    const staff = await Staff.findOne({ email, password });

    if (!staff) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json(staff); // ✅ You can later exclude password here if needed
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
    res.status(400).json({ error: 'bad error' });
  }
};

exports.createStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staffList = await Staff.find().select('-password');
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
};
//id ne 1 ch jan ghyaycha 
exports.getStaffbyId = async (req, res) => {
  try {
    const staffList = await Staff.findById(req.params.id).select('-password');
    res.json(staffList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
};

// Update staff
exports.updateStaff = async (req, res) => {
  const updated = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete staff
exports.deleteStaff = async (req, res) => {
  await Staff.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};
