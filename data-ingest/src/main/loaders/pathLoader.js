var _ = require('lodash');
var request = require('request');
var jsonfile = require('jsonfile');
var async = require('async');
var processFlightsFile = './flightsProcessed131015950.json';

var url = "http://192.168.1.15:8080";

function pad(str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}

var convertDate = function(inputFormat) {
  function datePad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat*1000);
  return [datePad(d.getMonth()+1), datePad(d.getDate()), d.getFullYear().toString().substr(2,2)].join('/') + " " + datePad(d.getHours()) + ":" + datePad(d.getMinutes());
};

function createFlightModel(id) {
  request({
    url: url + '/create/' + id,
    method: 'POST',
    json: {}
  }, function(err, msg){ console.log('Model '+ id + ' created');});
}

function pushReset(id, cb) {
  request({
    url: url + '/reset/' + id,
    method: 'POST',
    json: {}
  }, function(err, msg){ console.log(msg.body);cb(null, 'done');});
}

function kts2mtsPerSec(kts) { return (kts * 0.5144440.toFixed(2)); }
function toLinuxTimestamp(time) { return time * 1000; }

function pushPath(track, cb) {
  console.log('Track ' + JSON.stringify(track));
  var value = track.heading + ',' + track.latitude + ';' + track.longitude + ';' + kts2mtsPerSec(track.speed.kts);
  var body = {"value": value, "timestamp": track.timestamp + ''};
    request({
      url: url + '/event/' + 'AA2',
      method: 'POST',
      json: body
    }, function(err, msg) {
      if(err) { console.log(err); return; }
      console.log('Event ' + JSON.stringify(body) + ' pushed');
      cb(null, 'done');
    });
}

function toFunc(track) {
  return function(cb) {
    pushPath(track, cb);
  };
}

function pushFlight(flight, cb) {
  console.log('Flighttracks ' + flight.flightData.flight.track.length);
  var callbacks = _.map(flight.flightData.flight.track, toFunc);
  callbacks.push(function(cbo){ pushReset('AA2', cbo);});
  async.series(callbacks, function(err, results){});
}

function toFlights(flight) {
  return function(cb) {
    console.log('new flight');
    pushFlight(flight, function(err, msg){});
  };
}

function pushFlights(err, data) {
  if(err) { console.log(err); return; }
  var callbacks = _.map(data.flights, toFlights);
  console.log('Flights ' + data.flights.length);
  async.series(callbacks, function(err, results){});
}

createFlightModel('AA2');

//jsonfile.readFile('./flightsProcessed127796922.json', pushFlights);
//jsonfile.readFile('./flightsProcessed127946652.json', pushFlights);
//jsonfile.readFile('./flightsProcessed128108703.json', pushFlights);
//jsonfile.readFile('./flightsProcessed128267199.json', pushFlights);
//jsonfile.readFile('./flightsProcessed128437526.json', pushFlights);
//jsonfile.readFile('./flightsProcessed128592997.json', pushFlights);
//jsonfile.readFile('./flightsProcessed128732196.json', pushFlights);
//jsonfile.readFile('./flightsProcessed128876829.json', pushFlights);
//jsonfile.readFile('./flightsProcessed129048910.json', pushFlights);
//jsonfile.readFile('./flightsProcessed129212044.json', pushFlights);
//jsonfile.readFile('./flightsProcessed129368401.json', pushFlights);
//jsonfile.readFile('./flightsProcessed129527049.json', pushFlights);
//jsonfile.readFile('./flightsProcessed129683523.json', pushFlights);
//jsonfile.readFile('./flightsProcessed129807494.json', pushFlights);
//jsonfile.readFile('./flightsProcessed129959123.json', pushFlights);
//jsonfile.readFile('./flightsProcessed130108807.json', pushFlights);
jsonfile.readFile('./flightsProcessed130261610.json', pushFlights);
//jsonfile.readFile('./flightsProcessed130422358.json', pushFlights);
//jsonfile.readFile('./flightsProcessed130584559.json', pushFlights);
//jsonfile.readFile('./flightsProcessed130727136.json', pushFlights);
//jsonfile.readFile('./flightsProcessed130869297.json', pushFlights);
//jsonfile.readFile('./flightsProcessed131015950.json', pushFlights);
//jsonfile.readFile('./flightsProcessed131319430.json', pushFlights);
//jsonfile.readFile('./flightsProcessed131456793.json', pushFlights);
//jsonfile.readFile('./flightsProcessed131543664.json', pushFlights);
//jsonfile.readFile('./flightsProcessed131760768.json', pushFlights);
//jsonfile.readFile('./flightsProcessed131887324.json', pushFlights);
//jsonfile.readFile('./flightsProcessed132029515.json', pushFlights);

