const redis = require('redis');

class RedisClient {
  constructor() {
    this.client = redis.createClient(6379);
  }

  get endpoint() {
    return this.client;
  }

  setValue(key, value) {
    this.client.set(key, value);
  }

  async getValue(key) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) reject(err);
        resolve(value);
      });
    });
  }
}

const redisClient = new RedisClient();
module.exports = redisClient;
