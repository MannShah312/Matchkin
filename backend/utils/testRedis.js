// testRedis.js
require('dotenv').config({ path: '../.env' });
const { createClient } = require('redis');
// require('dotenv').config();

// console.log('Redis Config:', {
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   username: process.env.REDIS_USERNAME,
//   password: process.env.REDIS_PASSWORD ? '✅ present' : '❌ missing'
// });

// Create Redis client using environment variables
const client = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    tls: {}, // Required for Redis Cloud (TLS)
  },
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

// Handle Redis errors
client.on('error', (err) => {
  console.error('❌ Redis Client Error:', err);
});

// Test connection
(async () => {
  try {
    await client.connect();
    console.log('✅ Connected to Redis!');

    // Test write and read
    await client.set('test-key', '123');
    const value = await client.get('test-key');
    console.log('🔁 Retrieved from Redis:', value); // Should print 123

    await client.quit(); // Gracefully close connection
  } catch (err) {
    console.error('❌ Test failed:', err);
    await client.quit();
  }
})();