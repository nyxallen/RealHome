const propertyContainer = document.getElementById('property-container');
const mapContainer = document.getElementById('map-container');

function fetchProperties() {
  // Fetch property data from the backend API
  fetch('/api/properties')  
    .then(res => res.json())
    .then(properties => {
      properties.forEach(property => {
        const propertyDiv = document.createElement('div');
        propertyDiv.innerHTML = `
          <h3>${property.title}</h3>
          <p>Location: ${property.location}</p>
          <p>Price: ${property.price}</p>
        `;
        propertyContainer.appendChild(propertyDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching properties:', error);
    });
}

function initMap() {
  const map = new google.maps.Map(mapContainer, {
    zoom: 10,
    center: { lat: 34.0522, lng: -118.2437 } // Los Angeles coordinates
  });

  new google.maps.Marker({
    position: { lat: 34.0522, lng: -118.2437 },
    map: map,
    title: "Luxury Villa"
  });
}

// Fetch properties when the page loads
fetchProperties();
document.getElementById('property-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from reloading the page

  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;

  // Send the form data to the backend via a POST request
  fetch('/api/properties', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      location: location,
      price: price
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log('Property added successfully:', data);
      alert('Property added successfully!');
      // Clear form inputs
      document.getElementById('property-form').reset();
      fetchProperties(); // Refresh the list of properties
    })
    .catch(error => {
      console.error('Error adding property:', error);
    });
});
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();

require('./passportConfig')(passport);
mongoose.connect('mongodb://localhost:27017/realhome', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'yourSecret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local', { successRedirect: '/dashboard', failureRedirect: '/login' }));
app.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await new User({ username: req.body.username, password: hashedPassword }).save();
    res.redirect('/login');
});
app.post('/register', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = new User({ username: req.body.username, password: hashedPassword });
  await newUser.save();
  res.redirect('/login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}

app.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send('Welcome to the dashboard!');
});
