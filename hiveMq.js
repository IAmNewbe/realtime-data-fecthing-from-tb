var mqtt = require('mqtt')

var options = {
    host: 'a3552a55d542435ba163f30a9305ed75.s1.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'Ahmad',
    password: 'Hikam2222'
}

// initialize the MQTT client
var client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('v1/devices/me/telemetry');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('v1/devices/me/telemetry', '"temperature": 22.4,"sal": 780,"DO": 718,"pH": 7');