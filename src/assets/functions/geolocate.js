function geolocate(callback) {
	const options = {
		enableHighAccuracy: true,
		maximumAge: 0
	};

	function success(position) {
		callback(position);
	}

	function error(error) {
		callback(null);
		console.warn(`ERROR(${error.code}): ${error.message}`);
	}

	if (navigator.geolocation) navigator.geolocation.getCurrentPosition(success, error, options);
	else console.log("Geolocation is not supported by this browser");
}

export default geolocate;