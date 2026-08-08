/* =================================
   FIRST RESQ JAVASCRIPT
================================= */


/* EMERGENCY ALERT */

function sendAlert() {

    alert(
        "🚨 Emergency Alert Sent!\n\n" +
        "Please contact the appropriate official emergency service immediately."
    );

}


/* FIND NEARBY HOSPITALS */

function findHospitals() {

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const mapURL =
                    "https://www.google.com/maps/search/hospitals/" +
                    "@" +
                    latitude +
                    "," +
                    longitude +
                    ",14z";

                window.open(mapURL, "_blank");

            },

            function() {

                window.open(
                    "https://www.google.com/maps/search/hospitals+near+me",
                    "_blank"
                );

            }

        );

    } else {

        window.open(
            "https://www.google.com/maps/search/hospitals+near+me",
            "_blank"
        );

    }

}


/* FIND BLOOD BANKS */

function findBloodBanks() {

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const mapURL =
                    "https://www.google.com/maps/search/blood+banks/" +
                    "@" +
                    latitude +
                    "," +
                    longitude +
                    ",14z";

                window.open(mapURL, "_blank");

            },

            function() {

                window.open(
                    "https://www.google.com/maps/search/blood+banks+near+me",
                    "_blank"
                );

            }

        );

    } else {

        window.open(
            "https://www.google.com/maps/search/blood+banks+near+me",
            "_blank"
        );

    }

}


/* PAGE LOADED */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        console.log("First ResQ website loaded successfully.");

    }
);