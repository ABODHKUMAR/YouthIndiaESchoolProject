const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const calendarRoutes = require('./routes/calender');

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use('/rest/v1/calendar', calendarRoutes);

// Start the server
const port = 3000; // Change to your desired port number
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
