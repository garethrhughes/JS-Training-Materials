(function(){
	window.Map = function(id, lat, lng, zoom){
		this.map = new google.maps.Map(document.getElementById(id), { 
		  zoom: zoom,
		  center: new google.maps.LatLng(lat, lng),
		  mapTypeId: google.maps.MapTypeId.ROADMAP
		});
	}
	
	Map.prototype.addMarkerAndSetCenter =  function(lat, lng, title){
		var latLng = new google.maps.LatLng(lat, lng);
						
		this.map.setCenter(latLng);
		new google.maps.Marker({
			position: latLng, 
			map: this.map, 
			title: title
		}); 
	}
	
	Map.prototype.search = function(query){
		var geocoder = new google.maps.Geocoder();
		
		var t = this;
        geocoder.geocode( { 'address': query }, function(results, status){
			addressLookupCallback.apply(t, [results, status]);
		});
	}
	
	var addressLookupCallback = function(results, status) {
		if (status != google.maps.GeocoderStatus.OK) {
			alert('No results');
			return;
		}

		this.map.setCenter(results[0].geometry.location);
	}
	
})();