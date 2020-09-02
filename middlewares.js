const express = require('express');
const cors = require('cors');

const { whitelist } = require('./config');

module.exports = [
  cors({
    origin: whitelist
  }),
  express.json(),
];