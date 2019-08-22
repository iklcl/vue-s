var rightMouseClickContent = ['打印'];
let popupRight = new mapboxgl.Popup({
	closeButton:false,
	anchor:"top-left",
});
let rightClickHtml = "<a class=\"rightMouseClick\" onclick=\"printMap()\">打印</a>"
map.on('contextmenu',function(e){
	popupRight.setLngLat(e.lngLat)
	.setHTML(rightClickHtml)
	.addTo(map);
})
//打印地图
function printMap(){
	popupRight.remove();
	let mapDiv = document.getElementById('map');
	mapDiv.style.zIndex = 999;
	// navControl._compass.hidden = true;
	map.removeControl(draw);
	map.removeControl(miniMap);
	window.print();
	if(window.matchMedia)
	{
		let mediaQueryList = window.metchMedia('print');
		
		
		
		
		
		
		
		
		
	}
}