// ========================================
// FIRST RESQ - LOCATION SYSTEM
// ========================================

let userLatitude = null;
let userLongitude = null;


// ========================================
// FIND NEARBY HELP
// ========================================

function findNearbyHelp() {

    const status = document.getElementById("locationStatus");
    const button = document.getElementById("locationBtn");
    const result = document.getElementById("locationResult");
    const coordinates = document.getElementById("coordinates");

    // Check browser support
    if (!navigator.geolocation) {
        status.textContent =
            "❌ Location is not supported by this browser.";
        return;
    }

    // Loading state
    status.textContent =
        "📍 Getting your location...";

    button.disabled = true;
    button.textContent =
        "📍 LOCATING...";


    navigator.geolocation.getCurrentPosition(

        // ====================================
        // LOCATION SUCCESS
        // ====================================

        function(position) {

            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;

            console.log("First ResQ location:", userLatitude, userLongitude);


            // Update status
            status.textContent =
                "✅ Location found!";


            // Update coordinates message
            coordinates.textContent =
                "📍 Your location is ready. Choose an emergency service below.";


            // VERY IMPORTANT:
            // Make the hidden section visible
            result.style.display = "block";

            result.style.visibility = "visible";
            result.style.opacity = "1";


            // Change heading
            const heading = result.querySelector("h2");

            if (heading) {
                heading.textContent =
                    "🚨 Emergency Help Near You";
            }


            // Reset button
            button.disabled = false;
            button.textContent =
                "📍 LOCATION FOUND";


            // Scroll to the result
            setTimeout(function() {

                result.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }, 500);

        },


        // ====================================
        // LOCATION ERROR
        // ====================================

        function(error) {

            button.disabled = false;

            button.textContent =
                "📍 FIND NEARBY HELP";


            if (error.code === 1) {

                status.textContent =
                    "⚠️ Location permission denied. Please allow location access.";

            }

            else if (error.code === 2) {

                status.textContent =
                    "⚠️ Your location could not be determined.";

            }

            else if (error.code === 3) {

                status.textContent =
                    "⚠️ Location request timed out. Please try again.";

            }

            else {

                status.textContent =
                    "⚠️ Unable to get your location.";

            }

        },

        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        }

    );
}


// ========================================
// GOOGLE MAPS SEARCH
// ========================================

function searchGoogleMaps(query) {

    const url =
        "https://www.google.com/maps/search/" +
        encodeURIComponent(query);

    window.open(url, "_blank");
}


// ========================================
// HOSPITALS
// ========================================

function openNearbyHospitals() {

    if (
        userLatitude === null ||
        userLongitude === null
    ) {
        alert("📍 Please find your location first.");
        return;
    }

    const url =
        "https://www.google.com/maps/search/hospitals/@"
        + userLatitude
        + ","
        + userLongitude
        + ",14z";

    window.open(url, "_blank");
}


// ========================================
// BLOOD BANKS
// ========================================

function openNearbyBloodBanks() {

    if (
        userLatitude === null ||
        userLongitude === null
    ) {
        alert("📍 Please find your location first.");
        return;
    }

    const url =
        "https://www.google.com/maps/search/blood+banks/@"
        + userLatitude
        + ","
        + userLongitude
        + ",14z";

    window.open(url, "_blank");
}


// ========================================
// GOOGLE MAPS
// ========================================

function openGoogleMaps() {

    if (
        userLatitude === null ||
        userLongitude === null
    ) {
        window.open(
            "https://www.google.com/maps",
            "_blank"
        );

        return;
    }

    const url =
        "https://www.google.com/maps/@"
        + userLatitude
        + ","
        + userLongitude
        + ",14z";

    window.open(url, "_blank");
}
