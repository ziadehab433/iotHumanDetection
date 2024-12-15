const redis = require("redis");

const client = redis.createClient();

client.on("connect", () => {
    console.log("connected to redis successfully");
});

client.on("error", (err) => {
    console.log("error connecting to redis:", err);
});

(async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error("failed to connect to redis:", err);
    }
})();

exports.setConnection = async (key, value) => {
    try {
        await client.set(key, value); 
    } catch (err) {
        console.log("error setting connection in redis:", err);
    }
};

exports.getConnection = async (key) => {
    try {
        const connectionId = await client.get(key);
        return connectionId;
    } catch (err) {
        console.log("error getting connection from redis:", err);
    }
};

