let slideIndex = 1;
let showSlide = (n) => {
  let slidesArr = document.getElementsByClassName("slider-image"); //get the vectors
  let dots = document.getElementsByClassName("dot"); //get the dots
  // remove all the vectors
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

showSlide(slideIndex);
