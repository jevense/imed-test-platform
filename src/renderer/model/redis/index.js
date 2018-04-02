import Redis from 'redis'

const client = Redis.createClient({
    host: 'developer.mvwchina.com',
    // db: 0,
});

// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err)
});

client.set("string key", "string val", Redis.print);
client.hset("hash key", "hashtest 1", "some value", Redis.print);
client.hset(["hash key", "hashtest 2", "some other value"], Redis.print);
client.hkeys("hash key", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.quit();
});
