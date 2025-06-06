// testEnv.js
require('dotenv').config({ path: '../.env' });
console.log('REDIS_HOST:', process.env.REDIS_HOST);
