var express = require('express');
var app = express();

app.get('/sensor/temperature', function (req, res) {
  res.contentType('application/json');
  var sensorLib = require('node-dht-sensor');
  var sensor = {
    initialize: function() {
      return sensorLib.initialize(11 /* dht11 */, 4 /* GPIO 4 */);
    },
    read: function() {
      var readout = sensorLib.read();
      console.log('tem: '+readout.temperature.toFixed(2)+'C, hum: '+readout.humidity.toFixed(2)+'%');
      res.send(JSON.stringify(readout));
    }
  };
  
  if (sensor.initialize()) {
    sensor.read();
  } else {
    // error response
    console.warn('Failed to initialize sensor');
    res.status(500).send('Failed to initialize sensor');
  }
});

app.listen(3000);
