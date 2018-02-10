var map;
//var icon = "http://path/to/icon.png";
var json_res = "http://localhost/Wolf-summer-trainee-challenge/restaurants.json";
var json_ord = "http://localhost/Wolf-summer-trainee-challenge/orders.json";
var infowindow = new google.maps.InfoWindow();
function initialize() {

    var mapProp = {
        center: new google.maps.LatLng(60.170708, 24.938224), //LLANDRINDOD WELLS
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapProp);

    $.getJSON(json_res, function(res) {

	    $.each(res, function (key, data) {

	        var latLng = new google.maps.LatLng(data.location.lat, data.location.lon);

	        var marker = new google.maps.Marker({
	            position: latLng,
	            map: map,
	            // icon: icon,
	            title: data.name
	        });

	        var details = data.name + ",</br>" + data.phone_number + ". Ordered: "; 

	        bindInfoWindow(marker, map, infowindow, details);

	    });

    });

}

function bindInfoWindow(marker, map, infowindow, strDescription) {
    google.maps.event.addListener(marker, 'click', function () {
    	display_order("112278359460");
        infowindow.setContent(strDescription);
        infowindow.open(map, marker);
    });
}
// need to use AJAX to load data from JSON datasets
function display_order(id){
		var json_ord = "http://localhost/Wolf-summer-trainee-challenge/orders.json";

	    $.getJSON(json_ord, function(order) {
	        let count = 0;
		    $.each(order, function (key, data) {
		    		if(data.restaurant_id === id){
		    		 count += 1
		    		}
		    		//count = count + 1
		    });
		   document.getElementById("ordered").innerHTML = count;

	    });
	 }


google.maps.event.addDomListener(window, 'load', initialize);