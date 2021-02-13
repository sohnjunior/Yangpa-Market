import redis from 'redis';

class RedisClient {
  client: redis.RedisClient;

  constructor() {
    this.client = redis.createClient(6379);
  }

  public setValue(key: string, value: string) {
    this.client.set(key, value);
  }

  public async getValue(key: string) {
    return new Promise((resolve, reject) => {
      this.client.get(key, (err, value) => {
        if (err) reject(err);
        resolve(value);
      });
    });
  }
}

const redisClient = new RedisClient();
export default redisClient;
