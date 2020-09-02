const env = process.env.NODE_ENV || 'development';

const base = {
  whitelist: []
};

// TODO: make config repo in future
const config = {
  development: {
    whitelist: [
      'http://localhost:3000'
    ]
  }
};

// TODO: replace with deep extend
module.exports = Object.assign(base, config[env]);