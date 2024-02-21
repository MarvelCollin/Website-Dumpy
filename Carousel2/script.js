let currentSlide = 0;
const images = document.querySelectorAll(".carousel-items");

function hidden(){
    images.forEach(element => {
        element.style.display = 'none';
    });
    images[currentSlide].style.display = 'block';
}

function nextSlide(){
    currentSlide++;
    hidden();
}

function prevSlide(){
    currentSlide--;
    hidden();
}