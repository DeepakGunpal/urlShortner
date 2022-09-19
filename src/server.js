const redis = require("redis");
require("dotenv").config();

//Connect to redis
const redisClient = redis.createClient(
    13190,
    "redis-13190.c301.ap-south-1-1.ec2.cloud.redislabs.com",
    { no_ready_check: true }
);
redisClient.auth(process.env.REDIS_AUTH, function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

//! TO delete all keys from redis
// redisClient.flushall('ASYNC', (err, succeeded) => {
//     console.log(succeeded); // will be true if successfull
// });

module.exports = { redisClient }