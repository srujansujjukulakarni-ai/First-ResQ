function sendAlert(){
    alert("🚨 Emergency Alert Sent!\nHelp is on the way.");
}


// FIND NEARBY HOSPITALS - GPS
const locationBtn = document.getElementById("locationBtn");
const locationStatus = document.getElementById("locationStatus");

if (locationBtn) {
    locationBtn.addEventListener("click", () => {

        if (!navigator.geolocation) {
            locationStatus.textContent =
                "GPS is not supported by this browser.";
            return;
        }

        locationStatus.textContent =
            "📍 Getting your location...";

        navigator.geolocation.getCurrentPosition(
            (position) => {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                locationStatus.textContent =
                    `Location detected: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
            },

            (error) => {

                if (error.code === 1) {
                    locationStatus.textContent =
                        "Location permission was denied.";
                } else {
                    locationStatus.textContent =
                        "Unable to get your location. Please try again.";
                }
            }
        );
    });
}