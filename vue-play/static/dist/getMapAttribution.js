
var arrLevel = ["I","II","III","IV","V"]
for (var j = 0;j < 5;j++ )
{
    var layerName = "rims_"+arrLevel[j];
    map.on('click',layerName,function(e){
        var info = e.features[0].properties;
        var coordinates = e.features[0].geometry.coordinates.slice();
        var name = "<p><strong>"+info["name"]+" "+info["phquality"]+"</strong></p>";
        var ph = "<p>"+"ph:"+info["ph"]+"</p>";
        var oxygen = "<p>"+"氧:"+info["oxygen"]+"</p>";
        var nitrogen = "<p>"+"氮:"+info["nitrogen"]+"</p>";
        var permangan = "<p>"+"高锰酸:"+info["permangan"]+"</p>";
//        var orgacarbon = "<p>"+"orgacarbon:"+info["orgacarbon"]+"</p>";
        var section = "<p>"+"监测段:"+info["section"]+"</p>";
        var belong = "<p>"+"属于:"+info["belong"]+"</p>";
        var date = "<p>"+"时间:"+info["date"]+"</p>";
        var strInfo = name+ph+oxygen+nitrogen+permangan+section+belong+date;
        new mapboxgl.Popup().setLngLat(coordinates)
            .setHTML(strInfo)
            .addTo(map);
    });
	map.on('click','erhaiStation'+(j+1).toString(),function(e){
		let info = e.features[0].properties;
		let coordinates = e.features[0].geometry.coordinates.slice();
		let name = "<p><strong>"+info["name"]+" "+info["phquality"]+"</strong></p>";
		let ph = "<p>"+"ph:"+info["ph"]+"</p>";
		let oxygen = "<p>"+"氧:"+info["oxygen"]+"</p>";
		let nitrogen = "<p>"+"氮:"+info["nitrogen"]+"</p>";
		let permangan = "<p>"+"高锰酸:"+info["permangan"]+"</p>";
//        let orgacarbon = "<p>"+"orgacarbon:"+info["orgacarbon"]+"</p>";
		let section = "<p>"+"监测段:"+info["section"]+"</p>";
		let belong = "<p>"+"属于:"+info["belong"]+"</p>";
		let date = "<p>"+"时间:"+info["date"]+"</p>";
		let strInfo = name+ph+oxygen+nitrogen+permangan+section+belong+date;
		map.panTo(coordinates);
		new mapboxgl.Popup().setLngLat(coordinates)
			.setHTML(strInfo)
			.addTo(map);
	})
    map.on('mouseenter',layerName,function(){
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave',layerName,function(){
        map.getCanvas().style.cursor = '';
    });
	map.on('mouseenter','erhaiStation'+(j+1).toString(),function(){
		map.getCanvas().style.cursor = 'pointer';
	});
	map.on('mouseleave','erhaiStation'+(j+1).toString(),function(){
		map.getCanvas().style.cursor = '';
	});
}
map.on('click','erhaiPollute',function(e){
	let info = e.features[0].properties;
	let coordinates = e.features[0].geometry.coordinates.slice();
	let name = "<p><strong>"+info["name"]+" "+info["phquality"]+"</strong></p>";
	let ph = "<p>"+"ph:"+info["ph"]+"</p>";
	let oxygen = "<p>"+"氧:"+info["oxygen"]+"</p>";
	let nitrogen = "<p>"+"氮:"+info["nitrogen"]+"</p>";
	let permangan = "<p>"+"高锰酸:"+info["permangan"]+"</p>";
//        let orgacarbon = "<p>"+"orgacarbon:"+info["orgacarbon"]+"</p>";
	let section = "<p>"+"监测段:"+info["section"]+"</p>";
	let belong = "<p>"+"属于:"+info["belong"]+"</p>";
	let date = "<p>"+"时间:"+info["date"]+"</p>";
	let strInfo = name+ph+oxygen+nitrogen+permangan+section+belong+date;
	map.panTo(coordinates);
	new mapboxgl.Popup().setLngLat(coordinates)
		.setHTML(strInfo)
		.addTo(map);
})
map.on('mouseenter','erhaiPollute',function(){
	map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave','erhaiPollute',function(){
	map.getCanvas().style.cursor = '';
});

for (let i = 0;i<13;i++)
{
	let layerName = 'road_'+i.toString();
	map.on('click',layerName,function(e){
		let info = e.features[0].properties;
		let coordinates = [e.lngLat["lng"],e.lngLat["lat"]];
		strInfo = info.roadname ===undefined ? '无路名': info.roadname;
		new mapboxgl.Popup().setLngLat(coordinates)
			.setHTML(strInfo)
			.addTo(map);
	})
}
//建筑鼠标点击事件
map.on('click','building_ex',function(e){
	if(map.getZoom()<15.5)
	{
		return;
	}
	let info = e.features[0].properties;
	let coordinates = [e.lngLat["lng"],e.lngLat["lat"]];
	strInfo = info.area.toString()+'m²';
	new mapboxgl.Popup().setLngLat(coordinates)
		.setHTML(strInfo)
		.addTo(map);
})
