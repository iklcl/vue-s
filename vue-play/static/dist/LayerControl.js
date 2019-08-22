
function layerCheck1OnClick(){
	let chkLayerCheck1 = document.getElementById('layerCheck1');
	if (chkLayerCheck1.checked)
	{
		map.setLayoutProperty('dali_resize', 'visibility', 'visible');
		map.setLayoutProperty('dali_cj', 'visibility', 'visible');
	}
	else
	{
		map.setLayoutProperty('dali_resize', 'visibility', 'none');
		map.setLayoutProperty('dali_cj', 'visibility', 'none');
	}
}
function layerCheck2OnClick(){
	let allLayers = map.getStyle().layers
	let chkLayerCheck2 = document.getElementById('layerCheck2');
	if (chkLayerCheck2.checked)
	{
		for(let i = 1;i<allLayers.length;i++)
		{
			if(allLayers[i].id.search('road')!=-1)
			{
				map.setLayoutProperty(allLayers[i].id, 'visibility', 'visible');
			}
		}
	}
	else
	{
		for(let i = 1;i<allLayers.length;i++)
		{
			if(allLayers[i].id.search('road')!=-1)
			{
				map.setLayoutProperty(allLayers[i].id, 'visibility', 'none');
			}
		}
	}
}
function layerCheck3OnClick(){
	let chkLayerCheck1 = document.getElementById('layerCheck3');
	if (chkLayerCheck1.checked)
	{
		map.setLayoutProperty('building_ex', 'visibility', 'visible');
	}
	else
	{
		map.setLayoutProperty('building_ex', 'visibility', 'none');
	}
}
function layerCheck4OnClick(){
	let chkLayerCheck4 = document.getElementById('layerCheck4');
	let allLayers = map.getStyle().layers
	if (chkLayerCheck4.checked)
	{
		for(let i = 1;i<allLayers.length;i++)
		{
			if(allLayers[i].id.search('bgd')!=-1)
			{
				map.setLayoutProperty(allLayers[i].id, 'visibility', 'visible');
			}
		}
	}
	else
	{
		for(let i = 1;i<allLayers.length;i++)
		{
			if(allLayers[i].id.search('bgd')!=-1)
			{
				map.setLayoutProperty(allLayers[i].id, 'visibility', 'none');
			}
		}
	}
}
function layerCheck5OnClick(){
	let chkLayerCheck5 = document.getElementById('layerCheck5');
	let allLayers = map.getStyle().layers
	if (chkLayerCheck5.checked)
	{
		
		for(let i = 1;i<allLayers.length;i++)
		{
			if(allLayers[i].id.search('erhaiStation')!=-1 ||allLayers[i].id ==='erhaiPollute' )
			{
				map.setLayoutProperty(allLayers[i].id, 'visibility', 'visible');
			}
		}
	}
	else
	{
		for(let i = 1;i<allLayers.length;i++)
		{
			if(allLayers[i].id.search('erhaiStation')!=-1||allLayers[i].id ==='erhaiPollute')
			{
				map.setLayoutProperty(allLayers[i].id, 'visibility', 'none');
			}
		}
	}
}
function layerCheck6OnClick(){
	let chkLayerCheck6 = document.getElementById('layerCheck6');
	if (chkLayerCheck6.checked)
	{
		let currentImage = 90;
		let imageIndex = 0
		function getErhaiPath(){
			return "/hbproject/image/erhairgba/erhai_"+currentImage+".png";
		}
		map.addSource("erhai", {
			type: "image",
			url: getErhaiPath(),
			coordinates: [
					[100.09215611,25.9621225249],
					[100.30372011,25.9621225249],
					[100.30372011,25.5957445249],
					[100.09215611,25.5957445249]
					]
		});
		map.addLayer({
			id: "erhai",
			"type": "raster",
			"source": "erhai",
			// "minzoom": 7,
			"paint": {
				"raster-fade-duration": 0
			},
			'layout':{
				// 'visibility':'none'
			}
		});
		function water_diffuse(){
			imageIndex = imageIndex+1;
			currentImage = imageIndex%55 +90;
			map.getSource("erhai").updateImage({url:getErhaiPath()});
		}
		water_diffuseFun=setInterval(water_diffuse,700);
	}
	else
	{
		clearInterval(water_diffuseFun);
		// water_diffuseFun = 0;
		map.removeLayer("erhai");
		map.removeSource("erhai");
	}
}
function layerCheck7OnClick(){
	let chkLayerCheck7 = document.getElementById('layerCheck7');
	if (chkLayerCheck7.checked)
	{
		map.setLayoutProperty('district_dali', 'visibility', 'visible');
	}
	else
	{
		map.setLayoutProperty('district_dali', 'visibility', 'none');
	}
}
