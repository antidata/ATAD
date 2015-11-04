var _ = require('lodash');
var request = require('request');
var jsonfile = require('jsonfile');
var async = require('async');
var url = "http://25.6.5.171:8080";

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

function kts2mtsPerSec(kts) { return (kts * 0.5144440.toFixed(2)); }
function toLinuxTimestamp(time) { return time * 1000; }

function pushObject(track, cb) {
    request({
      url: url + '/radar-event/',
      method: 'POST',
      json: track
    }, function(err, msg) {
      if(err) { console.log(err); return; }
      console.log('Event ' + JSON.stringify(track) + ' pushed: ' + JSON.stringify(msg.body));
    });
}

  request({
    url: address,
    method: 'GET'
  }, function(err, response) {
    var response = JSON.parse(response.body);
    var arrResponse = [];
    var currentTimestamp;
    for(var key in response) {
      if(key !== "stats" && key !== "full_count" && key !== "version") {
        var obj = {
          value: response[key][1] + ';' + response[key][2] + ';' + response[key][5],
          rotation: response[key][3] + '',
          timestamp: response[key][10] + '',
          lat: response[key][1],
          long: response[key][2]
        };
        arrResponse.push(obj);
        currentTimestamp = response[key][10];
        pushObject(obj);
      }
    }
    jsonfile.writeFile('radar/' + currentTimestamp + '.json', arrResponse, function (err) {
                                                                           console.error(err)
                                                                         });
  });

