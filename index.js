// index.js

// Initialize project
var express = require('express');
var app = express();

// Enable CORS so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // Some legacy browsers choke on 204


// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static('public'));

// Serve the main page
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Test API endpoint for "hello"
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// Timestamp API endpoint
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  let date;

  // If no date parameter is passed, return current date
  if (!dateParam) {
    date = new Date();
  } else if (isNaN(dateParam)) {
    // If it's not a number, assume it's a date string
    date = new Date(dateParam);
  } else {
    // If it's a number, assume it's a Unix timestamp
    date = new Date(parseInt(dateParam));
  }

  // If the date is invalid, return error
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Return Unix timestamp and UTC string
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
