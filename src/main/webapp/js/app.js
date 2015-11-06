angular
  .module('atad-client', ['ui.bootstrap', 'uiGmapgoogle-maps'])
  .config(function(uiGmapGoogleMapApiProvider) {
      uiGmapGoogleMapApiProvider.configure({
          key: '',
          v: '3.20', //defaults to latest 3.X anyhow
          libraries: 'weather,geometry,visualization'
      });
  })
  .controller('FlightController', function($scope) {
    "use strict"

  $scope.map = {center: {latitude: 40.1451, longitude: -99.6680 }, zoom: 4 };
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
   path: [{latitude:33.9391,longitude:-118.397},
         {latitude:33.9392,longitude:-118.396},
         {latitude:33.9393,longitude:-118.395},
         {latitude:33.9394,longitude:-118.394},
         {latitude:33.9395,longitude:-118.393},
         {latitude:33.9397,longitude:-118.392},
         {latitude:33.9397,longitude:-118.391},
         {latitude:33.9398,longitude:-118.391},
         {latitude:33.9399,longitude:-118.389},
         {latitude:33.94,longitude:-118.389},
         {latitude:33.9401,longitude:-118.388},
         {latitude:33.9401,longitude:-118.387},
         {latitude:33.9403,longitude:-118.385},
         {latitude:33.9404,longitude:-118.384},
         {latitude:33.9405,longitude:-118.384},
         {latitude:33.9405,longitude:-118.383},
         {latitude:33.9406,longitude:-118.382},
         {latitude:33.9407,longitude:-118.382},
         {latitude:33.9407,longitude:-118.381},
         {latitude:33.9404,longitude:-118.38},
         {latitude:33.9401,longitude:-118.38},
         {latitude:33.9399,longitude:-118.38},
         {latitude:33.9398,longitude:-118.381},
         {latitude:33.9397,longitude:-118.382},
         {latitude:33.9394,longitude:-118.384},
         {latitude:33.9388,longitude:-118.391},
         {latitude:33.9382,longitude:-118.396},
         {latitude:33.9373,longitude:-118.405},
         {latitude:33.9366,longitude:-118.412},
         {latitude:33.936,longitude:-118.418},
         {latitude:33.9355,longitude:-118.423},
         {latitude:33.935,longitude:-118.429},
         {latitude:33.9346,longitude:-118.435},
         {latitude:33.9343,longitude:-118.44},
         {latitude:33.9339,longitude:-118.446},
         {latitude:33.9331,longitude:-118.456},
         {latitude:33.9319,longitude:-118.462},
         {latitude:33.9296,longitude:-118.472},
         {latitude:33.9277,longitude:-118.479},
         {latitude:33.9245,longitude:-118.49},
         {latitude:33.9225,longitude:-118.497},
         {latitude:33.9201,longitude:-118.506},
         {latitude:33.9177,longitude:-118.514},
         {latitude:33.9153,longitude:-118.522},
         {latitude:33.912,longitude:-118.533},
         {latitude:33.9082,longitude:-118.545},
         {latitude:33.9044,longitude:-118.556},
         {latitude:33.902,longitude:-118.563},
         {latitude:33.8966,longitude:-118.577},
         {latitude:33.8914,longitude:-118.588},
         {latitude:33.8863,longitude:-118.594},
         {latitude:33.8792,longitude:-118.599},
         {latitude:33.8721,longitude:-118.603},
         {latitude:33.8658,longitude:-118.604},
         {latitude:33.8393,longitude:-118.594},
         {latitude:33.8327,longitude:-118.587},
         {latitude:33.8285,longitude:-118.581},
         {latitude:33.8238,longitude:-118.568},
         {latitude:33.823,longitude:-118.559},
         {latitude:33.8303,longitude:-118.531},
         {latitude:33.839,longitude:-118.521},
         {latitude:33.8443,longitude:-118.515},
         {latitude:33.8517,longitude:-118.509},
         {latitude:33.8577,longitude:-118.503},
         {latitude:33.8642,longitude:-118.497},
         {latitude:33.8779,longitude:-118.485},
         {latitude:33.8907,longitude:-118.473},
         {latitude:33.9051,longitude:-118.459},
         {latitude:33.9204,longitude:-118.444},
         {latitude:33.9336,longitude:-118.429},
         {latitude:33.9397,longitude:-118.42},
         {latitude:33.9491,longitude:-118.404},
         {latitude:33.955,longitude:-118.394},
         {latitude:33.9599,longitude:-118.385},
         {latitude:33.972,longitude:-118.364},
         {latitude:34.0057,longitude:-118.304},
         {latitude:34.0352,longitude:-118.246},
         {latitude:34.0403,longitude:-118.232},
         {latitude:34.0658,longitude:-118.163},
         {latitude:34.0893,longitude:-118.096},
         {latitude:34.106,longitude:-118.06},
         {latitude:34.1116,longitude:-118.051},
         {latitude:34.1193,longitude:-118.037},
         {latitude:34.1861,longitude:-117.924},
         {latitude:34.2575,longitude:-117.803},
         {latitude:34.3256,longitude:-117.686},
         {latitude:34.3954,longitude:-117.567},
         {latitude:34.4678,longitude:-117.442},
         {latitude:34.5417,longitude:-117.314},
         {latitude:34.6149,longitude:-117.187},
         {latitude:34.6965,longitude:-117.054},
         {latitude:34.7866,longitude:-116.934},
         {latitude:34.8796,longitude:-116.809},
         {latitude:34.9723,longitude:-116.685},
         {latitude:35.0622,longitude:-116.564},
         {latitude:35.1507,longitude:-116.444},
         {latitude:35.2423,longitude:-116.319},
         {latitude:35.3316,longitude:-116.193},
         {latitude:35.4151,longitude:-116.062},
         {latitude:35.4984,longitude:-115.932},
         {latitude:35.578,longitude:-115.807},
         {latitude:35.6616,longitude:-115.675},
         {latitude:35.7418,longitude:-115.548},
         {latitude:35.8262,longitude:-115.413},
         {latitude:35.9102,longitude:-115.279},
         {latitude:35.9945,longitude:-115.144},
         {latitude:36.0775,longitude:-115.01},
         {latitude:36.1605,longitude:-114.876},
         {latitude:36.2432,longitude:-114.742},
         {latitude:36.3213,longitude:-114.614},
         {latitude:36.4044,longitude:-114.478},
         {latitude:36.4862,longitude:-114.344},
         {latitude:36.5677,longitude:-114.21},
         {latitude:36.6505,longitude:-114.073},
         {latitude:36.7308,longitude:-113.939},
         {latitude:36.8108,longitude:-113.806},
         {latitude:36.8914,longitude:-113.671},
         {latitude:36.9707,longitude:-113.537},
         {latitude:37.0518,longitude:-113.401},
         {latitude:37.1315,longitude:-113.265},
         {latitude:37.2092,longitude:-113.133},
         {latitude:37.2906,longitude:-112.994},
         {latitude:37.3688,longitude:-112.86},
         {latitude:37.4499,longitude:-112.72},
         {latitude:37.5298,longitude:-112.582},
         {latitude:37.6105,longitude:-112.442},
         {latitude:37.6891,longitude:-112.303},
         {latitude:37.7548,longitude:-112.163},
         {latitude:37.825,longitude:-112.011},
         {latitude:37.8911,longitude:-111.868},
         {latitude:37.9612,longitude:-111.714},
         {latitude:38.0302,longitude:-111.562},
         {latitude:38.0993,longitude:-111.41},
         {latitude:38.1773,longitude:-111.262},
         {latitude:38.2591,longitude:-111.12},
         {latitude:38.3407,longitude:-110.973},
         {latitude:38.4015,longitude:-110.823},
         {latitude:38.4639,longitude:-110.664},
         {latitude:38.5235,longitude:-110.51},
         {latitude:38.5848,longitude:-110.352},
         {latitude:38.6435,longitude:-110.199},
         {latitude:38.7047,longitude:-110.039},
         {latitude:38.7653,longitude:-109.88},
         {latitude:38.828,longitude:-109.715},
         {latitude:38.8868,longitude:-109.559},
         {latitude:38.9495,longitude:-109.391},
         {latitude:39.012,longitude:-109.224},
         {latitude:39.0728,longitude:-109.06},
         {latitude:39.1351,longitude:-108.891},
         {latitude:39.1983,longitude:-108.718},
         {latitude:39.2606,longitude:-108.547},
         {latitude:39.3223,longitude:-108.377},
         {latitude:39.3821,longitude:-108.211},
         {latitude:39.4457,longitude:-108.033},
         {latitude:39.5046,longitude:-107.868},
         {latitude:39.5742,longitude:-107.671},
         {latitude:39.6329,longitude:-107.504},
         {latitude:39.6933,longitude:-107.332},
         {latitude:39.7533,longitude:-107.159},
         {latitude:39.8146,longitude:-106.981},
         {latitude:39.8708,longitude:-106.818},
         {latitude:39.9324,longitude:-106.637},
         {latitude:39.9909,longitude:-106.465},
         {latitude:40.051,longitude:-106.287},
         {latitude:40.1102,longitude:-106.11},
         {latitude:40.1688,longitude:-105.934},
         {latitude:40.2274,longitude:-105.756},
         {latitude:40.2862,longitude:-105.577},
         {latitude:40.3436,longitude:-105.402},
         {latitude:40.4019,longitude:-105.222},
         {latitude:40.4602,longitude:-105.041},
         {latitude:40.5168,longitude:-104.865},
         {latitude:40.5748,longitude:-104.682},
         {latitude:40.631,longitude:-104.504},
         {latitude:40.6868,longitude:-104.326},
         {latitude:40.744,longitude:-104.143},
         {latitude:40.7988,longitude:-103.966},
         {latitude:40.8554,longitude:-103.783},
         {latitude:40.9101,longitude:-103.604},
         {latitude:40.9654,longitude:-103.421},
         {latitude:41.0208,longitude:-103.237},
         {latitude:41.0727,longitude:-103.065},
         {latitude:41.1199,longitude:-102.876},
         {latitude:41.1604,longitude:-102.688},
         {latitude:41.1997,longitude:-102.503},
         {latitude:41.2386,longitude:-102.318},
         {latitude:41.2786,longitude:-102.128},
         {latitude:41.3173,longitude:-101.94},
         {latitude:41.3565,longitude:-101.751},
         {latitude:41.3943,longitude:-101.565},
         {latitude:41.4316,longitude:-101.379},
         {latitude:41.4692,longitude:-101.191},
         {latitude:41.5067,longitude:-101.002},
         {latitude:41.5444,longitude:-100.81},
         {latitude:41.5806,longitude:-100.623},
         {latitude:41.6172,longitude:-100.433},
         {latitude:41.653,longitude:-100.245},
         {latitude:41.6854,longitude:-100.073},
         {latitude:41.7204,longitude:-99.886},
         {latitude:41.7547,longitude:-99.7008},
         {latitude:41.7892,longitude:-99.513},
         {latitude:41.8128,longitude:-99.4119},
         {latitude:41.8195,longitude:-99.3935},
         {latitude:41.8252,longitude:-99.3785},
         {latitude:41.896,longitude:-99.202},
         {latitude:41.9648,longitude:-99.038},
         {latitude:42.034,longitude:-98.8717},
         {latitude:42.1023,longitude:-98.7063},
         {latitude:42.1671,longitude:-98.548},
         {latitude:42.2411,longitude:-98.3679},
         {latitude:42.31,longitude:-98.2005},
         {latitude:42.3789,longitude:-98.0319},
         {latitude:42.4502,longitude:-97.8584},
         {latitude:42.5165,longitude:-97.6966},
         {latitude:42.5905,longitude:-97.5149},
         {latitude:42.6521,longitude:-97.3462},
         {latitude:42.6926,longitude:-97.1832},
         {latitude:42.6949,longitude:-97.1609},
         {latitude:42.6958,longitude:-97.1491},
         {latitude:42.6968,longitude:-97.1268},
         {latitude:42.6969,longitude:-97.105},
         {latitude:42.6936,longitude:-96.912},
         {latitude:42.6896,longitude:-96.7143},
         {latitude:42.6874,longitude:-96.4916},
         {latitude:42.691,longitude:-96.2929},
         {latitude:42.6944,longitude:-96.0949},
         {latitude:42.6935,longitude:-95.8938},
         {latitude:42.6845,longitude:-95.6939},
         {latitude:42.6752,longitude:-95.4978},
         {latitude:42.6654,longitude:-95.295},
         {latitude:42.6553,longitude:-95.0959},
         {latitude:42.6446,longitude:-94.8922},
         {latitude:42.6337,longitude:-94.6907},
         {latitude:42.6229,longitude:-94.498},
         {latitude:42.612,longitude:-94.2931},
         {latitude:42.6051,longitude:-94.1919},
         {latitude:42.6009,longitude:-94.1709},
         {latitude:42.5961,longitude:-94.152},
         {latitude:42.5901,longitude:-94.1319},
         {latitude:42.5861,longitude:-94.1205},
         {latitude:42.5775,longitude:-94.099},
         {latitude:42.5694,longitude:-94.0817},
         {latitude:42.5609,longitude:-94.066},
         {latitude:42.5533,longitude:-94.0535},
         {latitude:42.5437,longitude:-94.0391},
         {latitude:42.5326,longitude:-94.0248},
         {latitude:42.522,longitude:-94.0127},
         {latitude:42.514,longitude:-94.0045},
         {latitude:42.5008,longitude:-93.9926},
         {latitude:42.4884,longitude:-93.983},
         {latitude:42.4763,longitude:-93.9751},
         {latitude:42.4659,longitude:-93.9689},
         {latitude:42.452,longitude:-93.9625},
         {latitude:42.4392,longitude:-93.9573},
         {latitude:42.4266,longitude:-93.9525},
         {latitude:42.4172,longitude:-93.949},
         {latitude:42.2807,longitude:-93.8981},
         {latitude:42.146,longitude:-93.8493},
         {latitude:42.0835,longitude:-93.8182},
         {latitude:42.0697,longitude:-93.8076},
         {latitude:42.0591,longitude:-93.7977},
         {latitude:42.0473,longitude:-93.7857},
         {latitude:42.0363,longitude:-93.7727},
         {latitude:42.0271,longitude:-93.7604},
         {latitude:42.0196,longitude:-93.749},
         {latitude:42.0114,longitude:-93.7356},
         {latitude:41.997,longitude:-93.7067},
         {latitude:41.9898,longitude:-93.689},
         {latitude:41.9816,longitude:-93.6643},
         {latitude:41.9764,longitude:-93.645},
         {latitude:41.971,longitude:-93.6173},
         {latitude:41.9686,longitude:-93.5997},
         {latitude:41.9669,longitude:-93.5812},
         {latitude:41.9661,longitude:-93.5618},
         {latitude:41.971,longitude:-93.4895},
         {latitude:41.9951,longitude:-93.2862},
         {latitude:42.0175,longitude:-93.0951},
         {latitude:42.0386,longitude:-92.913},
         {latitude:42.0602,longitude:-92.7249},
         {latitude:42.0821,longitude:-92.5325},
         {latitude:42.1027,longitude:-92.3486},
         {latitude:42.1238,longitude:-92.1567},
         {latitude:42.1455,longitude:-91.9557},
         {latitude:42.1647,longitude:-91.7754},
         {latitude:42.1854,longitude:-91.5782},
         {latitude:42.2052,longitude:-91.3866},
         {latitude:42.2249,longitude:-91.1918},
         {latitude:42.2434,longitude:-91.0081},
         {latitude:42.2637,longitude:-90.8},
         {latitude:42.2819,longitude:-90.6085},
         {latitude:42.3004,longitude:-90.4141},
         {latitude:42.3181,longitude:-90.2241},
         {latitude:42.335,longitude:-90.039},
         {latitude:42.3518,longitude:-89.8497},
         {latitude:42.3678,longitude:-89.6668},
         {latitude:42.3848,longitude:-89.4687},
         {latitude:42.4,longitude:-89.2877},
         {latitude:42.4157,longitude:-89.0978},
         {latitude:42.4309,longitude:-88.9095},
         {latitude:42.446,longitude:-88.7193},
         {latitude:42.461,longitude:-88.5253},
         {latitude:42.4752,longitude:-88.3376},
         {latitude:42.4898,longitude:-88.1439},
         {latitude:42.5,longitude:-87.9526},
         {latitude:42.4999,longitude:-87.7685},
         {latitude:42.4994,longitude:-87.5763},
         {latitude:42.4986,longitude:-87.3883},
         {latitude:42.4975,longitude:-87.1942},
         {latitude:42.4961,longitude:-87.0107},
         {latitude:42.4944,longitude:-86.8234},
         {latitude:42.4923,longitude:-86.6351},
         {latitude:42.4899,longitude:-86.446},
         {latitude:42.4872,longitude:-86.2552},
         {latitude:42.4842,longitude:-86.0663},
         {latitude:42.4811,longitude:-85.8815},
         {latitude:42.4775,longitude:-85.6973},
         {latitude:42.4737,longitude:-85.5101},
         {latitude:42.4697,longitude:-85.335},
         {latitude:42.4653,longitude:-85.1463},
         {latitude:42.4607,longitude:-84.9676},
         {latitude:42.4559,longitude:-84.7848},
         {latitude:42.4508,longitude:-84.607},
         {latitude:42.4453,longitude:-84.4261},
         {latitude:42.4393,longitude:-84.2379},
         {latitude:42.4331,longitude:-84.0533},
         {latitude:42.4267,longitude:-83.8669},
         {latitude:42.42,longitude:-83.6827},
         {latitude:42.4132,longitude:-83.5041},
         {latitude:42.4059,longitude:-83.3212},
         {latitude:42.398,longitude:-83.1331},
         {latitude:42.3902,longitude:-82.9509},
         {latitude:42.3817,longitude:-82.7617},
         {latitude:42.3743,longitude:-82.5775},
         {latitude:42.3672,longitude:-82.4011},
         {latitude:42.3598,longitude:-82.2174},
         {latitude:42.352,longitude:-82.0347},
         {latitude:42.3438,longitude:-81.851},
         {latitude:42.3355,longitude:-81.6676},
         {latitude:42.3271,longitude:-81.49},
         {latitude:42.3181,longitude:-81.3056},
         {latitude:42.3033,longitude:-81.1255},
         {latitude:42.279,longitude:-80.951},
         {latitude:42.2553,longitude:-80.7825},
         {latitude:42.2302,longitude:-80.6067},
         {latitude:42.2041,longitude:-80.4247},
         {latitude:42.1784,longitude:-80.2494},
         {latitude:42.1528,longitude:-80.0754},
         {latitude:42.1257,longitude:-79.894},
         {latitude:42.1004,longitude:-79.7261},
         {latitude:42.0731,longitude:-79.5466},
         {latitude:42.0462,longitude:-79.3725},
         {latitude:42.0186,longitude:-79.1954},
         {latitude:41.9917,longitude:-79.0239},
         {latitude:41.9638,longitude:-78.8483},
         {latitude:41.9365,longitude:-78.6791},
         {latitude:41.9087,longitude:-78.5073},
         {latitude:41.8798,longitude:-78.3314},
         {latitude:41.8526,longitude:-78.167},
         {latitude:41.8243,longitude:-77.9971},
         {latitude:41.7958,longitude:-77.8285},
         {latitude:41.7661,longitude:-77.6533},
         {latitude:41.7366,longitude:-77.4827},
         {latitude:41.7061,longitude:-77.3063},
         {latitude:41.6731,longitude:-77.1319},
         {latitude:41.6275,longitude:-76.9623},
         {latitude:41.5846,longitude:-76.8054},
         {latitude:41.5381,longitude:-76.6354},
         {latitude:41.4902,longitude:-76.4622},
         {latitude:41.4403,longitude:-76.2824},
         {latitude:41.3939,longitude:-76.1167},
         {latitude:41.3435,longitude:-75.9374},
         {latitude:41.2982,longitude:-75.7783},
         {latitude:41.2459,longitude:-75.6082},
         {latitude:41.1947,longitude:-75.4554},
         {latitude:41.1394,longitude:-75.2902},
         {latitude:41.0873,longitude:-75.1368},
         {latitude:41.0374,longitude:-74.9902},
         {latitude:40.9959,longitude:-74.8571},
         {latitude:40.9934,longitude:-74.8413},
         {latitude:40.9919,longitude:-74.8279},
         {latitude:40.9902,longitude:-74.812},
         {latitude:40.9884,longitude:-74.7952},
         {latitude:40.9715,longitude:-74.6416},
         {latitude:40.9539,longitude:-74.4821},
         {latitude:40.9338,longitude:-74.3417},
         {latitude:40.9296,longitude:-74.3279},
         {latitude:40.923,longitude:-74.3078},
         {latitude:40.8767,longitude:-74.1676},
         {latitude:40.8371,longitude:-74.0453},
         {latitude:40.8183,longitude:-73.9877},
         {latitude:40.7948,longitude:-73.9158},
         {latitude:40.7747,longitude:-73.8564},
         {latitude:40.7658,longitude:-73.8348},
         {latitude:40.7602,longitude:-73.8268},
         {latitude:40.7504,longitude:-73.8165},
         {latitude:40.7428,longitude:-73.8108},
         {latitude:40.7362,longitude:-73.806},
         {latitude:40.729,longitude:-73.8012},
         {latitude:40.7209,longitude:-73.796},
         {latitude:40.7136,longitude:-73.7912},
         {latitude:40.677,longitude:-73.7687},
         {latitude:40.6619,longitude:-73.7598},
         {latitude:40.6466,longitude:-73.7508},
         {latitude:40.6299,longitude:-73.7409},
         {latitude:40.6192,longitude:-73.7343},
         {latitude:40.5989,longitude:-73.7222},
         {latitude:40.5815,longitude:-73.7122},
         {latitude:40.5624,longitude:-73.7015},
         {latitude:40.5449,longitude:-73.6921},
         {latitude:40.5314,longitude:-73.688},
         {latitude:40.5174,longitude:-73.6865},
         {latitude:40.5089,longitude:-73.6859},
         {latitude:40.5004,longitude:-73.6854},
         {latitude:40.4935,longitude:-73.6851},
         {latitude:40.478,longitude:-73.6847},
         {latitude:40.4659,longitude:-73.6845},
         {latitude:40.4479,longitude:-73.6844},
         {latitude:40.4204,longitude:-73.6852},
         {latitude:40.4044,longitude:-73.6931},
         {latitude:40.3967,longitude:-73.7018},
         {latitude:40.3879,longitude:-73.7203},
         {latitude:40.3831,longitude:-73.7346},
         {latitude:40.3802,longitude:-73.7438},
         {latitude:40.3769,longitude:-73.7537},
         {latitude:40.3728,longitude:-73.7668},
         {latitude:40.3708,longitude:-73.7772},
         {latitude:40.3702,longitude:-73.7867},
         {latitude:40.3719,longitude:-73.8183},
         {latitude:40.3724,longitude:-73.8248},
         {latitude:40.3737,longitude:-73.8427},
         {latitude:40.3746,longitude:-73.8525},
         {latitude:40.3764,longitude:-73.8631},
         {latitude:40.3787,longitude:-73.8703},
         {latitude:40.3847,longitude:-73.8832},
         {latitude:40.3893,longitude:-73.8922},
         {latitude:40.3947,longitude:-73.9023},
         {latitude:40.3994,longitude:-73.9112},
         {latitude:40.4037,longitude:-73.9192},
         {latitude:40.4075,longitude:-73.9265},
         {latitude:40.4105,longitude:-73.9324},
         {latitude:40.4166,longitude:-73.9441},
         {latitude:40.4204,longitude:-73.9515},
         {latitude:40.424,longitude:-73.9582},
         {latitude:40.4269,longitude:-73.9639},
         {latitude:40.4302,longitude:-73.9701},
         {latitude:40.4344,longitude:-73.9781},
         {latitude:40.4388,longitude:-73.9846},
         {latitude:40.4431,longitude:-73.9891},
         {latitude:40.4473,longitude:-73.9927},
         {latitude:40.4539,longitude:-73.9979},
         {latitude:40.4609,longitude:-74.0009},
         {latitude:40.4823,longitude:-73.9965},
         {latitude:40.4856,longitude:-73.9949},
         {latitude:40.4955,longitude:-73.9885},
         {latitude:40.5003,longitude:-73.9851},
         {latitude:40.5066,longitude:-73.9803},
         {latitude:40.5096,longitude:-73.9778},
         {latitude:40.5144,longitude:-73.9741},
         {latitude:40.5187,longitude:-73.9706},
         {latitude:40.5236,longitude:-73.9667},
         {latitude:40.5279,longitude:-73.9632},
         {latitude:40.5322,longitude:-73.9596},
         {latitude:40.5357,longitude:-73.9568},
         {latitude:40.5402,longitude:-73.9533},
         {latitude:40.5462,longitude:-73.9484},
         {latitude:40.5499,longitude:-73.9456},
         {latitude:40.5535,longitude:-73.9426},
         {latitude:40.5569,longitude:-73.9397},
         {latitude:40.5606,longitude:-73.9367},
         {latitude:40.5633,longitude:-73.9344},
         {latitude:40.5668,longitude:-73.9316},
         {latitude:40.5698,longitude:-73.9291},
         {latitude:40.5732,longitude:-73.9263},
         {latitude:40.5767,longitude:-73.9236},
         {latitude:40.5794,longitude:-73.9213},
         {latitude:40.5826,longitude:-73.9186},
         {latitude:40.5862,longitude:-73.9157},
         {latitude:40.5901,longitude:-73.9126},
         {latitude:40.593,longitude:-73.9102},
         {latitude:40.5963,longitude:-73.9075},
         {latitude:40.6004,longitude:-73.9041},
         {latitude:40.6039,longitude:-73.9013},
         {latitude:40.6072,longitude:-73.8986},
         {latitude:40.6107,longitude:-73.8957},
         {latitude:40.6146,longitude:-73.8927},
         {latitude:40.6182,longitude:-73.89},
         {latitude:40.6216,longitude:-73.8874},
         {latitude:40.6273,longitude:-73.8832},
         {latitude:40.6307,longitude:-73.8806},
         {latitude:40.6334,longitude:-73.8785},
         {latitude:40.6373,longitude:-73.8755},
         {latitude:40.6408,longitude:-73.8728},
         {latitude:40.644,longitude:-73.8702},
         {latitude:40.6469,longitude:-73.868},
         {latitude:40.6504,longitude:-73.8649},
         {latitude:40.6535,longitude:-73.8614},
         {latitude:40.6558,longitude:-73.8585},
         {latitude:40.6582,longitude:-73.855},
         {latitude:40.6611,longitude:-73.8505},
         {latitude:40.6642,longitude:-73.8441},
         {latitude:40.6657,longitude:-73.8388},
         {latitude:40.6662,longitude:-73.8318},
         {latitude:40.6654,longitude:-73.8176},
         {latitude:40.6647,longitude:-73.8111},
         {latitude:40.6619,longitude:-73.7999},
         {latitude:40.6607,longitude:-73.7969},
         {latitude:40.6584,longitude:-73.7917},
         {latitude:40.6558,longitude:-73.7859},
         {latitude:40.6527,longitude:-73.779},
         {latitude:40.6511,longitude:-73.7755},
         {latitude:40.6502,longitude:-73.7735},
         {latitude:40.6496,longitude:-73.7722},
         {latitude:40.6492,longitude:-73.7714},
         {latitude:40.6488,longitude:-73.7708},
         {latitude:40.6483,longitude:-73.7708},
         {latitude:40.6481,longitude:-73.7711},
         {latitude:40.648,longitude:-73.7714},
         {latitude:40.6482,longitude:-73.7721},
         {latitude:40.6484,longitude:-73.7725},
         {latitude:40.6486,longitude:-73.7729},
         {latitude:40.6489,longitude:-73.7735},
         {latitude:40.6492,longitude:-73.774},
         {latitude:40.6494,longitude:-73.7747},
         {latitude:40.6496,longitude:-73.7751},
         {latitude:40.65,longitude:-73.7758},
         {latitude:40.6506,longitude:-73.7772},
         {latitude:40.6509,longitude:-73.7779},
         {latitude:40.6514,longitude:-73.779},
         {latitude:40.6516,longitude:-73.7796},
         {latitude:40.6522,longitude:-73.7807},
         {latitude:40.6524,longitude:-73.7813},
         {latitude:40.653,longitude:-73.7826},
         {latitude:40.6532,longitude:-73.783},
         {latitude:40.6535,longitude:-73.7836},
         {latitude:40.6536,longitude:-73.7841},
         {latitude:40.6535,longitude:-73.7847},
         {latitude:40.6534,longitude:-73.7851},
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

  $scope.addFinalPoint = function() {
//    point = {
//  lat: 40.6523,
//  lng: -73.7935,
//  rotation: 45
//  };
    var map = new google.maps.Map(document.getElementById('map'), {
      });
    var marker = new google.maps.Marker({

        idKey:8,
        coords: {
                latitude: 40.6523,
                longitude: -73.7935
              },
        options: {
          icon:
            {
//               path: 'M 194.67321,2.8421709e-14 L 70.641958,53.625 C 60.259688,46.70393 36.441378,32.34961 31.736508,30.17602 C -7.7035221,11.95523 -5.2088921,44.90709 11.387258,54.78122 C 15.926428,57.48187 39.110778,71.95945 54.860708,81.15624 L 72.766958,215.09374 L 94.985708,228.24999 L 106.51696,107.31249 L 178.04821,143.99999 L 181.89196,183.21874 L 196.42321,191.84374 L 207.51696,149.43749 L 207.64196,149.49999 L 238.45446,117.96874 L 223.57946,109.96874 L 187.95446,126.87499 L 119.67321,84.43749 L 217.36071,12.25 L 194.67321,2.8421709e-14 z',
               path: 'M 256.123,219.001 C 256.123,219.001 256.506,220.656 256.463,222.397 C 256.422,224.103 255.953,227.831 255.953,226.982 C 255.953,226.133 254.426,225.072 254.426,225.072 L 254.213,226.557 L 253.025,226.6 L 252.983,224.222 L 216.942,207.879 C 216.942,207.879 216.9,205.841 216.73,205.799 C 216.688,207.836 216.815,209.195 216.56,209.364 C 216.221,209.237 176.673,191.676 175.808,191.195 C 175.426,190.983 175.638,189.243 175.638,189.243 L 165.45,187.715 L 165.408,189.073 C 165.408,189.073 143.97,186.059 143.376,186.441 C 142.782,186.823 143.929,209.874 142.909,225.496 C 141.89,241.117 140.15,249.522 139.386,252.536 C 138.673,255.349 139.259,255.974 140.617,257.163 C 141.975,258.352 169.27,278.559 171.563,280.299 C 173.814,282.008 173.856,282.789 173.856,283.822 C 173.856,285.18 173.898,294.137 173.898,294.137 L 135.905,284.883 C 135.905,284.883 135.692,288.66 135.141,289.212 C 134.588,289.765 133.443,289.552 133.443,289.552 C 133.443,289.552 132.678,297.406 132.255,297.915 C 131.83,298.424 131.109,298.679 131.109,298.679 C 131.109,298.679 129.415,306.778 128.636,306.99 C 128.636,306.993 128.636,306.998 128.636,307 C 128.63,307 128.624,306.996 128.62,306.995 C 128.614,306.996 128.608,307 128.604,307 C 128.604,306.998 128.604,306.993 128.604,306.99 C 127.825,306.778 126.13,298.679 126.13,298.679 C 126.13,298.679 125.408,298.424 124.984,297.915 C 124.56,297.405 123.796,289.552 123.796,289.552 C 123.796,289.552 122.65,289.765 122.098,289.212 C 121.546,288.66 121.334,284.883 121.334,284.883 L 83.341,294.137 C 83.341,294.137 83.383,285.18 83.383,283.822 C 83.383,282.789 83.425,282.008 85.675,280.299 C 87.967,278.559 115.263,258.352 116.621,257.163 C 117.979,255.974 118.565,255.349 117.852,252.536 C 117.088,249.522 115.348,241.117 114.329,225.496 C 113.31,209.874 114.456,186.823 113.862,186.441 C 113.268,186.059 91.83,189.073 91.83,189.073 L 91.788,187.715 L 81.6,189.243 C 81.6,189.243 81.812,190.983 81.43,191.195 C 80.565,191.676 41.017,209.237 40.678,209.364 C 40.423,209.194 40.551,207.836 40.508,205.799 C 40.338,205.841 40.296,207.879 40.296,207.879 L 4.254,224.222 L 4.212,226.6 L 3.024,226.557 L 2.812,225.072 C 2.812,225.072 1.284,226.134 1.284,226.982 C 1.284,227.83 0.816,224.103 0.775,222.397 C 0.733,220.657 1.115,219.001 1.115,219.001 C 1.115,219.001 -0.116,219.383 0.011,217.77 C 0.093,216.741 3.28,212.04 3.28,212.04 C 3.28,212.04 3.506,211.335 3.467,210.837 C 3.422,210.258 4.128,209.885 4.501,209.554 C 4.717,209.363 4.478,208.313 4.478,208.313 C 4.478,208.313 16.421,198.072 37.114,182.028 C 57.773,166.01 82.224,146.37 82.224,146.37 C 82.224,146.37 82.224,145.238 81.998,143.653 C 81.771,142.069 81.602,141.389 81.602,141.389 C 81.602,141.389 80.357,140.993 80.017,139.974 C 79.764,139.214 79.112,133.691 79.225,128.71 C 79.338,123.729 79.621,121.126 79.961,120.333 C 80.3,119.541 81.448,119.19 82.904,118.975 C 84.432,118.749 90.362,118.889 91.79,119.088 C 93.146,119.277 93.998,119.484 94.224,121.409 C 94.45,123.333 94.507,129.955 94.337,132.672 C 94.216,134.606 93.714,136.804 93.997,136.917 C 94.28,137.03 99.204,132.219 101.921,130.295 C 104.638,128.37 109.279,124.352 109.845,123.107 C 110.411,121.862 110.468,121.692 110.807,122.824 C 111.146,123.956 111.09,125.088 110.637,125.88 C 110.184,126.672 109.958,127.692 110.41,128.144 C 110.58,128.314 111.938,127.182 112.278,126.502 C 112.618,125.823 112.278,124.521 112.505,123.955 C 112.732,123.389 113.618,121.747 113.58,120.389 C 113.354,112.295 113.079,100.183 113.014,73.694 C 112.945,45.348 113.226,36.88 116.806,21.735 C 120.056,7.987 122.498,5.268 123.748,3.285 C 124.904,1.452 127.513,0.028 128.605,0.003 C 128.605,0.003 128.605,0.001 128.605,0.001 C 128.609,0.001 128.615,0.002 128.621,0.002 C 128.625,0.002 128.631,0.001 128.637,0.001 C 128.637,0.001 128.637,0.003 128.637,0.003 C 129.728,0.028 132.336,1.453 133.492,3.285 C 134.742,5.267 137.183,7.987 140.434,21.735 C 144.014,36.88 144.295,45.348 144.226,73.694 C 144.162,100.183 143.886,112.296 143.66,120.389 C 143.623,121.747 144.51,123.389 144.736,123.955 C 144.962,124.521 144.623,125.823 144.963,126.502 C 145.302,127.181 146.66,128.314 146.83,128.144 C 147.283,127.691 147.057,126.672 146.603,125.88 C 146.149,125.088 146.093,123.956 146.433,122.824 C 146.773,121.692 146.829,121.862 147.396,123.107 C 147.961,124.352 152.603,128.371 155.32,130.295 C 158.037,132.219 162.961,137.03 163.244,136.917 C 163.527,136.804 163.025,134.606 162.904,132.672 C 162.734,129.955 162.791,123.333 163.017,121.409 C 163.243,119.485 164.095,119.278 165.451,119.088 C 166.88,118.888 172.809,118.749 174.338,118.975 C 175.793,119.191 176.942,119.541 177.281,120.333 C 177.621,121.125 177.904,123.729 178.017,128.71 C 178.129,133.691 177.477,139.214 177.224,139.974 C 176.884,140.993 175.639,141.389 175.639,141.389 C 175.639,141.389 175.469,142.068 175.243,143.653 C 175.016,145.238 175.016,146.37 175.016,146.37 C 175.016,146.37 199.467,166.011 220.125,182.028 C 240.818,198.072 252.762,208.313 252.762,208.313 C 252.762,208.313 252.522,209.363 252.739,209.554 C 253.112,209.885 253.818,210.258 253.772,210.837 C 253.733,211.335 253.959,212.04 253.959,212.04 C 253.959,212.04 257.147,216.741 257.229,217.77 C 257.354,219.383 256.123,219.001 256.123,219.001 z M 8.536,207.093 L 6.143,208.927 L 6.35,209.197 L 8.764,207.347 L 8.536,207.093 z M 13.335,203.415 L 8.806,206.886 L 9.033,207.14 L 13.543,203.683 L 13.335,203.415 z M 18.144,199.729 L 13.605,203.208 L 13.813,203.477 L 18.324,200.02 L 18.144,199.729 z M 24.203,195.086 L 18.415,199.522 L 18.595,199.813 L 24.403,195.361 L 24.203,195.086 z M 29.79,190.805 L 24.472,194.879 L 24.672,195.154 L 29.995,191.074 L 29.79,190.805 z M 35.438,186.477 L 30.06,190.598 L 30.266,190.869 L 35.634,186.755 L 35.438,186.477 z M 41.278,182 L 35.707,186.27 L 35.903,186.547 L 41.51,182.25 L 41.278,182 z M 47.172,177.483 L 41.549,181.793 L 41.78,182.043 L 47.365,177.763 L 47.172,177.483 z M 53.017,173.004 L 47.442,177.276 L 47.635,177.556 L 53.191,173.297 L 53.017,173.004 z M 58.819,168.557 L 53.288,172.795 L 53.462,173.09 L 59.013,168.836 L 58.819,168.557 z M 64.397,164.283 L 59.089,168.349 L 59.283,168.628 L 64.6,164.554 L 64.397,164.283 z M 69.969,160.013 L 64.667,164.076 L 64.871,164.347 L 70.144,160.306 L 69.969,160.013 z M 76.534,154.98 L 70.24,159.804 L 70.415,160.098 L 76.68,155.297 L 76.534,154.98 z M 78.251,153.665 L 76.811,154.769 L 76.956,155.085 L 78.385,153.989 L 78.251,153.665 z M 83.629,149.544 L 78.531,153.451 L 78.665,153.776 L 83.836,149.813 L 83.629,149.544 z M 173.607,149.544 L 173.4,149.814 L 178.572,153.777 L 178.705,153.452 L 173.607,149.544 z M 178.984,153.665 L 178.851,153.99 L 180.281,155.086 L 180.426,154.77 L 178.984,153.665 z M 180.702,154.98 L 180.556,155.297 L 186.822,160.098 L 186.996,159.804 L 180.702,154.98 z M 187.267,160.013 L 187.092,160.307 L 192.365,164.348 L 192.569,164.077 L 187.267,160.013 z M 192.839,164.283 L 192.635,164.554 L 197.952,168.628 L 198.145,168.349 L 192.839,164.283 z M 198.417,168.557 L 198.223,168.836 L 203.774,173.09 L 203.948,172.795 L 198.417,168.557 z M 204.218,173.004 L 204.044,173.298 L 209.601,177.557 L 209.794,177.277 L 204.218,173.004 z M 210.064,177.483 L 209.871,177.762 L 215.455,182.042 L 215.687,181.792 L 210.064,177.483 z M 215.958,182 L 215.727,182.25 L 221.334,186.547 L 221.529,186.27 L 215.958,182 z M 221.798,186.477 L 221.603,186.754 L 226.971,190.868 L 227.176,190.597 L 221.798,186.477 z M 227.446,190.805 L 227.241,191.075 L 232.564,195.155 L 232.763,194.88 L 227.446,190.805 z M 233.033,195.086 L 232.834,195.36 L 238.643,199.812 L 238.823,199.521 L 233.033,195.086 z M 239.092,199.729 L 238.912,200.019 L 243.423,203.476 L 243.631,203.207 L 239.092,199.729 z M 243.901,203.415 L 243.693,203.683 L 248.203,207.14 L 248.431,206.886 L 243.901,203.415 z M 248.701,207.093 L 248.473,207.347 L 250.887,209.197 L 251.093,208.927 L 248.701,207.093 z',
               fillColor: 'yellow',
               fillOpacity: 0.8,
               strokeColor: 'gold',
               strokeWeight: 14,
               scale: 0.1,
               rotation: 45
            }
          },
        map: map
      });
//var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
//var mapOptions = {
//  zoom: 4,
//  center: myLatlng
//}
//var map = new google.maps.Map(document.getElementById("map"), mapOptions);

//// Place a draggable marker on the map
//var marker = new google.maps.Marker({
//    position: myLatlng,
//    map: map,
//    draggable:true,
//    title:"Drag me!"
//});
    return "adas";
  };


    $scope.flights =
    [
       {
         "flightID":"pepe",
         "path":[
            {
               "timestamp":1444060842000,
               "modelId":"AA2",
               "anomalyScore":1,
               "latitude":37.9384,
               "longitude":-118.403
            },
            {
               "timestamp":1444060842000,
               "modelId":"AA2",
               "anomalyScore":1,
               "latitude":33.9384,
               "longitude":-112.403
            }
         ]
      },
       {
         "flightID":"pepe2",
         "path":[
            {
               "timestamp":1444060842000,
               "modelId":"AA2",
               "anomalyScore":1,
               "latitude":31.9384,
               "longitude":-110.403
            },
            {
               "timestamp":1444060842000,
               "modelId":"AA2",
               "anomalyScore":1,
               "latitude":41.9384,
               "longitude":-108.403
            }
         ]
      }
    ];

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
      });
      // Get the first one
      if(data.lenght > 0) {
        $scope.getFlightData(data[0].flightData.modelId);
      }
    });
  };

  $scope.flightData = {};

  $scope.getFlightData = function(id) {
    var promise = pageFunctions.getFlightData({"flight": id});
    promise.then(function(data) {
      $scope.$apply(function() {
        $scope.flightData = data.flights;
      });
    });
  };

  $scope.getFlights();
});