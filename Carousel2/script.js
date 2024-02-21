// declare untuk set point awal dari index carousel
let currentSlide = 0;

// ambil semua .carousel.items, kita masukan kedalam array images
const images = document.querySelectorAll(".carousel-items");

// length ini untuk membaca seberapa banyak .carousel-items
// kita ada di html
const length = images.length;

// disini adalah function untuk hide semua images dan cuman 
// show 1 saja (bagian current index)
function hidden(){
    images.forEach(element => {
        element.style.display = 'none';
    });
    images[currentSlide].style.display = 'block';
}

function nextSlide(){
    currentSlide = (currentSlide + 1) % length;
    hidden();
}

function prevSlide(){
    currentSlide = (currentSlide - 1 + length) % length;
    hidden();
}
