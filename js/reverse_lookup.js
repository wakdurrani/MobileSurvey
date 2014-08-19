var geocoder;

$(document).ready(function () {
    geocoder = new google.maps.Geocoder();
});

var getCurrentPosition = function () {

    $('#txtLatitude').val("Getting Location...");
    $('#txtLongitude').val("Getting Location...");
    $('#lblAccuracy').html("");
    $('#lblLocation').html("");

    var options =
    {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    };

    var success = function (position) {
        var latitude = parseFloat(position.coords.latitude);
        var longitude = parseFloat(position.coords.longitude);
        var accuracy = parseFloat(position.coords.accuracy);

        var latlng = new google.maps.LatLng(latitude, longitude);

        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    var location = results[0].formatted_address;

                    $('#txtLatitude').val(latitude);
                    $('#txtLongitude').val(longitude);
                    $('#lblAccuracy').html("Accuracy: " + accuracy + " metres");
                    $('#lblLocation').html("Location.. <br/>" + location);
                } else {
                    alert("No results found");
                    $('#txtLatitude').val("0.000");
					$('#txtLongitude').val("0.000");
                }
            } else {
                alert("Geocoder failed due to: " + status);
                $('#txtLatitude').val("0.000");
				$('#txtLongitude').val("0.000");
            }
        });
    };

    var failure = function (error) {
        alert("Error: " + error.message);
        $('#txtLatitude').val("0.000e");
        $('#txtLongitude').val("0.000e");
        $('#lblAccuracy').html("");
        $('#lblLocation').html("");
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, failure, options);
    } else {
        alert("Geolocation is not supported");
    }
};