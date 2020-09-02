const express = require('express');
const cors = require('cors');

const { whitelist } = require('./config');

const corsMiddleware = cors({
  origin: whitelist
});

module.exports = [
  corsMiddleware,
  express.json(),
];