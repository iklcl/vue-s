//全屏按钮
// map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('body')}));
//导航控件
let navControl = new mapboxgl.NavigationControl({
		showZoom:false,
});
map.addControl(navControl);
// map.addControl(new mapboxgl.GeolocateControl({
// 	positionOptions: {
// 		enableHighAccuracy: true
// 	},
// 	trackUserLocation: true
// }));

let miniBound = [
	[99.976855,25.421976],
	[100.436900,26.072041]
]
let miniBound2 = [
	[99.8,25.3],
	[100.6,26.2]
]
let daliStyle = {
		"version": 8,
		// "glyphs": 'mapboxZITI/{fontstack}/{range}.pbf',
		"sources": {
			"dalimap": {
				'type': 'vector',
				'scheme': 'tms',
				'tiles': [
					'http://192.168.82.38:8080/geoserver/gwc/service/tms/1.0.0/water%3Awater_dali@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf',
					// 'http://localhost:8070/geoserver/gwc/service/tms/1.0.0/water%3Awater0610@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
					]
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
				'id':'district_dali_fill',
				'type':'fill',
				'source':'dalimap',
				'source-layer':'district_dali',
				'paint':{
					// 'fill-outline-color':"rgb(222,222,222)",
					'fill-color':'RGB(146,175,202)',
				},
				'layout':{
					'visibility':'visible'
				}
			},
// 			{
// 				'id':'district_dali_line',
// 				'type':'line',
// 				'source':'dalimap',
// 				'source-layer':'district_dali',
// 				'paint':{
// 					'line-color':'RGB(222,222,222)',
// 				},
// 				'layout':{
// 					'visibility':'visible'
// 				}
// 			},
			{
				'id':'bgd_water',
				'type':'fill',
				'source':'dalimap',
				'source-layer':'bgd',
				"filter":["in","orderid",111,112],
				'paint':{
					'fill-color':"RGB(0,169,230)",
				},
				'layout':{
					// 'visibility':'none'
				}
			},
			{
				'id':'bgd_island',
				'type':'fill',
				'source':'dalimap',
				'source-layer':'bgd',
				"filter":["==","orderid",119],
				'paint':{
					'fill-color':"RGB(247,247,242)",
				},
				'layout':{
					// 'visibility':'none'
				}
			}
		]
	}
map.on("load", function () {
  // Possible position values are 'bottom-left', 'bottom-right', 'top-left', 'top-right'
  miniMap = new mapboxgl.Minimap({
							id:'minimap',
							width:'172px',
							height:"265px",
							center:daliCenter,
							zoom:8,
							// maxBounds: miniBound,
							style:daliStyle,
							zoomLevels:[],
					// 	  zoomLevels:[
					// 		  [18,6,16],
					// 		  [16,12,14],
					// 		  [14,10,12],
					// 		  [12,8,10],
					// 		  [10,6,8]
					// 	  ],
							lineColor:"#08F",
							lineWidth:2,
							fillColor:"#F80",
							fillOpacity:0.2,
							
						  dragPan:false,
						  scrollZoom:false,
						  boxZoom:false,
						  dragRotate:false,
						  keyboard:false,
						  doubleClickZoom:false,
						  touchZoomRotate:false
						});
	map.addControl(miniMap, 'bottom-right')
});
//比例分级滑块
var slider = document.getElementById("silder");
slider.value = 10;
var scale = slider.value;
slider.onmousedown = function() {
	slider.onmousemove = function() {
		scale = slider.value;
		map.zoomTo((+scale)/2+9);
	}
}
$(".zoom").mouseenter(function() {
		$(this).css({"cursor":"Pointer"});
	})
map.on('zoomend',function(e){
	let zoom = map.getZoom();
	var slider2 = document.getElementById("silder");
	slider2.value = (+zoom-9)*2;
})

function changeValue(method) {
	scale = slider.value;
	if (method) {
		slider.value = +scale - 1;
	} else {
		slider.value = +scale + 1;
	}
	map.zoomTo((+slider.value)/2+9);
}
