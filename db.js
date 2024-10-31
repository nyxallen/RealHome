const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://niksallen2004:<niks2004>@realhome.hrhp6.mongodb.net/?retryWrites=true&w=majority&appName=RealHome', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected successfully");
}).catch((error) => {
  console.error("MongoDB connection error:", error);
});
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
  title: String,
  price: Number,
  location: String,
  description: String,
  // Add more fields as necessary
});

const Property = mongoose.model("Property", PropertySchema);
app.get('/properties', async (req, res) => {
    const properties = await Property.find();
    res.json(properties);
  });
  
  app.post('/properties', async (req, res) => {
    const newProperty = new Property(req.body);
    await newProperty.save();
    res.json(newProperty);
  });
  
