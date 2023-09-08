const mqtt = require('mqtt');

// MQTT Broker URL
const brokerUrl = 'mqtt://18.140.254.213:1883/';

// Device Access Token
const deviceToken = 'TEST_TOKEN_2';

// Connect to MQTT Broker
const client = mqtt.connect(brokerUrl, {
  username: deviceToken,
  password: '' // Leave empty for ThingsBoard
});

client.on('connect', function () {
  console.log('connected')
  client.subscribe('v1/devices/me/telemetry')
  function publishMessage() {
    // Publish the message to the specified topic
    client.publish('v1/devices/me/telemetry', '{"test":"ok", "test2":"nice"}');
  }
  
  // Set an interval to publish messages every 1 second (1000 milliseconds)
  const interval = setInterval(publishMessage, 1000);

  // To stop publishing messages after a certain duration (e.g., 10 seconds), you can use setTimeout
  const stopAfterSeconds = 60;
  setTimeout(() => {
    clearInterval(interval); // Stop the publishing interval
    console.log('Publishing stopped after', stopAfterSeconds, 'seconds.');
    client.end(); // Close the MQTT client connection
  }, stopAfterSeconds * 1000);
  client.publish('v1/devices/me/telemetry', '{"test":"ok", "test2":"nice"}')
})

client.on('message', function (topic, message) {
  console.log('response.topic: ' + topic)
  console.log('response.body: ' + message.toString())
  client.end()
})
