angular
  .module('atad-client', ['ui.bootstrap', 'uiGmapgoogle-maps'])
  .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: '',
          v: '3.20', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
  })
  .controller('RealtimeController', function($scope) {
    "use strict"

  $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4, control: {}};
//  $scope.map.control = {};
  $scope.markers = [
                      {
                        "idKey":1,
                        "coords": {
                                "latitude": 40.1451,
                                "longitude": -99.6680
                              },
                        "options": { "draggable": true }
                      },
                      {
                        "idKey":2,
                        "coords": {
                                "latitude": 40.1451,
                                "longitude": -99.6680
                              },
                        "options": { "draggable": true }
                      }
                   ];

  var lineSymbol = {
     path: 'd="M 194.67321,2.8421709e-14 L 70.641958,53.625 C 60.259688,46.70393 36.441378,32.34961 31.736508,30.17602 C -7.7035221,11.95523 -5.2088921,44.90709 11.387258,54.78122 C 15.926428,57.48187 39.110778,71.95945 54.860708,81.15624 L 72.766958,215.09374 L 94.985708,228.24999 L 106.51696,107.31249 L 178.04821,143.99999 L 181.89196,183.21874 L 196.42321,191.84374 L 207.51696,149.43749 L 207.64196,149.49999 L 238.45446,117.96874 L 223.57946,109.96874 L 187.95446,126.87499 L 119.67321,84.43749 L 217.36071,12.25 L 194.67321,2.8421709e-14 z',
     scale: 0.07
  };

  $scope.marker = {
                    idKey:1,
                    coords: {
                            latitude: 40.1451,
                            longitude: -92.6680
                          },
                    options: {
                      icon:
                        {
                           path: 'M 194.67321,2.8421709e-14 L 70.641958,53.625 C 60.259688,46.70393 36.441378,32.34961 31.736508,30.17602 C -7.7035221,11.95523 -5.2088921,44.90709 11.387258,54.78122 C 15.926428,57.48187 39.110778,71.95945 54.860708,81.15624 L 72.766958,215.09374 L 94.985708,228.24999 L 106.51696,107.31249 L 178.04821,143.99999 L 181.89196,183.21874 L 196.42321,191.84374 L 207.51696,149.43749 L 207.64196,149.49999 L 238.45446,117.96874 L 223.57946,109.96874 L 187.95446,126.87499 L 119.67321,84.43749 L 217.36071,12.25 L 194.67321,2.8421709e-14 z',
                           scale: 0.1,
                           rotation: 45
                        },
                       stroke: {
                             color: '#6060FB',
                             weight: 3
                           }
                      }
                  };

  $scope.options = {icon:'img/airplane.png'};

  //a route
  $scope.polyline2 = {
   id: 1,
   path: [
    {
      "latitude": 40.1451,
      "longitude": -92.6680
    },
    {
      "latitude": 42.2451,
      "longitude": -93.6680
    },
    {
      "latitude": 43.3451,
      "longitude": -95.6680
    },
    {
      "latitude": 47.3451,
      "longitude": -99.6680
    }
   ],
   stroke: {
     color: '#6060FB',
     weight: 3
   },
   geodesic: true,
   icons: [{
       icon: {
           path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
       },
       offset: '25px',
       repeat: '50px'
   }]
  };

  //many routes
  $scope.polylines = [
    { id: 1,
     name: "plane 1",
     path: [
      {
        "latitude": 40.1451,
        "longitude": -92.6680
      },
      {
        "latitude": 42.2451,
        "longitude": -93.6680
      },
      {
        "latitude": 43.3451,
        "longitude": -95.6680
      },
      {
        "latitude": 47.3451,
        "longitude": -99.6680
      }
     ],
     stroke: {
       color: '#6060FB',
       weight: 3
     },
     geodesic: true,
     icons: [{
         icon: {
             path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
         },
         offset: '25px',
         repeat: '50px'
     }]
     },
    {
       id: 2,
       name: "plane 2",
        path: [
         {
           "latitude": 28.3351,
           "longitude": -89.6680
         },
         {
           "latitude": 27.2451,
           "longitude": -90.6680
         },
         {
           "latitude": 27.0451,
           "longitude": -90.8680
         },
         {
           "latitude": 26.8451,
           "longitude": -91.0080
         }
        ],
        stroke: {
          color: '#6060FB',
          weight: 3
        },
        geodesic: true,
        icons: [{
            icon: {
                path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
            },
            offset: '25px',
            repeat: '50px'
        }]
     }
  ];

  //a big route.
  $scope.polyline = {
   id: 1,
   path: [{latitude:40.6534,longitude:-73.7851},
         {latitude:40.6531,longitude:-73.7859},
         {latitude:40.6528,longitude:-73.7866},
         {latitude:40.6526,longitude:-73.787},
         {latitude:40.6524,longitude:-73.7875},
         {latitude:40.6522,longitude:-73.7881},
         {latitude:40.6522,longitude:-73.7887},
         {latitude:40.6522,longitude:-73.7891},
         {latitude:40.6523,longitude:-73.7899},
         {latitude:40.6524,longitude:-73.7902},
         {latitude:40.6526,longitude:-73.7909},
         {latitude:40.6528,longitude:-73.7917},
         {latitude:40.6528,longitude:-73.792},
         {latitude:40.6529,longitude:-73.7927},
         {latitude:40.6529,longitude:-73.7931},
         {latitude:40.6528,longitude:-73.7934},
         {latitude:40.6527,longitude:-73.7937},
         {latitude:40.652,longitude:-73.7934},
         {latitude:40.6516,longitude:-73.7931},
         {latitude:40.6513,longitude:-73.7931},
         {latitude:40.6505,longitude:-73.7937},
         {latitude:40.6502,longitude:-73.7935},
         {latitude:40.65,longitude:-73.7936},
         {latitude:40.6502,longitude:-73.7935}],
   stroke: {
     color: '#6060FB',
     weight: 3
   },
   geodesic: true,
   icons: [{
       icon: {
           path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
       },
       offset: '25px',
       repeat: '50px'
   }]
  };

  $scope.getMessageStyle = function(name) {
    return ($scope.user != null && $scope.user.name == name) ? "color:blue; text-align:right;" : "color:red;";
  };

  $scope.refreshMap = function () {
      //optional param if you want to refresh you can pass null undefined or false or empty arg
      $scope.map.control.refresh({latitude: 40.1451, longitude: -99.6680});
      $scope.map.control.getGMap().setZoom(4);

      return;
  };

  $scope.selectedFlights = [];
  $scope.flight = {path:{latitude: 40.1451, longitude: -99.6680 }};
  $scope.addFinalPoint = function(p) {
    var updateMulti = true;
    var flightCount = $scope.selectedFlights.length;
    var flights = _.remove($scope.selectedFlights, function(item){
        return item.flightID !== p.flightID;
    });

    if (flights.length === flightCount ){
        flights.push(p);
    } else {
      $scope.chartMultipleData = _.remove($scope.chartMultipleData, function(item){
        return item.key !== p.flightID;
      });
      updateMulti = false;
    }

    $scope.selectedFlights = flights;
    //Charts
    $scope.flight = p;
    $scope.set2Chart();
    $scope.drawChart();
  };

  $scope.isButtonActive = function(id) {
    return _.find($scope.selectedFlights, function(item) {
        return item.flightID === id;
    }) != null;
  };

    $scope.flights = [];

    $scope.markerStyle = {
   stroke: {
     color: '#6060FB',
     weight: 3
   },
   geodesic: true,
   icons: [{
       icon: {
           path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
       },
       offset: '25px',
       repeat: '50px'
   }]
 };

    $scope.markers = [
                    {idKey:1,
                      planeName:"Avion 1",
                      anomalyScore: 0.2,
                      coords: {
                              latitude: 42.1451,
                              longitude: -94.6680
                            }
                    },
                    {idKey:2,
                    planeName:"Avion 2",
                    anomalyScore: 0.8,
                    coords: {
                            latitude: 40.1451,
                            longitude: -92.6680
                          },
                    }
                ];


    $scope.windowOptions = {
        visible: false
    };

    $scope.onClick = function() {
        $scope.windowOptions.visible = !$scope.windowOptions.visible;
    };

    $scope.closeClick = function() {
        $scope.windowOptions.visible = false;
    };

    $scope.markerImage = {
        idKey:1,
        coords: {
                latitude: 35.1451,
                longitude: -82.6680
              },
        options: {
          icon:
          {
               path: 'M 194.67321,2.8421709e-14 L 70.641958,53.625 C 60.259688,46.70393 36.441378,32.34961 31.736508,30.17602 C -7.7035221,11.95523 -5.2088921,44.90709 11.387258,54.78122 C 15.926428,57.48187 39.110778,71.95945 54.860708,81.15624 L 72.766958,215.09374 L 94.985708,228.24999 L 106.51696,107.31249 L 178.04821,143.99999 L 181.89196,183.21874 L 196.42321,191.84374 L 207.51696,149.43749 L 207.64196,149.49999 L 238.45446,117.96874 L 223.57946,109.96874 L 187.95446,126.87499 L 119.67321,84.43749 L 217.36071,12.25 L 194.67321,2.8421709e-14 z',
               scale: 0.1,
               rotation: 45
          },
          stroke: {
                 color: '#6060FB',
                 weight: 3
          }
        }
    };

    $scope.optionsImage = {icon:'http://localhost:8080/img/airplane.png',
                          rotation:30
                          };
    $scope.optionsImage2 = {icon:
                          {
                               url: 'http://localhost:8080/img/airplane.png',
                               rotation: 45
                          }
                        };

    $scope.optionsImage3 = {icon:
                          {
//                               path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
                               path: 'M 194.67321,2.8421709e-14 L 70.641958,53.625 C 60.259688,46.70393 36.441378,32.34961 31.736508,30.17602 C -7.7035221,11.95523 -5.2088921,44.90709 11.387258,54.78122 C 15.926428,57.48187 39.110778,71.95945 54.860708,81.15624 L 72.766958,215.09374 L 94.985708,228.24999 L 106.51696,107.31249 L 178.04821,143.99999 L 181.89196,183.21874 L 196.42321,191.84374 L 207.51696,149.43749 L 207.64196,149.49999 L 238.45446,117.96874 L 223.57946,109.96874 L 187.95446,126.87499 L 119.67321,84.43749 L 217.36071,12.25 L 194.67321,2.8421709e-14 z',
                               fillColor: 'black',
                               fillOpacity: 0.8,
                               scale: 0.2,
                               strokeColor: 'gold',
                               strokeWeight: 2,
                               rotation: 185
                          }
                        };

  $scope.flightList = [];

  $scope.getFlights = function() {
    var promise = pageFunctions.getFlights();
    promise.then(function(data) {
      $scope.$apply(function() {
        $scope.flightList = data;
        if(data.length || data.length === 0) { return; }
        $scope.airports = data[0].flightData.data.airport;

      });
      // Get the first one
      if(data.lenght > 0) {
        $scope.getFlightData(data[0].flightData.modelId);
      }
    });
  };

  $scope.flightData = {};
  $scope.chartData = [];
  $scope.chartMultipleData = [];
  $scope.flightEvents = {id: "AA", path:[]};
  $scope.anomalyPoints = [];
  $scope.threshold = 95;
  $scope.lastAnomaly = {};

  $scope.getFlightData = function(id) {
    var promise = pageFunctions.getRealTimeFlight({"flight": id});
    promise.then(function(data) {
      console.log(data);
      $scope.$apply(function() {
        if($scope.chartData.length === 0) {
            var initTuples = [[data.timestamp, data.anomalyScore]];
            $scope.chartData = [];
            $scope.chartData.push({
              "key": data.modelId,
              "values": initTuples
            });
            $scope.flightEvents.id = id;
            $scope.flightEvents.path = [];
        } else {
            $scope.chartData[0].values.push([data.timestamp, data.anomalyScore]);
        }
        d3.selectAll("svg > *").remove();
        $(".nvtooltip").remove();
        $scope.drawChart();
      });
      $scope.flightEvents.path.push(data);
      if (data.anomalyScore >= ($scope.threshold / 100)){
        $scope.anomalyPoints.push(data);
        $scope.lastAnomaly = data;
      }
    });
  };

  $scope.getFlights();

  $scope.set2Chart = function() {
    var tuples = _.map($scope.flight.path, function(item) {
      return [item.timestamp, item.anomalyScore];
    });
    $scope.chartData = [];
    $scope.chartData.push({
      "key": $scope.flight.flightID,
      "values": tuples
    });
  };

  $scope.drawChart = function() {
    nv.addGraph(function() {
      var chart = nv.models.lineWithFocusChart()
        .x(function(d) { return d[0]; })
        .y(function(d) { return Math.abs(d[1]); })
        .color(d3.scale.category10().range())
        .useInteractiveGuideline(true);

      chart.xAxis
        .tickFormat(function(d) {
          return d3.time.format('%X')(new Date(d))
        });

      chart.x2Axis
        .tickFormat(function(d) {
          return d3.time.format('%X')(new Date(d))
        });
      chart.yAxis.tickFormat(d3.format(',.1%'));
      chart.y2Axis.tickFormat(d3.format(',.1%'));

      d3.select('#chart svg')
        .datum($scope.chartData)
        .transition().duration(500)
        .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
  };

  $scope.airports={};

});