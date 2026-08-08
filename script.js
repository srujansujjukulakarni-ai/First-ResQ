// FIRST RESQ - LOCATION & EMERGENCY FUNCTIONS

let userLatitude = null;
let userLongitude = null;


// ================================
// EMERGENCY ALERT
// ================================

function sendAlert() {
    alert("🚨 Emergency Alert Sent!\nPlease contact the appropriate official emergency service.");
}


// ================================
// FIND NEARBY HELP
// ================================

function findNearbyHelp() {

    const status = document.getElementById("locationStatus");
    const result = document.getElementById("locationResult");
    const coordinates = document.getElementById("coordinates");
    const button = document.getElementById("locationBtn");

    if (!navigator.geolocation) {

        status.textContent =
            "❌ Location services are not supported by this browser.";

        return;
    }

    status.textContent = "📍 Getting your location...";

    button.disabled = true;
    button.textContent = "📍 LOCATING...";

    navigator.geolocation.getCurrentPosition(

        function(position) {

            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;

            status.textContent =
                "✅ Location found!";

            coordinates.textContent =
                `Your approximate location: ${userLatitude.toFixed(5)}, ${userLongitude.toFixed(5)}`;

            result.style.display = "block";

            button.disabled = false;
            button.textContent = "📍 LOCATION FOUND";

        },

        function(error) {

            button.disabled = false;
            button.textContent = "📍 FIND NEARBY HELP";

            if (error.code === error.PERMISSION_DENIED) {

                status.textContent =
                    "⚠️ Location permission was denied. Please allow location access and try again.";

            } else if (error.code === error.POSITION_UNAVAILABLE) {

                status.textContent =
                    "⚠️ Your location could not be determined.";

            } else if (error.code === error.TIMEOUT) {

                status.textContent =
                    "⚠️ Location request timed out. Please try again.";

            } else {

                status.textContent =
                    "⚠️ Unable to get your location.";

            }

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }

    );
}


// ================================
// GOOGLE MAPS SEARCH
// ================================

function searchGoogleMaps(searchQuery) {

    const mapsURL =
        "https://www.google.com/maps/search/" +
        encodeURIComponent(searchQuery);

    window.open(mapsURL, "_blank");
}


// ================================
// NEARBY HOSPITALS
// ================================

function openNearbyHospitals() {

    if (userLatitude === null || userLongitude === null) {

        alert("📍 Please find your location first.");

        return;
    }

    const url =
        `https://www.google.com/maps/search/hospitals/@${userLatitude},${userLongitude},14z`;

    window.open(url, "_blank");
}


// ================================
// NEARBY BLOOD BANKS
// ================================

function openNearbyBloodBanks() {

    if (userLatitude === null || userLongitude === null) {

        alert("📍 Please find your location first.");

        return;
    }

    const url =
        `https://www.google.com/maps/search/blood+banks/@${userLatitude},${userLongitude},14z`;

    window.open(url, "_blank");
}


// ================================
// OPEN GOOGLE MAPS
// ================================

function openGoogleMaps() {

    if (userLatitude === null || userLongitude === null) {

        window.open(
            "https://www.google.com/maps",
            "_blank"
        );

        return;
    }

    const url =
        `https://www.google.com/maps/@${userLatitude},${userLongitude},14z`;

    window.open(url, "_blank");
}
