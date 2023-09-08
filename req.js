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
  client.subscribe('v1/gateway/attributes')
  client.publish('v1/gateway/attributes', '{"Device A":{"attribute1":"value1", "attribute2": 42}}')
})

client.on('message', function (topic, message) {
  console.log('response.topic: ' + topic)
  console.log('response.body: ' + message.toString())
  client.end()
})
