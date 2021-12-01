<<<<<<< HEAD
var goButton = document.getElementById("start-btn");
goButton.addEventListener('click', toHomePage);

function toHomePage() {
    location.href = "html/home.html";

}
=======
let slideIndex = 0;
let showSlide = (n) => {
  let slidesArr = document.getElementsByClassName("slider-image"); //get the vectors
  let dots = document.getElementsByClassName("dot"); //get the dots
  // remove all the vectors
  if (n === 5) {
    slideIndex = 0;
    n = 1;
  }
  for (let i = 0; i < slidesArr.length; i++) {
    slidesArr[i].style.display = "none";
  }
  // remove the active mode for all the dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }
  slidesArr[n - 1].style.display = "block"; //the first slide will appear
  dots[n - 1].classList.add("active"); // the dot will be in active mode
};
showSlide(1);

setInterval(() => {
  slideIndex++;
  showSlide(slideIndex);
}, 3000);
>>>>>>> c6f084a660991fdc83fd43ebccc42eb2e81f0ff6
