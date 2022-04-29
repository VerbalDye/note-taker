// grab all required packages
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const htmlRoutes = require('./routes/htmlRoutes');

// allows POST requests to be interpretted as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/', htmlRoutes);

// initialize server port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});