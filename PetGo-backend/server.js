const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoutes = require('./routes/userRoutes');

app.use('/api/users', userRoutes); 

app.get('/', (req, res) => {
  res.send('PetGo API is running...');
});

// Start server
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
