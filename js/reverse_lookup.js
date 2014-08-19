var geocoder;

$(document).ready(function () {
    geocoder = new google.maps.Geocoder();
});

var getCurrentPosition = function () {

    $('#lblLatitude').html("Getting Location...");
    $('#lblLongitude').html("Getting Location...");
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

                    $('#lblLatitude').html("Latitude: " + latitude);
                    $('#lblLongitude').html("Longitude: " + longitude);
                    $('#lblAccuracy').html("Accuracy: " + accuracy + " metres");
                    $('#lblLocation').html("Location.. <br/>" + location);
                } else {
                    alert("No results found");
                    $('#lblLatitude').html("");
                }
            } else {
                alert("Geocoder failed due to: " + status);
                $('#lblLatitude').html("");
            }
        });
    };

    var failure = function (error) {
        alert("Error: " + error.message);
        $('#lblLatitude').html("");
        $('#lblLongitude').html("");
        $('#lblAccuracy').html("");
        $('#lblLocation').html("");
    };

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, failure, options);
    } else {
        alert("Geolocation is not supported");
    }
};