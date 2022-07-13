const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./app/models');
const dbConfig = require('./app/config/db.config');

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// database connection
db.mongoose.connect(`${dbConfig.URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connect to MongoDB.");
}).catch(err => {
  console.error("Connection error", err);
  process.exit();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application12." });
});
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);