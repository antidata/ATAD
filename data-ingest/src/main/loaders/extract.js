var _ = require('lodash');
var jsonfile = require('jsonfile');

var file = './flights.json';
var saveTo = './flightsProcessed';
var data = [];

function processFlight(flight) {
    return {
        flightData: flight.result.response.data,
        path: flight.result.response.track
    };
}

function processFlights(arrData) {
    var finalArray = _.map(arrData, processFlight);
    return {
        flightNumber: arrData[0].result.response.data.flight.identification.number.default,
        flights: finalArray
    };
}

function saveData(obj) {
    _.map(obj.flights, function(flight) {
        console.log(flight.flightData.flight.identification.id);
      jsonfile.writeFile(saveTo + flight.flightData.flight.identification.id + '.json', {flights: [flight]});
    })
}

function processFlightsFile(err, obj) {
    if(err) { console.log('Error loading file ' + err ); return;}
    saveData(processFlights(obj));
}

jsonfile.readFile(file, processFlightsFile);
