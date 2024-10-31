const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now }
});

module.exports = Property;
module.exports = mongoose.model('Property', propertySchema);

const express = require('express');
const router = express.Router();
const Property = require('./models/property'); 
router.post('/add', async (req, res) => {
    try {
        // Create a new property document from the request body
        const newProperty = new Property({
            title: req.body.title,
            location: req.body.location,
            price: req.body.price,
            description: req.body.description,
            images: req.body.images, 
        });

        // Save the property to the database
        await newProperty.save();
        res.status(201).json({ message: 'Property added successfully!' });
    } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).json({ error: 'Failed to add property' });
    }
});

module.exports = router;
// GET route to fetch property listings
router.get('/api/properties', async (req, res) => {
    try {
        const properties = await Property.find(); // Fetch all properties from the database
        res.json(properties); // Return the properties as JSON
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
