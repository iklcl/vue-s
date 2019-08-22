//背景类型
var bgdType = {11:"海洋",12:"水系",21:"建成区",22:"街区面",23:"桥梁面",24:"地铁站透视图",31:"公园绿地",32:"高尔夫球场",33:"交通绿化",34:"运动场跑道",35:"球场",40:"岛屿",41:"沙漠",42:"雪山"}

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
	closeButton: false
});
// Disable default box zooming.

map.on('load', function() {
	var canvas = map.getCanvasContainer();
	
	// Variable to hold the starting xy coordinates
	// when `mousedown` occured.
	var start;
	
	// Variable to hold the current xy coordinates
	// when `mousemove` or `mouseup` occurs.
	var current;
	
	// 矩形或圆形div
	var box;
	// 圆心
	var boxCenter;
	map.addLayer({
			'id':'bgd',
			'type':'fill',
			'source':'dali_vector',
			'source-layer':'bgd',
			"filter":["in","geoid",''],
			"minzoom": 8,
			'paint':{
				"fill-outline-color": "#484896",
				"fill-color": "RGB(0,255,255)",
				"fill-opacity": 0.7
			},
	
	});
	map.addLayer({
			'id':'road',
			'type':'line',
			'source':'dali_vector',
			'source-layer':'road',
			"filter":["==","geoid",''],
			// "minzoom": arrRoadLevel[i],
			'paint':{
				'line-color':'RGB(0,255,122)',
				'line-width':{
					'stops':[[12,2.2],[22,14]]
				},
				"line-opacity": 0.7
			},
			'layout':{
				'visibility':'visible'
			}
	});
	map.addLayer({
		'id': 'building',
		'source': 'dali_vector',
		'source-layer': 'building',
		'type': 'fill-extrusion',
		"filter":["==","geoid",''],
		// 'minzoom': 16,
		'paint': {
			"fill-extrusion-color": 'rgb(0,122,255)',
			'fill-extrusion-height': ['get', 'height'],
			'fill-extrusion-opacity': 0.7,
		},
		'layout':{
			'visibility':'visible'//visible
		},
		"interactive": true
	})
// })
// map.on('click',function(){
	
	canvas.addEventListener('mousedown', mouseDown, true);
	
	// Return the xy coordinates of the mouse position
	function mousePos(e) {
		var rect = canvas.getBoundingClientRect();
		return new mapboxgl.Point(
			e.clientX - rect.left - canvas.clientLeft,
			e.clientY - rect.top - canvas.clientTop
		);
	}
	//框选、圆选事件开始
	function mouseDown(e) {
		//禁用ctrl旋转地图控制
		if(e.button === 0)
		{
			map.dragRotate.disable();
		}
		if(!e.altKey && !e.ctrlKey)
		{
			map.dragRotate.enable();
		}
		if ((e.altKey || e.ctrlKey)&& e.button === 0)
		{
			// Disable default drag zooming when the shift key is held down.
			map.dragPan.disable();
			// Call functions for the following events
			document.addEventListener('mousemove', onMouseMove);
			document.addEventListener('mouseup', onMouseUp);
			document.addEventListener('keydown', onKeyDown);
			// 记录起点坐标
			start = mousePos(e);
		}
		else
		{
			return;
		}
	}
	function onMouseMove(e) {
		// Capture the ongoing xy coordinates
		current = mousePos(e);
	
		// Append the box element if it doesnt exist
		if (!box) {
			box = document.createElement('div');
			box.classList.add('boxdraw');
			canvas.appendChild(box);
		}
		var minX = Math.min(start.x, current.x),
			maxX = Math.max(start.x, current.x),
			minY = Math.min(start.y, current.y),
			maxY = Math.max(start.y, current.y);
		if(e.altKey)
		{
			// Adjust width and xy position of the box element ongoing
			var pos = 'translate(' + minX + 'px,' + minY + 'px)';
			box.style.transform = pos;
			box.style.WebkitTransform = pos;
			box.style.width = maxX - minX + 'px';
			box.style.height = maxY - minY + 'px';
		}
		else if(e.ctrlKey)
		{
			if(!boxCenter)
			{
				boxCenter = document.createElement('div');
				canvas.appendChild(boxCenter);
				boxCenter.style.position = 'absolute';
				boxCenter.style.left = start.x+'px';
				boxCenter.style.top = start.y+'px';
				boxCenter.style.width = 6 + 'px';
				boxCenter.style.height =  6 + 'px';
				boxCenter.style.borderRadius = 3+'px';
				boxCenter.style.background = '#000000';
			}
			var radius = Math.sqrt(Math.pow((current.y-start.y),2)+Math.pow((current.x-start.x),2))
// 			var pos = 'translate(' + minX + 'px,' + minY + 'px)';
// 			box.style.transform = pos;
// 			box.style.WebkitTransform = pos;
			box.style.position = 'absolute';
			box.style.left = start.x-radius +'px';
			box.style.top = start.y -radius+ 'px';
			box.style.width = 2*radius + 'px';
			box.style.height =  2*radius + 'px';
			box.style.borderRadius = radius+'px';
		}
	}
	function onMouseUp(e) {
		// Capture xy coordinates
		finish([start, mousePos(e),e]);
	}
	
	function onKeyDown(e) {
		// If the ESC key is pressed
		if (e.keyCode === 27) finish();
	}
	
	function finish(bbox) {
		// Remove these events now that finish has been called.
		document.removeEventListener('mousemove', onMouseMove);
		document.removeEventListener('keydown', onKeyDown);
		document.removeEventListener('mouseup', onMouseUp);
	
		if (box) {
			box.parentNode.removeChild(box);
			box = null;
		}
		if(boxCenter)
		{
			boxCenter.parentNode.removeChild(boxCenter);
			boxCenter = null;
		}
		// 102,103,111,112,113,114,115,116,117,119,120,121,122,123,124,126
		// If bbox exists. use this value as the argument for `queryRenderedFeatures`
		if (bbox) {
			var features;
			let allLayers = map.getStyle().layers;
			let allLayersID = new Array();
			for(let i = 4;i<allLayers.length;i++)//0,1,2,3分别是背景/影像/影像/行政区图层
			{
				if(allLayers[i].id.search('road_') !== -1)
				{
					continue;
				}
				if(allLayers[i].id.search('gl-draw') !== -1)
				{
					continue;
				}
				if(allLayers[i].id.search('bgd') !== -1)
				{
					continue;
				}
				if(allLayers[i].id === 'bgd102' || allLayers[i].id === 'bgd111')
				{
					continue;
				}
				allLayersID.push(allLayers[i].id);
			}
			switch(true)
			{
				
				case bbox[2].altKey://矩形框选
					var newBbox = [bbox[0],bbox[1]];
					features = map.queryRenderedFeatures(newBbox, { layers: allLayersID });
					break;
				case bbox[2].ctrlKey://圆框选
					let radius = Math.sqrt(Math.pow((bbox[1].y-bbox[0].y),2)+Math.pow((bbox[1].x-bbox[0].x),2))
					let centerCircle = {x:bbox[0].x,y:bbox[1].y};
					bbox[0].x = centerCircle.x-radius;
					bbox[0].y = centerCircle.y-radius;
					bbox[1].x = centerCircle.x+radius;
					bbox[1].y = centerCircle.y+radius;
					var newBbox = [bbox[0],bbox[1]];
					features = map.queryRenderedFeatures(newBbox, { layers: allLayersID });
					break;
				default:
					features = new Array();
					// break;
			}
	
			if (features.length >= 1000) {
				return window.alert('选中区域图形过多！');
			}
			// Run through the selected features and set a filter
			// to match features with unique FIPS codes to activate
			// the `counties-highlighted` layer.
			var countRoad =0;
			var countBuild = 0;
			var countBgd = 0;
			for (let i =0;i<features.length;i++)
			{
				if(features[i].properties.geoid===undefined)
				{
					continue;
				}
				if(features[i].layer.id.search('road')!==-1)
				{
					countRoad++;
				}
				else if(features[i].layer.id.search('bgd') !== -1)
				{
					countBgd++;
				}
				else if(features[i].layer.id === 'building_ex')
				{
					countBuild++;
				}
				else{
					continue;
				}
			}
			var filter = features.reduce(function(memo, feature) {
				if(feature.properties.geoid!==undefined)
				{
					memo.push(feature.properties.geoid);
				}
				return memo;
			}, ['in', 'geoid']);
			
			map.setFilter("bgd", filter);
			map.setFilter("road", filter);
			map.setFilter("building", filter);
			var answer = document.getElementById('calculated-area');
			answer.innerHTML = '<p><strong>' + '道路：'+countRoad+'<br/>'+'建筑：'+countBuild + '</strong></p>';
			
		}
		map.dragRotate.disable();
		map.dragPan.enable();
	}
	
	map.on('mousemove', function(e) {
		var features = map.queryRenderedFeatures(e.point, { layers: ['bgd','road','building'] });
		// Change the cursor style as a UI indicator.
		map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
	
		if (!features.length) {
			popup.remove();
			return;
		}
		var feature = features[0];
		//鼠标移动时显示信息
		
		var text;
		switch(feature.layer.id)
		{
			case 'bgd':
				text = bgdType[feature.properties.type];
				break;
			case 'road':
				text = feature.properties.roadname === '' ? '无路名':feature.properties.roadname;
				break;
			case 'building':
				text = feature.properties.area.toString()+'m²';
				break;
		}
		popup.setLngLat(e.lngLat)
			.setText(text)
			.addTo(map);
	});
})