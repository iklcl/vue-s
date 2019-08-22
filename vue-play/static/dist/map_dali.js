let bounds = [
	[110.490727, 20.420933], // Southwest coordinates
	[119.742071, 27.113881] // Northeast coordinates
];
let daliBound = [
	[99,25],
	[101.5,26.5]
]
var wyhCenter= [114.976529,23.889782];
var daliCenter= [100.2068775,25.7470085];
var chinaCenter = [109.248,32.34];
var daliCityCenter = [100.239051,25.595759];
arrLand = [311,411,506,602,604,702,704];
arrOrderID3 = [301,304,305,306,307,311,320];
arrOrderID4 = [401,404,405,407,408,411];
arrOrderID5 = [501,505,506];
arrOrderID6 = [601,602,603,604];
arrOrderID7 = [701,702,703,704];
arrDaliBGDOrderid = [102,103,111,112,113,114,115,116,117,119,120,121,122,123,124,126];//127桥梁面
arrDaliBGDColor = ['RGB(242,239,232)','RGB(242,239,232)','RGB(0,169,230)','RGB(0,169,230)','RGB(167,219,154)','RGB(167,219,154)','RGB(167,219,154)',
                    'RGB(132,37,42)','RGB(167,219,154)','RGB(219,213,199)','RGB(150,204,122)','RGB(219,213,199)','RGB(219,213,199)','RGB(247,247,242)',
                    'RGB(219,213,199)','RGB(0,169,230)'];
					// RGB(244,242,238)
arrRoadLevel = [4,6,7,8,9,10,11,12,13,14,15,16,17];
arrTextLevel = [[18,20],[17.5,20],[17,20],[17,20],[16,17],[15,16],[13,15]];

function getRootPath() {

			    var pathName = window.location.pathname.substring(1);

			    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));

			    return window.location.protocol + '//' + window.location.host  + '/';

}
testCenter = [114.017529068038, 22.5397032116539];

var map = new mapboxgl.Map({
	// attributionControl: true,
	container: 'map',
	// center: [114.15316467, 22.67357826],
    center:daliCityCenter,
    pitch:0,
    // pitchWithRotate:false,
    // dragRotate:false,
//	center:wyhCenter,
	zoom: 14,
	maxBounds: daliBound,
	// fadeDuration:2000,
	minZoom: 2,
	maxZoom: 19,
	// style:daliStyle
	//scrollZoom:false,
	//doubleClickZoom:false,
	style: {
		"version": 8,
		"glyphs": 'mapboxZITI/{fontstack}/{range}.pbf',
		"sources": {
			"raster": {
				"type": "raster",

				"tiles": [
					"http://192.168.82.38:8080/geoserver/water/wms?bbox={bbox-epsg-3857}&styles=&transparent=true&format=image/png&" +
					"service=WMS&version=1.1.1&request=GetMap&srs=EPSG:900913&width=256&height=256&layers=water:dali_resize_4_cj"
				],
			}
		},
		"layers": [
			{
				"id": "background",
				"type": "background",
				"paint": {
					"background-color": 'RGB(37,75,111)',
				}
			},
			{
				'id':'dali_resize',
				'type':'raster',
				'source':'raster',
				'layout':{
					'visibility':'none'
				},
			}
		]
	},
});
map.on('load', function () {
	map.addSource('dali_cj',{
		'type':'raster',
		'tiles':[
			"http://192.168.82.38:8080/geoserver/water/wms?bbox={bbox-epsg-3857}&styles=&transparent=true&format=image/png&" +
			"service=WMS&version=1.1.1&request=GetMap&srs=EPSG:900913&width=256&height=256&layers=water:dali_cj"
		],
		'tilesize':256
	});
	map.addLayer({
		'id':'dali_cj',
		'type':'raster',
		'source':'dali_cj',
		'layout':{
			'visibility':'none'
		}
	});
    map.addSource('dali_vector', {
        'type': 'vector',
        // 'scheme': 'tms',
        'tiles': [
            'http://192.168.82.38:8765/data/dali_water/{z}/{x}/{y}.pbf'
			// 'http://192.168.82.38:8080/geoserver/gwc/service/tms/1.0.0/water%3Awater_dali@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf',
			// 'http://localhost:8070/geoserver/gwc/service/tms/1.0.0/water%3Awater0610@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
			]
    });
	map.addSource('dali_vector2', {
		'type': 'vector',
		// 'scheme': 'tms',
		'tiles': [
			'http://192.168.82.38:8764/data/text/{z}/{x}/{y}.pbf'
			// 'http://192.168.82.38:8080/geoserver/gwc/service/tms/1.0.0/water%3Awater_dali@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf',
			// 'http://localhost:8070/geoserver/gwc/service/tms/1.0.0/water%3Awater0610@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
			]
	});
	map.addLayer({
		'id':'district_dali',
		'type':'fill',
		'source':'dali_vector',
		'source-layer':'district_dali',
//		'maxzoom':6.5,
		'paint':{
			'fill-color':'RGB(146,175,202)',
		},
		'layout':{
			'visibility':'visible'
		}
	});
    for(var i = 0;i<arrDaliBGDOrderid.length;i++)
    {
        map.addLayer({
            'id':'bgd'+arrDaliBGDOrderid[i].toString(),
            'type':'fill',
            'source':'dali_vector',
            'source-layer':'bgd',
            "filter":["==","orderid",arrDaliBGDOrderid[i]],
            "minzoom": 8,
            'paint':{
                'fill-color':arrDaliBGDColor[i],
            },
            'layout':{
                // 'visibility':'none'
            }
        });
    }
	
// 	map.addLayer({
// 		'id':'bgd_all',
// 		'type':'fill',
// 		'source':'dali_vector',
// 		'source-layer':'bgd',
// 		// "filter":["==","orderid",arrDaliBGDOrderid[i]],
// 		"minzoom": 8,
// 		'paint':{
// 			// 102,103,111,112,113,114
// 			'fill-color': [
// 			'match',
// 			['get', 'orderid'],
// 			arrDaliBGDOrderid[0], arrDaliBGDColor[0],
// 			arrDaliBGDOrderid[1], arrDaliBGDColor[1],
// 			arrDaliBGDOrderid[2], arrDaliBGDColor[2],
// 			arrDaliBGDOrderid[3], arrDaliBGDColor[3],
// 			arrDaliBGDOrderid[4], arrDaliBGDColor[4],
// 			arrDaliBGDOrderid[5], arrDaliBGDColor[5],
// 			arrDaliBGDOrderid[6], arrDaliBGDColor[6],
// 			arrDaliBGDOrderid[7], arrDaliBGDColor[7],
// 			arrDaliBGDOrderid[8], arrDaliBGDColor[8],
// 			arrDaliBGDOrderid[9], arrDaliBGDColor[9],
// 			arrDaliBGDOrderid[10], arrDaliBGDColor[10],
// 			arrDaliBGDOrderid[11], arrDaliBGDColor[11],
// 			arrDaliBGDOrderid[12], arrDaliBGDColor[12],
// 			arrDaliBGDOrderid[13], arrDaliBGDColor[13],
// 			arrDaliBGDOrderid[14], arrDaliBGDColor[14],
// 			arrDaliBGDOrderid[15], arrDaliBGDColor[15],
// 			/* other */ 'RGB(184,223,171)'
// 			]
// 		},
// 		'layout':{
// 			// 'visibility':'none'
// 		}
// 	})
	
// 	map.addLayer({
// 		'id':'bgd_all',
// 		'type':'fill',
// 		'source':'dali_vector',
// 		'source-layer':'bgd',
// 		// "filter":["==","orderid",arrDaliBGDOrderid[i]],
// 		"minzoom": 8,
// 		'paint':{
// 			// 102,103,111,112,113,114
// 			'fill-color': [
// 			'match',
// 			['get', 'orderid'],
// 			arrDaliBGDOrderid[15], arrDaliBGDColor[15],
// 			arrDaliBGDOrderid[14], arrDaliBGDColor[14],
// 			arrDaliBGDOrderid[13], arrDaliBGDColor[13],
// 			arrDaliBGDOrderid[12], arrDaliBGDColor[12],
// 			arrDaliBGDOrderid[11], arrDaliBGDColor[11],
// 			arrDaliBGDOrderid[10], arrDaliBGDColor[10],
// 			arrDaliBGDOrderid[9], arrDaliBGDColor[9],
// 			arrDaliBGDOrderid[8], arrDaliBGDColor[8],
// 			arrDaliBGDOrderid[7], arrDaliBGDColor[7],
// 			arrDaliBGDOrderid[6], arrDaliBGDColor[6],
// 			arrDaliBGDOrderid[5], arrDaliBGDColor[5],
// 			arrDaliBGDOrderid[4], arrDaliBGDColor[4],
// 			arrDaliBGDOrderid[3], arrDaliBGDColor[3],
// 			arrDaliBGDOrderid[2], arrDaliBGDColor[2],
// 			arrDaliBGDOrderid[1], arrDaliBGDColor[1],
// 			arrDaliBGDOrderid[0], arrDaliBGDColor[0],
// 			/* other */ 'RGB(184,223,171)'
// 			]
// 		},
// 		'layout':{
// 			// 'visibility':'none'
// 		}
// 	})
// 	map.addLayer({
// 		'id':'bgd_water',
// 		'type':'fill',
// 		'source':'dali_vector',
// 		'source-layer':'bgd',
// 		"filter":["in","orderid",111,112],
// 		'paint':{
// 			'fill-color':"RGB(0,169,230)",
// 		},
// 		'layout':{
// 			'visibility':'none'
// 		}
// 	})
// 	map.addLayer({
// 		'id':'bgd_island',
// 		'type':'fill',
// 		'source':'dali_vector',
// 		'source-layer':'bgd',
// 		"filter":["==","orderid",119],
// 		'paint':{
// 			'fill-color':"RGB(247,247,242)",
// 		},
// 		'layout':{
// 			'visibility':'none'
// 		}
// 	})
//     for (var i = 0;i<arrOrderID5.length;i++)
// 	{
// 	    if (arrLand.indexOf(arrOrderID5[i])>-1)
// 	    {
// 	        map.addLayer({
//                 'id':'land'+arrOrderID5[i].toString(),
//                 'type':'fill',
//                 'source':'dali_vector',
//                 'source-layer':'bgd_100w_water',
//                 "filter":[
//                     "all",
//                     ["==","levelid",5],
//                     ["==","orderid",arrOrderID5[i]]
//                 ],
//                 "minzoom": 12,
//                 "maxzoom":14,
//                 'paint':{
//                     'fill-color':'RGB(245,244,250)',
//                 },
//                 'layout':{
//                     'visibility':'visible'
//                 }
//             });
// 	    }
// 	    else
// 	    {
// 	        map.addLayer({
//                 'id':'water'+arrOrderID5[i].toString(),
//                 'type':'fill',
//                 'source':'dali_vector',
//                 'source-layer':'bgd_100w_water',
//                 "filter":[
//                     "all",
//                     ["==","levelid",5],
//                     ["==","orderid",arrOrderID5[i]]
//                 ],
//                 "minzoom": 12,
//                 "maxzoom":14,
//                 'paint':{
//                     'fill-color':'RGB(0,169,230)',
//                 },
//                 'layout':{
//                     'visibility':'visible'
//                 }
//             });
// 	    }
// 	}
// 	for (var i = 0;i<arrOrderID6.length;i++)
// 	{
// 	    if (arrLand.indexOf(arrOrderID6[i])>-1)
// 	    {
// 	        map.addLayer({
//                 'id':'land'+arrOrderID6[i].toString(),
//                 'type':'fill',
//                 'source':'dali_vector',
//                 'source-layer':'bgd_100w_water',
//                 "filter":[
//                     "all",
//                     ["==","levelid",6],
//                     ["==","orderid",arrOrderID6[i]]
//                 ],
//                 "minzoom": 7,
//                 "maxzoom":12,
//                 'paint':{
//                     'fill-color':'RGB(245,244,250)',
//                 },
//                 'layout':{
//                     'visibility':'visible'
//                 }
//             });
// 	    }
// 	    else
// 	    {
// 	        map.addLayer({
//                 'id':'water'+arrOrderID6[i].toString(),
//                 'type':'fill',
//                 'source':'dali_vector',
//                 'source-layer':'bgd_100w_water',
//                 "filter":[
//                     "all",
//                     ["==","levelid",6],
//                     ["==","orderid",arrOrderID6[i]]
//                 ],
//                 "minzoom": 7,
//                 "maxzoom":12,
//                 'paint':{
//                     'fill-color':'RGB(0,169,230)',
//                 },
//                 'layout':{
//                     'visibility':'visible'
//                 }
//             });
// 	    }
// 	}
// 	for (var i = 0;i<arrOrderID7.length;i++)
// 	{
// 	    if (arrLand.indexOf(arrOrderID7[i])>-1)
// 	    {
// 	        map.addLayer({
//                 'id':'land'+arrOrderID7[i].toString(),
//                 'type':'fill',
//                 'source':'dali_vector',
//                 'source-layer':'bgd_100w_water',
//                 "filter":[
//                     "all",
//                     ["==","levelid",7],
//                     ["==","orderid",arrOrderID7[i]]
//                 ],
//                 "minzoom": 2,
//                 "maxzoom":7,
//                 'paint':{
//                     'fill-color':'RGB(245,244,250)',
//                 },
//                 'layout':{
//                     'visibility':'visible'
//                 }
//             });
// 	    }
// 	    else
// 	    {
// 	        map.addLayer({
//                 'id':'water'+arrOrderID7[i].toString(),
//                 'type':'fill',
//                 'source':'dali_vector',
//                 'source-layer':'bgd_100w_water',
//                 "filter":[
//                     "all",
//                     ["==","levelid",7],
//                     ["==","orderid",arrOrderID7[i]]
//                 ],
//                 "minzoom": 2,
//                 "maxzoom":7,
//                 'paint':{
//                     'fill-color':'RGB(0,169,230)',
//                 },
//                 'layout':{
//                     'visibility':'visible'
//                 }
//             });
// 	    }
// 	}
	for(var i = 0;i<arrRoadLevel.length;i++)
	{
	    map.addLayer({
                'id':'road'+i.toString(),
                'type':'line',
                'source':'dali_vector',
                'source-layer':'road',
                "filter":["==","showgrade",i+1],
                "minzoom": arrRoadLevel[i],
                'paint':{
                    'line-color':'RGB(230,192,149)',
                    'line-width':{
					    'stops':[[12,2.2],[22,14]]
				    }
                },
                'layout':{
                    'visibility':'visible'
                }
        });
	}
	for(var i = 0;i<arrRoadLevel.length;i++)
	{
	    map.addLayer({
                'id':'road_'+i.toString(),
                'type':'line',
                'source':'dali_vector',
                'source-layer':'road',
                "filter":["==","showgrade",i+1],
                "minzoom": arrRoadLevel[i],
                'paint':{
                    'line-color':'RGB(255,213,85)',
                    'line-width':{
					    'stops':[[12,2],[22,13]]
				    }
                },
                'layout':{
                    'visibility':'visible'
                }
        });
	}
	
// 	map.addLayer({
// 			'id':'road_all_',
// 			'type':'line',
// 			'source':'dali_vector',
// 			'source-layer':'road',
// 			// "filter":["==","showgrade",i+1],
// 			'minzoom': [
// 				'match',
// 				['get', 'showgrade'],
// 				1, 3,
// 				2, 4,
// 				3, 5,
// 				4, 6,
// 				/* other */ 7
// 			],
// 			'paint':{
// 				'line-color':'RGB(255,213,85)',
// 				'line-width':{
// 					'stops':[[12,2.2],[22,14]]
// 				}
// 			},
// 			'layout':{
// 				'visibility':'visible'
// 			}
// 	});
// 	map.addLayer({
// 			'id':'road_all',
// 			'type':'line',
// 			'source':'dali_vector',
// 			'source-layer':'road',
// 			// "filter":["==","showgrade",i+1],
// 			"minzoom": [
// 				'match',
// 				['get', 'showgrade'],
// 				1,arrRoadLevel[0],
// 				2,arrRoadLevel[1],
// 				3,arrRoadLevel[2],
// 				4,arrRoadLevel[3],
// 				5,arrRoadLevel[4],
// 				6,arrRoadLevel[5],
// 				7,arrRoadLevel[6],
// 				8,arrRoadLevel[7],
// 				9,arrRoadLevel[8],
// 				10,arrRoadLevel[9],
// 				11,arrRoadLevel[10],
// 				12,arrRoadLevel[11],
// 				13,arrRoadLevel[12],
// 				/* other */ 18
// 			],
// 			'paint':{
// 				'line-color':'RGB(255,213,85)',
// 				'line-width':{
// 					'stops':[[12,2],[22,13]]
// 				}
// 			},
// 			'layout':{
// 				'visibility':'visible'
// 			}
// 	});
// 	map.addLayer({
// 		'id': 'building',
// 		'source': 'dali_vector',
// 		'source-layer': 'building',
// 		'type': 'fill',
// 		'minzoom': 12,
// 		'paint': {
// 			'fill-color':'RGB(182,183,187)'
// 		},
// 		'layout':{
// 			'visibility':'visible'//visible
// 		},
// 		"interactive": true
// 	})
	map.addLayer({
		'id': 'building_ex',
		'source': 'dali_vector',
		'source-layer': 'building',
		'type': 'fill-extrusion',
		'minzoom': 15.5,
		'paint': {
			"fill-extrusion-color": 'RGB(182,183,187)',
			'fill-extrusion-height': ['get', 'height'],
			'fill-extrusion-opacity': {
				"stops": [[15.5, 0], [16, 1]],
			},
		},
		'layout':{
			'visibility':'visible'//visible
		},
		"interactive": true
	})
	for(var i =0;i<arrTextLevel.length;i++)
	{
		map.addLayer({
			'id':'text'+i.toString(),
			'source':'dali_vector2',
			'source-layer':'text',
			'type':'symbol',
			'minzoom':arrTextLevel[i][0],
			'maxzoom':arrTextLevel[i][1],
			'filter':['==','levelid',i],
			'layout':{
				// 'symbol-placement':"line",
				'text-field':"{stext}",
				'text-size':13,
				'text-font':['MicrosoftYaHeiRegular'],
				'text-anchor':'top'
			},
			'paint':{
				'text-color':'RGB(0,0,0)',
// 				'text-halo-color':'RGB(95,78,59)',
// 				'text-halo-width':1,
// 				'text-halo-blur':1,
			}
		})
	}





//	map.addSource("skimg", {
//	type: "image",
//	url: "/hbproject/image/shuiku_132.jpg",
//	coordinates: [
//	[114.334615718,23.9991899009],
//	[114.748875063, 23.9991899009],
//	[114.748875063, 23.6981045009],
//	[114.334615718, 23.6981045009]
//	]
//	});
//	map.addLayer({
//	    'id': "shuiku1",
//        "type": "raster",
//        "source": "skimg",
//        "minzoom": 7,
//        "paint": {
//            "raster-fade-duration": 0
//        },
//        'layout':{
//            'visibility':'none'
//        }
//	});

// 	map.addLayer({
// 		'id':'pointsymbol',
// 		'source':'CLDSource',
// 		'source-layer':'point',
// 		'type':'symbol',
// 		"minzoom": 7,
// 		"layout": {
// 			'text-field':"{name}",
// 			'text-size':{'stops':[[8,10],[18,18]]},
// 			'text-offset':[0,-1.7],
// 			'text-font':["MicrosoftYaHeiRegular"],
// 			'text-anchor':'top'
// 		},
// 		'paint': {
// 			'text-color':'rgb(0,0,0)',
// 			'text-halo-color':'rgb(0,0,0)',
// 			'text-halo-width':0.15,
// 			'text-halo-blur':0,
// 		},
// 	});
});
// //添加全国监测站数据源及图层
// map.on('load',function(){
//     map.addSource("RIMS",{
//         "type":"geojson",
// //        "buffer":0,
// //        "tolerance":0.375,//简化容限(更高意味着更简单的几何结构和更快的性能)。
//         "cluster":true,//聚类
//         "clusterRadius":15,
// //        "clusterMaxZoom":11,
//         //"clusterProperties": //根据属性聚类
//         "data":'json/allGeojson4.geojson'
//     });
//     map.loadImage("http://127.0.0.1:8848/hbproject/image/I.png",function(error,image){
//         if(error) throw error;
//         map.addImage('I',image);
//         map.addLayer({
//             'id':'rims_I',
//             'source':'RIMS',
//             'type':'symbol',
//             "filter":["==","phquality","I"],
//             "maxzoom":19,
//             "layout":{
//                 "icon-image":"I",
//                 "icon-anchor":"bottom",
//                 "icon-size":0.1,
//                 'icon-allow-overlap':true,
//                 'icon-ignore-placement':true,
//                 // 'icon-rotation-alignment':'map',
//                 // 'icon-pitch-alignment':"map",
//             }
//         })
//     });
//     map.loadImage("http://127.0.0.1:8848/hbproject/image/II.png",function(error,image){
//         if(error) throw error;
//         map.addImage('II',image);
//         map.addLayer({
//             'id':'rims_II',
//             'source':'RIMS',
//             'type':'symbol',
//             "filter":["==","phquality","II"],
//             "maxzoom":19,
//             "layout":{
//                 "icon-image":"II",
//                 "icon-size":0.3,
//                 "icon-anchor":"bottom",
//                 'icon-allow-overlap':true,
//                 'icon-ignore-placement':true,
//                 // 'icon-rotation-alignment':'map',
//                 // 'icon-pitch-alignment':"map",
//             }
//         })
//     });
//     map.loadImage("http://127.0.0.1:8848/hbproject/image/III.png",function(error,image){
//         if(error) throw error;
//         map.addImage('III',image);
//         map.addLayer({
//             'id':'rims_III',
//             'source':'RIMS',
//             'type':'symbol',
//             "filter":["==","phquality","III"],
//             "maxzoom":19,
//             "layout":{
//                 "icon-image":"III",
//                 "icon-size":0.3,
//                 "icon-anchor":"bottom",
//                 'icon-allow-overlap':true,
//                 'icon-ignore-placement':true,
//                 // 'icon-rotation-alignment':'map',
//                 // 'icon-pitch-alignment':"map",
//             }
//         })
//     });
//     map.loadImage("http://127.0.0.1:8848/hbproject/image/IV.png",function(error,image){
//         if(error) throw error;
//         map.addImage('IV',image);
//         map.addLayer({
//             'id':'rims_IV',
//             'source':'RIMS',
//             'type':'symbol',
//             "filter":["==","phquality","IV"],
//             "maxzoom":19,
//             "layout":{
//                 "icon-image":"IV",
//                 "icon-size":0.3,
//                 "icon-anchor":"bottom",
//                 'icon-allow-overlap':true,
//                 'icon-ignore-placement':true,
//                 // 'icon-rotation-alignment':'map',
//                 // 'icon-pitch-alignment':"map",
//             }
//         })
//     });
//     map.loadImage("http://127.0.0.1:8848/hbproject/image/V.png",function(error,image){
//         if(error) throw error;
//         map.addImage('V',image);
//         map.addLayer({
//             'id':'rims_V',
//             'source':'RIMS',
//             'type':'symbol',
//             "icon-anchor":"bottom",
//             "filter":["==","phquality","V"],
//             "maxzoom":19,
//             "layout":{
//                 "icon-image":"V",
//                 "icon-size":0.3,
//                 'icon-allow-overlap':true,
//                 'icon-ignore-placement':true,
//                 // 'icon-rotation-alignment':'map',
//                 // 'icon-pitch-alignment':"map",
//             }
//         })
//     });
// })
//添加比例尺
var scale = new mapboxgl.ScaleControl({
	maxWidth: 80,
	unit: 'imperial'
});
map.addControl(scale);
scale.setUnit('metric');
map.addControl(new mapboxgl.AttributionControl({
	compact: true
}));
