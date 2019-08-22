
var draw = new MapboxDraw(
{
	displayControlsDefault:false,
	controls:{
		point:true,
		line_string:true,
		polygon:true,
		trash:true,
		combine_features:false,
		uncombine_features:false,
	},
	//允许修改属性
	userProperties:true,
}
);
map.addControl(draw);
map.on('draw.create', drawFunc);
map.on('draw.delete', updateArea);
map.on('draw.update', updateArea);
function drawFunc(e){
	updateArea(e);
	if(e.features[0].geometry.type === 'Point')
	{
		addLayerPropertyBox(e);
	}
}
function updateArea(e) {
	var data = draw.get(e.features[0].id);
	if (data == undefined)
	{
		return null;
	}
	var answer = document.getElementById('calculated-area');
	var reValue;
	switch(data.geometry.type){
		case "Polygon":
			reValue = (turf.area(data)/1000000).toFixed(2).toString()+"km2";
			break;
		case "Point":
			reValue1 = data.geometry.coordinates[0].toFixed(6);
			reValue2 = data.geometry.coordinates[1].toFixed(6);
			reValue = reValue1+'<br />'+reValue2
			break;
		case "LineString":
			reValue = turf.length(data).toFixed(2).toString()+"km";
			break;
		
	}
	answer.innerHTML = '<p><strong>' + reValue + '</strong></p>';
	// answer.innerHTML = '';
	// if (e.type !== 'draw.delete') alert("Use the draw tools to draw a polygon!");
}
//添加文本
function addLayerPropertyBox(e){
	let divAddLayerPage = document.getElementById("addLayerPage");
	divAddLayerPage.style.display ="block";
}
//“添加”按钮事件
function addLayerProperty(){
	let txtAddLayerName =  document.getElementById("addLayerText");
	let selAddLayerType = document.getElementById("addLayerType");
	let selAddLayerColor = document.getElementById("addLayerColor");
	let selAddLayerSize = document.getElementById("addLayerSize");
	let allLayers = map.getStyle().layers;
	let name = txtAddLayerName.value === ""? "我的标记":addLayerText.value ;
	let type = selAddLayerType.value;
	let color = selAddLayerColor.value;
	let size = selAddLayerSize.value === ""? 10:Number(selAddLayerSize.value);
	let drawFeatureCollection = draw.getAll();
	let indexLast = drawFeatureCollection.features.length-1;
	let id = drawFeatureCollection.features[indexLast].id;
	draw.setFeatureProperty(id,"name",name);
	draw.setFeatureProperty(id,"type",type);
	draw.setFeatureProperty(id,"color",color);
	draw.setFeatureProperty(id,"size",size);
	userNewData.features.push(draw.getAll().features[indexLast]);
	map.getSource('userNewData').setData(userNewData);
	let divAddLayerPage = document.getElementById("addLayerPage");
	divAddLayerPage.style.display ="";
}
//点击显示画的geojson的坐标/长度/面积
map.on('click',function(e){
	data = draw.getSelected();
	if(data.features.length!=0)
	{
		var answer = document.getElementById('calculated-area');
		switch(data.features[0]['geometry']['type']){
			case "Polygon":
				reValue = (turf.area(data.features[0])/1000000).toFixed(2).toString()+"km2";
				break;
			case "Point":
				reValue1 = data.features[0]['geometry']['coordinates'][0].toFixed(6);
				reValue2 = data.features[0]['geometry']['coordinates'][1].toFixed(6);
				reValue = reValue1+'<br />'+reValue2
				break;
			case "LineString":
				reValue = turf.length(data.features[0]).toFixed(2).toString()+"km";
				break;
		}
		answer.innerHTML = '<p><strong>' + reValue + '</strong></p>';
	}
})

//保存geojson
var btnSaveGeoJson = document.getElementById("saveGeojson");
btnSaveGeoJson.addEventListener("click",saveHandler,false);
function saveHandler(){
	var data = draw.getAll();
	reJson = JSON.stringify(data);
	var blob = new Blob([reJson],{type:"text/plain;charset=utf-8"});
	saveAs(blob,"draw.geojson");
}
//读取geojson
var inputGeojson = document.getElementById('inputGeojson');
inputGeojson.addEventListener("change",handleFiles,false);
function handleFiles(){
	var selectFile = document.getElementById("inputGeojson").files[0];//获取读取的File对象
	var name  = selectFile.name;
	var size = selectFile.size;
	console.log("文件名："+name+"大小："+size);
	var reader = new FileReader();
	reader.readAsText(selectFile);
	
	reader.onload = function(){
		if(!isJSON(this.result))
		{
			return null;
		}
		let inputJson = JSON.parse(this.result);
		draw.add(inputJson);
		console.log(inputJson);
	}
}
//判断是否为json格式
function isJSON(str) {
    if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                alert('error：输入文本不是json格式'+'!');
				return false;
            }

        } catch(e) {
            alert('error：输入文本不是json格式'+'!'+e);
            return false;
        }
    }
}
//添加用户自定义图层数据
var userNewData;
map.on('load',function(){
	userNewData = map.getSource('mapbox-gl-draw-cold')._data;
	map.addSource('userNewData',{type:'geojson',data:userNewData});
	map.loadImage(getRootPath()+"static/image/V.png",function(error,image){
		if(error) throw error;
		map.addImage('V',image);
		map.addLayer({
			'id':'testJson',
			'source':'userNewData',
			'type':'symbol',
			'filter':['==','type','symbol'],
			'layout':{
				'icon-image':"V",
				"icon-anchor":"bottom",
				"icon-size":0.3,
				"icon-offset":[0,20],
				'icon-allow-overlap':true,
				'icon-ignore-placement':true,
				'text-field':"{name}",
				'text-size':['get', 'size'],
				'text-font':['MicrosoftYaHeiRegular'],
				'text-anchor':'top'
			},
			'paint':{
				'text-color':['get','color'],
			}
		})
	})
})