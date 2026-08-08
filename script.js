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

    if (!navigator.geolocation) {
        status.textContent = "❌ Location is not supported by this browser.";
        return;
    }

    status.textContent = "📍 Getting your location...";

    button.disabled = true;
    button.textContent = "📍 LOCATING...";


    navigator.geolocation.getCurrentPosition(

        function(position) {

            // Save location
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;

            console.log("FIRST RESQ LOCATION FOUND");
            console.log("Latitude:", userLatitude);
            console.log("Longitude:", userLongitude);


            // -----------------------------
            // LOCATION SUCCESS
            // -----------------------------

            status.textContent = "✅ Location found!";

            button.disabled = false;
            button.textContent = "📍 LOCATION FOUND";


            // Update message
            coordinates.textContent =
                "📍 Your location has been detected. Choose an emergency service below.";


            // --------------------------------
            // FORCE SHOW NEARBY HELP SECTION
            // --------------------------------

            result.removeAttribute("hidden");

            result.style.setProperty(
                "display",
                "block",
                "important"
            );

            result.style.setProperty(
                "visibility",
                "visible",
                "important"
            );

            result.style.setProperty(
                "opacity",
                "1",
                "important"
            );


            // Change heading
            const heading = result.querySelector("h2");

            if (heading) {
                heading.textContent =
                    "🚨 Emergency Help Near You";
            }


            // --------------------------------
            // WAIT FOR BROWSER TO RENDER
            // THEN SCROLL DOWN
            // --------------------------------

            setTimeout(function() {

                const resultPosition =
                    result.getBoundingClientRect().top
                    + window.pageYOffset
                    - 80;

                window.scrollTo({
                    top: resultPosition,
                    behavior: "smooth"
                });

            }, 700);

        },


        function(error) {

            button.disabled = false;
            button.textContent = "📍 FIND NEARBY HELP";


            if (error.code === 1) {

                status.textContent =
                    "⚠️ Location permission denied. Please allow location access.";

            } else if (error.code === 2) {

                status.textContent =
                    "⚠️ Your location could not be determined.";

            } else if (error.code === 3) {

                status.textContent =
                    "⚠️ Location request timed out. Please try again.";

            } else {

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
// NEARBY HOSPITALS
// ========================================

function openNearbyHospitals() {

    if (userLatitude === null) {
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
// NEARBY BLOOD BANKS
// ========================================

function openNearbyBloodBanks() {

    if (userLatitude === null) {
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

    if (userLatitude === null) {

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


// ========================================
// EMERGENCY ALERT
// ========================================

function sendAlert() {

    alert(
        "🚨 Emergency Alert Sent!\n\n" +
        "Please contact the appropriate official emergency service."
    );

}
