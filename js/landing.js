var goButton = document.getElementById("start-btn");

goButton.addEventListener('click', getLocation);

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(toHomePage);
        
       
    } else { 
    
    }
}

function toHomePage(position) {
    location.href = "html/home.html";

}