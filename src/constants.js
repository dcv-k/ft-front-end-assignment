// server
const DATA_PATH = "./data/cities.json"
const SERVER_PORT = 3001
const UNITS = "metric"
const CLIENT_URL = "http://localhost:3000"

// client
const CACHE_KEY = "weatherData"
const EXPIRATION_TIME = 5 * 60 * 1000;
const SERVER_URL = "http://localhost:3001"

module.exports = {
  DATA_PATH,
  SERVER_PORT,
  UNITS,
  CLIENT_URL,
  CACHE_KEY,
  EXPIRATION_TIME,
  SERVER_URL
};
