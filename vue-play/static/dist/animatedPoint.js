let radiuSize =200;
let stationColorArr = [['rgba(0,152,101,1)','rgba(1,246,164,'],['rgba(255,211,50,1)','rgba(255,250,153,'],['rgba(254,153,50,1)','rgba(224,203,182,'],
						['rgba(203,0,50,1)','rgba(220,168,180,'],['rgba(71,1,106,1)','rgba(186,136,210,']];
let levelArr = ["I","II","III","IV","V"]
function PulsingDot(radiuSize,rSide,gSide,bSide,rgba){ 
	pul = 	{
			width: radiuSize,
			height: radiuSize,
			data: new Uint8Array(radiuSize * radiuSize * 4),
			
			onAdd: function() {
				var canvas = document.createElement('canvas');
				canvas.width = this.width;
				canvas.height = this.height;
				this.context = canvas.getContext('2d');
			},
			
			render: function() {
				var duration = 1000;
				var t = (performance.now() % duration) / duration;
				
				var radius = radiuSize / 2 * 0.3;
				var outerRadius = radiuSize / 2 * 0.7 * t + radius;
				var context = this.context;
				
				// draw outer circle
				context.clearRect(0, 0, this.width, this.height);
				context.beginPath();
				context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
				context.fillStyle = 'rgba('+rSide+','+gSide+','+bSide +',' + (1 - t) + ')';
				context.fill();
				
				// draw inner circle
				context.beginPath();
				context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
				context.fillStyle = rgba;
				context.strokeStyle = 'white';
				context.lineWidth = 2 + 4 * (1 - t);
				context.fill();
				context.stroke();
				
				// update this image's data with data from the canvas
				this.data = context.getImageData(0, 0, this.width, this.height).data;
				
				// keep the map repainting
				map.triggerRepaint();
				
				// return `true` to let the map know that the image was updated
				return true;
			},	
		}
	return pul;
}
let testPul = PulsingDot(300,"71","63","35","RGBA(173,155,90,1)");
let pulsingDot = {
	width: radiuSize,
	height: radiuSize,
	data: new Uint8Array(radiuSize * radiuSize * 4),
	 
	onAdd: function() {
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		this.context = canvas.getContext('2d');
	},
	 
	render: function() {
		var duration = 1000;
		var t = (performance.now() % duration) / duration;
		 
		var radius = radiuSize / 2 * 0.3;
		var outerRadius = radiuSize / 2 * 0.7 * t + radius;
		var context = this.context;
		 
		// draw outer circle
		context.clearRect(0, 0, this.width, this.height);
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
		context.fillStyle = 'rgba(160, 160, 160,' + (1 - t) + ')';
		context.fill();
		 
		// draw inner circle
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
		context.fillStyle = 'rgba(64, 64, 64, 1)';
		context.strokeStyle = 'white';
		context.lineWidth = 2 + 4 * (1 - t);
		context.fill();
		context.stroke();
		 
		// update this image's data with data from the canvas
		this.data = context.getImageData(0, 0, this.width, this.height).data;
		 
		// keep the map repainting
		map.triggerRepaint();
		 
		// return `true` to let the map know that the image was updated
		return true;
	}
};
let pulsingDot1 = {
	width: radiuSize,
	height: radiuSize,
	data: new Uint8Array(radiuSize * radiuSize * 4),
	 
	onAdd: function() {
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		this.context = canvas.getContext('2d');
	},
	 
	render: function() {
		var duration = 1000;
		var t = (performance.now() % duration) / duration;
		 
		var radius = radiuSize / 2 * 0.3;
		var outerRadius = radiuSize / 2 * 0.7 * t + radius;
		var context = this.context;
		 
		// draw outer circle
		context.clearRect(0, 0, this.width, this.height);
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
		context.fillStyle = stationColorArr[0][1] + (1 - t) + ')';
		context.fill();
		 
		// draw inner circle
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
		context.fillStyle = stationColorArr[0][0];
		context.strokeStyle = 'white';
		context.lineWidth = 2 + 4 * (1 - t);
		context.fill();
		context.stroke();
		 
		// update this image's data with data from the canvas
		this.data = context.getImageData(0, 0, this.width, this.height).data;
		 
		// keep the map repainting
		map.triggerRepaint();
		 
		// return `true` to let the map know that the image was updated
		return true;
	}
};
let pulsingDot2 = {
	width: radiuSize,
	height: radiuSize,
	data: new Uint8Array(radiuSize * radiuSize * 4),
	 
	onAdd: function() {
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		this.context = canvas.getContext('2d');
	},
	 
	render: function() {
		var duration = 1000;
		var t = (performance.now() % duration) / duration;
		 
		var radius = radiuSize / 2 * 0.3;
		var outerRadius = radiuSize / 2 * 0.7 * t + radius;
		var context = this.context;
		 
		// draw outer circle
		context.clearRect(0, 0, this.width, this.height);
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
		context.fillStyle = stationColorArr[1][1] + (1 - t) + ')';
		context.fill();
		 
		// draw inner circle
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
		context.fillStyle = stationColorArr[1][0];
		context.strokeStyle = 'white';
		context.lineWidth = 2 + 4 * (1 - t);
		context.fill();
		context.stroke();
		 
		// update this image's data with data from the canvas
		this.data = context.getImageData(0, 0, this.width, this.height).data;
		 
		// keep the map repainting
		map.triggerRepaint();
		 
		// return `true` to let the map know that the image was updated
		return true;
	}
};
let pulsingDot3 = {
	width: radiuSize,
	height: radiuSize,
	data: new Uint8Array(radiuSize * radiuSize * 4),
	 
	onAdd: function() {
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		this.context = canvas.getContext('2d');
	},
	 
	render: function() {
		var duration = 1000;
		var t = (performance.now() % duration) / duration;
		 
		var radius = radiuSize / 2 * 0.3;
		var outerRadius = radiuSize / 2 * 0.7 * t + radius;
		var context = this.context;
		 
		// draw outer circle
		context.clearRect(0, 0, this.width, this.height);
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
		context.fillStyle = stationColorArr[2][1] + (1 - t) + ')';
		context.fill();
		 
		// draw inner circle
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
		context.fillStyle = stationColorArr[2][0];
		context.strokeStyle = 'white';
		context.lineWidth = 2 + 4 * (1 - t);
		context.fill();
		context.stroke();
		 
		// update this image's data with data from the canvas
		this.data = context.getImageData(0, 0, this.width, this.height).data;
		 
		// keep the map repainting
		map.triggerRepaint();
		 
		// return `true` to let the map know that the image was updated
		return true;
	}
};
let pulsingDot4 = {
	width: radiuSize,
	height: radiuSize,
	data: new Uint8Array(radiuSize * radiuSize * 4),
	 
	onAdd: function() {
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		this.context = canvas.getContext('2d');
	},
	 
	render: function() {
		var duration = 1000;
		var t = (performance.now() % duration) / duration;
		 
		var radius = radiuSize / 2 * 0.3;
		var outerRadius = radiuSize / 2 * 0.7 * t + radius;
		var context = this.context;
		 
		// draw outer circle
		context.clearRect(0, 0, this.width, this.height);
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
		context.fillStyle = stationColorArr[3][1] + (1 - t) + ')';
		context.fill();
		 
		// draw inner circle
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
		context.fillStyle = stationColorArr[3][0];
		context.strokeStyle = 'white';
		context.lineWidth = 2 + 4 * (1 - t);
		context.fill();
		context.stroke();
		 
		// update this image's data with data from the canvas
		this.data = context.getImageData(0, 0, this.width, this.height).data;
		 
		// keep the map repainting
		map.triggerRepaint();
		 
		// return `true` to let the map know that the image was updated
		return true;
	}
};
let pulsingDot5 = {
	width: radiuSize,
	height: radiuSize,
	data: new Uint8Array(radiuSize * radiuSize * 4),
	 
	onAdd: function() {
		var canvas = document.createElement('canvas');
		canvas.width = this.width;
		canvas.height = this.height;
		this.context = canvas.getContext('2d');
	},
	 
	render: function() {
		var duration = 1000;
		var t = (performance.now() % duration) / duration;
		 
		var radius = radiuSize / 2 * 0.3;
		var outerRadius = radiuSize / 2 * 0.7 * t + radius;
		var context = this.context;
		 
		// draw outer circle
		context.clearRect(0, 0, this.width, this.height);
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
		context.fillStyle = stationColorArr[4][1] + (1 - t) + ')';
		context.fill();
		 
		// draw inner circle
		context.beginPath();
		context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
		context.fillStyle = stationColorArr[4][0];
		context.strokeStyle = 'white';
		context.lineWidth = 2 + 4 * (1 - t);
		context.fill();
		context.stroke();
		 
		// update this image's data with data from the canvas
		this.data = context.getImageData(0, 0, this.width, this.height).data;
		 
		// keep the map repainting
		map.triggerRepaint();
		 
		// return `true` to let the map know that the image was updated
		return true;
	}
};


map.on('load',function(){
	map.addSource("erhaiRIMS",{
		"type":"geojson",
//        "buffer":0,
//        "tolerance":0.375,//简化容限(更高意味着更简单的几何结构和更快的性能)。
//         "cluster":true,//聚类
//         "clusterRadius":15,
//        "clusterMaxZoom":11,
		//"clusterProperties": //根据属性聚类
		"data":'json/animatedPoint.geojson'
	});
	map.addImage('pulsing-dot',testPul,{pixelRatio:3});
	map.addImage('pulsing-dot1',pulsingDot1,{pixelRatio:3});
	map.addImage('pulsing-dot2',pulsingDot2,{pixelRatio:3});
	map.addImage('pulsing-dot3',pulsingDot3,{pixelRatio:3});
	map.addImage('pulsing-dot4',pulsingDot4,{pixelRatio:3});
	map.addImage('pulsing-dot5',pulsingDot5,{pixelRatio:3});
	map.addLayer({
		'id':'erhaiPollute',
		'type':'symbol',
		'source':{
			'type':'geojson',
			'data':{
				'type':'FeatureCollection',
				'features':[{
					'type':'Feature',
					"properties": {
						"name": "污染源1",
						"ph": 7.38,
						"phquality": "V",
						"oxygen": 7,
						"oxygenquality": "V",
						"nitrogen": 0.32,
						"nitrogenquality": "V",
						"permangan": 1.49,
						"permanganquality": "V",
						"orgacarbon": "--",
						"orgacarbonquality": "V",
						"section": "污染源1",
						"profile": "污染源1",
						"belong": "污染源1",
						"date": "2018-09-18",
						"time": "12:00:00"
					},
					'geometry':{
						'type':'Point',
						'coordinates':[100.221734,25.820866]
					}
				}]
			}
		},
		'layout':{
			'icon-image':'pulsing-dot',
			// 'visibility':'none'
		}
	})
	for (let i =0;i<5;i++)
	{
		map.addLayer({
			'id':'erhaiStation'+(i+1).toString(),
			'type':'symbol',
			'filter':["==","phquality",levelArr[i]],
			'source':'erhaiRIMS',
			'layout':{
				'icon-image':'pulsing-dot'+(i+1).toString(),
				// 'visibility':'none'
			}
		})
	}
})

