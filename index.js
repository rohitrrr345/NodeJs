const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const app = express();

app.use(cookieParser());

const connection = mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connection.then(() => {
  console.log('Connected to MongoDB');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
