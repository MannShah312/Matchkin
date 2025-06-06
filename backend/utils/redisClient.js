// const { createClient } = require('redis');

// const client = createClient({
//   socket: {
//     host: 'redis-12447.c264.ap-south-1-1.ec2.redns.redis-cloud.com',
//     port: 12447,
//     tls: {}, // ✅ Force TLS from client
//   },
//   username: 'default',
//   password: 'YMLihKAhhfDN46bRXrGRFftPyD9N1gkh',
// });

// client.on('error', (err) => {
//   console.error('❌ Redis Client Error:', err);
// });

// async function connectRedis() {
//   if (!client.isOpen) {
//     await client.connect();
//     console.log('✅ Connected to Redis!');
//   }
// }

// module.exports = {client, connectRedis};

// utils/redisClient.js
const { createClient } = require('redis');
require('dotenv').config();

const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    tls: {}, // Enables SSL (required for Redis Cloud)
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

client.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

const connectRedis = async () => {
  if (!client.isOpen) {
    await client.connect();
    console.log('✅ Connected to Redis!');
  }
};

module.exports = { client, connectRedis };