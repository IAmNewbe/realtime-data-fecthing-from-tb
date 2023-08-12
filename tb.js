const mqtt = require('mqtt');

// MQTT Broker URL
const brokerUrl = 'mqtt://18.140.254.213:1883/';

// Device Access Token
const deviceToken = 'TEST_TOKEN';

// Connect to MQTT Broker
const client = mqtt.connect(brokerUrl, {
  username: deviceToken,
  password: '' // Leave empty for ThingsBoard
});

// Subscribe to Telemetry Topic
// client.on('connect', () => {
//   console.log('Connected to MQTT broker');
//   client.subscribe('v1/devices/me/attributes/response/+')
// });

// // Handle Received Telemetry Data
// client.on('message', (topic, message) => {
//   console.log('Received data:', message.toString());
//   // Here you can parse and process the received data as needed
// });

client.on('connect', function () {
  console.log('connected')
  client.subscribe('v1/devices/me/telemetry')
  client.publish('v1/devices/me/telemetry', '{"clientKeys":"attribute1", "sharedKeys":"shared1"}')
})

client.on('message', function (topic, message) {
  console.log('response.topic: ' + topic)
  console.log('response.body: ' + message.toString())
  client.end()
})
