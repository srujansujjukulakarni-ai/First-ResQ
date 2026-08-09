// ========================================
// FIRST RESQ — MVP V3
// REAL NEARBY EMERGENCY HELP
// ========================================

let userLatitude = null;
let userLongitude = null;

// Your secure Cloudflare Worker
const FIRST_RESQ_API =
    "https://first-resq-api.kulkarnisrujan7.workers.dev";


// ========================================
// FIND NEARBY HELP
// ========================================

function findNearbyHelp() {

    const status =
        document.getElementById("locationStatus");

    const button =
        document.getElementById("locationBtn");

    const result =
        document.getElementById("locationResult");

    const coordinates =
        document.getElementById("coordinates");


    // ----------------------------------------
    // CHECK REQUIRED HTML ELEMENTS
    // ----------------------------------------

    if (!status || !button || !result) {

        console.error(
            "FIRST RESQ: Required location elements are missing."
        );

        return;
    }


    // ----------------------------------------
    // CHECK GEOLOCATION
    // ----------------------------------------

    if (!navigator.geolocation) {

        status.textContent =
            "❌ Location is not supported by this browser.";

        return;
    }


    // ----------------------------------------
    // RESET UI
    // ----------------------------------------

    status.textContent =
        "📍 Getting your location...";

    button.disabled = true;

    button.textContent =
        "📍 LOCATING...";


    // ----------------------------------------
    // GET REAL DEVICE LOCATION
    // ----------------------------------------

    navigator.geolocation.getCurrentPosition(

        async function(position) {

            // Save REAL GPS coordinates

            userLatitude =
                position.coords.latitude;

            userLongitude =
                position.coords.longitude;


            console.log(
                "FIRST RESQ LOCATION FOUND"
            );

            console.log(
                "Latitude:",
                userLatitude
            );

            console.log(
                "Longitude:",
                userLongitude
            );


            // --------------------------------
            // LOCATION FOUND
            // --------------------------------

            status.textContent =
                "✅ Location found!";


            button.disabled = false;

            button.textContent =
                "📍 LOCATION FOUND";


            if (coordinates) {

                coordinates.textContent =
                    "📍 Your location has been detected.";

            }


            // --------------------------------
            // SHOW RESULT SECTION
            // --------------------------------

            result.removeAttribute(
                "hidden"
            );

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


            // --------------------------------
            // CHANGE HEADING
            // --------------------------------

            const heading =
                result.querySelector("h2");


            if (heading) {

                heading.textContent =
                    "🚨 Emergency Help Near You";

            }


            // --------------------------------
            // SHOW LOADING MESSAGE
            // --------------------------------

            if (coordinates) {

                coordinates.textContent =
                    "🔎 Finding nearby hospitals and blood banks...";

            }


            // --------------------------------
            // SCROLL TO RESULTS
            // --------------------------------

            setTimeout(function() {

                const resultPosition =
                    result.getBoundingClientRect().top +
                    window.pageYOffset -
                    80;


                window.scrollTo({

                    top:
                        resultPosition,

                    behavior:
                        "smooth"

                });

            }, 400);


            // --------------------------------
            // LOAD REAL NEARBY DATA
            // --------------------------------

            await loadNearbyEmergencyResources();

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


        // ====================================
        // GPS OPTIONS
        // ====================================

        {

            enableHighAccuracy:
                true,

            timeout:
                20000,

            maximumAge:
                0

        }

    );
}


// ========================================
// LOAD REAL EMERGENCY RESOURCES
// ========================================

async function loadNearbyEmergencyResources() {

    const result =
        document.getElementById(
            "locationResult"
        );

    const coordinates =
        document.getElementById(
            "coordinates"
        );


    if (
        userLatitude === null ||
        userLongitude === null
    ) {

        return;

    }


    try {

        // --------------------------------
        // BUILD SECURE API URL
        // --------------------------------

        const apiUrl =
            FIRST_RESQ_API +
            "?lat=" +
            encodeURIComponent(
                userLatitude
            ) +
            "&lng=" +
            encodeURIComponent(
                userLongitude
            );


        console.log(
            "FIRST RESQ API REQUEST:",
            apiUrl
        );


        // --------------------------------
        // REQUEST REAL DATA
        // --------------------------------

        const response =
            await fetch(apiUrl);


        if (!response.ok) {

            throw new Error(
                "API request failed."
            );

        }


        const data =
            await response.json();


        console.log(
            "FIRST RESQ API RESPONSE:",
            data
        );


        if (!data.success) {

            throw new Error(
                data.error ||
                "Unable to find nearby resources."
            );

        }


        // --------------------------------
        // UPDATE LOCATION MESSAGE
        // --------------------------------

        if (coordinates) {

            coordinates.textContent =
                "📍 Nearby emergency resources found.";

        }


        // --------------------------------
        // DISPLAY RESULTS
        // --------------------------------

        renderNearbyResources(
            data
        );


    }

    catch (error) {

        console.error(
            "FIRST RESQ ERROR:",
            error
        );


        if (coordinates) {

            coordinates.textContent =
                "⚠️ Unable to load nearby emergency resources. Please try again.";

        }

    }

}


// ========================================
// DISPLAY NEARBY RESULTS
// ========================================

function renderNearbyResources(
    data
) {

    const result =
        document.getElementById(
            "locationResult"
        );


    if (!result) {

        return;

    }


    // --------------------------------
    // REMOVE OLD RESULTS
    // --------------------------------

    const oldResults =
        result.querySelector(
            ".real-nearby-results"
        );


    if (oldResults) {

        oldResults.remove();

    }


    // --------------------------------
    // CREATE RESULTS CONTAINER
    // --------------------------------

    const container =
        document.createElement(
            "div"
        );


    container.className =
        "real-nearby-results";


    // =================================
    // HOSPITAL SECTION
    // =================================

    const hospitalSection =
        createResourceSection(

            "🏥",

            "Nearby Hospitals",

            data.hospitals || []

        );


    container.appendChild(
        hospitalSection
    );


    // =================================
    // BLOOD BANK SECTION
    // =================================

    const bloodSection =
        createResourceSection(

            "🩸",

            "Nearby Blood Banks",

            data.bloodBanks || []

        );


    container.appendChild(
        bloodSection
    );


    // --------------------------------
    // INSERT INTO RESULT
    // --------------------------------

    result.appendChild(
        container
    );

}


// ========================================
// CREATE RESOURCE SECTION
// ========================================

function createResourceSection(
    icon,
    title,
    places
) {

    const section =
        document.createElement(
            "div"
        );


    section.className =
        "nearby-resource-section";


    const heading =
        document.createElement(
            "h3"
        );


    heading.textContent =
        icon + " " + title;


    section.appendChild(
        heading
    );


    // --------------------------------
    // NO RESULTS
    // --------------------------------

    if (!places.length) {

        const empty =
            document.createElement(
                "p"
            );


        empty.textContent =
            "No nearby results found.";


        section.appendChild(
            empty
        );


        return section;

    }


    // --------------------------------
    // SHOW TOP 3
    // --------------------------------

    const visiblePlaces =
        places.slice(0, 3);


    visiblePlaces.forEach(
        function(place) {

            const card =
                createPlaceCard(
                    place
                );


            section.appendChild(
                card
            );

        }
    );


    // --------------------------------
    // MORE RESULTS
    // --------------------------------

    if (places.length > 3) {

        const more =
            document.createElement(
                "p"
            );


        more.className =
            "nearby-more";


        more.textContent =
            "+" +
            (places.length - 3) +
            " more nearby";


        section.appendChild(
            more
        );

    }


    return section;

}


// ========================================
// CREATE PLACE CARD
// ========================================

function createPlaceCard(
    place
) {

    const card =
        document.createElement(
            "div"
        );


    card.className =
        "nearby-place-card";


    // --------------------------------
    // NAME
    // --------------------------------

    const name =
        document.createElement(
            "h4"
        );


    name.textContent =
        place.name ||
        "Emergency resource";


    card.appendChild(
        name
    );


    // --------------------------------
    // ADDRESS
    // --------------------------------

    const address =
        document.createElement(
            "p"
        );


    address.textContent =
        "📍 " +
        (
            place.address ||
            "Address unavailable"
        );


    card.appendChild(
        address
    );


    // --------------------------------
    // DISTANCE
    // --------------------------------

    const distance =
        document.createElement(
            "p"
        );


    if (
        typeof place.distanceKm ===
        "number"
    ) {

        distance.textContent =
            "📏 " +
            formatDistance(
                place.distanceKm
            );

    }


    card.appendChild(
        distance
    );


    // --------------------------------
    // DIRECTIONS BUTTON
    // --------------------------------

    if (place.mapsUrl) {

        const directions =
            document.createElement(
                "a"
            );


        directions.href =
            place.mapsUrl;


        directions.target =
            "_blank";


        directions.rel =
            "noopener noreferrer";


        directions.className =
            "map-btn";


        directions.textContent =
            "🗺️ GET DIRECTIONS";


        card.appendChild(
            directions
        );

    }


    return card;

}


// ========================================
// FORMAT DISTANCE
// ========================================

function formatDistance(
    distanceKm
) {

    if (
        distanceKm < 1
    ) {

        return (
            Math.round(
                distanceKm * 1000
            ) +
            " m away"
        );

    }


    return (
        distanceKm.toFixed(1) +
        " km away"
    );

}


// ========================================
// NEARBY HOSPITALS
// ========================================

function openNearbyHospitals() {

    if (
        userLatitude === null ||
        userLongitude === null
    ) {

        alert(
            "📍 Please find your location first."
        );

        return;

    }


    const url =
        "https://www.google.com/maps/search/hospitals/@" +
        userLatitude +
        "," +
        userLongitude +
        ",14z";


    window.open(
        url,
        "_blank"
    );

}


// ========================================
// NEARBY BLOOD BANKS
// ========================================

function openNearbyBloodBanks() {

    if (
        userLatitude === null ||
        userLongitude === null
    ) {

        alert(
            "📍 Please find your location first."
        );

        return;

    }


    const url =
        "https://www.google.com/maps/search/blood+banks/@" +
        userLatitude +
        "," +
        userLongitude +
        ",14z";


    window.open(
        url,
        "_blank"
    );

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
        "https://www.google.com/maps/@" +
        userLatitude +
        "," +
        userLongitude +
        ",14z";


    window.open(
        url,
        "_blank"
    );

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
