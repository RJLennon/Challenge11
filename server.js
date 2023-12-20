const express = require('express');
const apiRoutes = require("./routes/api_routes");
const htmlRoutes = require("./routes/html_routes");

const PORT = process.env.PORT || 3001;
const app = express();

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);