var goButton = document.getElementById("start-btn");

goButton.addEventListener('click', getLocation);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(toHomePage);      
    } else { 
        //TODO: what happens if user denies access?
    }
}

function toHomePage() {
    location.href = "html/home.html";

}