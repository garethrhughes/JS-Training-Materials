function addMap(id, data, lat, lng, zoom){
    var map = new google.maps.Map(document.getElementById(id), { 
      zoom: zoom,
      center: new google.maps.LatLng(lat, lng),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

	for( var i in data ) {
		var icon = data[i];
		
		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(icon.Lat, icon.Lng), 
			map: map, 
			title: icon.Name
		}); 
	}
}