// app.js
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose.connect('your-mongodb-uri', { useNewUrlParser: true, useUnifiedTopology: true });

require('./strategies/passport-local');
require('./strategies/passport-jwt');

app.use(passport.initialize());

app.use('/api/sessions', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
