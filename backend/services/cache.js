// import redis from "redis";
import util from "util";
import mongoose from "mongoose";

// const client = redis.createClient(process.env.REDIS_URL);
// client.get = util.promisify(client.get);

// Save the origial mongoose Exec function
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (option) {
  this.cache = {};
  if (option && option.key) this.cache.key = option.key;
  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.cache) {
    return exec.apply(this, arguments);
  }

  const key = JSON.stringify(Object.assign({}, this.getQuery(), { collection: this.mongooseCollection.name }));
  console.log(this);

  // // Check if value was stored in redis
  // const cachedValue = await client.get(key);
  // if (cachedValue) {
  //   return JSON.parse(cachedValue);
  // }

  // else
  const result = await exec.apply(this, arguments);
  // client.set(key, JSON.stringify(result));
  return result;
};
