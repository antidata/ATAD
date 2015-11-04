var request = require('request');
var url = "http://25.6.5.171:8080";

var step = 0.1;
var minLat = 37.35315697229132;
var maxLat = 37.88839799245461;
var minLong = -123.02279663085938;
var maxLong = -121.56802368164062;
var crntLat = minLat;
var crntLong = minLong;

while(crntLat < maxLat) {
  while (crntLong < maxLong) {
    console.log('Requesting (' + crntLat +', ' + crntLong +')');
    request({
      url: url + '/radar-create/',
      method: 'POST',
      json: {"lat": crntLat, "long": crntLong}
    }, function(err, msg){
      if(err) {console.log('Error: ' + err); return;}
      console.log('Model created ' + JSON.stringify(msg.body));
      crntLong += step;
    });
  }
  crntLong = minLong;
  crntLat += step;
}
