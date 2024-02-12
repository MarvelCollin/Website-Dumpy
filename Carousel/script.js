const carousel = document.querySelector(".carousel");
let carouselItems = document.querySelectorAll(".carousel__item");
const [btnLeftCarousel, btnRightCarousel] = document.querySelectorAll(
  ".carousel-button"
);
let carouselCount = carouselItems.length;
let pos = 0;
let translateY = 0;

btnLeftCarousel.addEventListener("click", () => {
  pos = (pos - 1 + carouselCount) % carouselCount;
  translateY += 10;
  updateCarousel();
});

btnRightCarousel.addEventListener("click", () => {
  pos = (pos + 1) % carouselCount;
  translateY += 10;
  updateCarousel();
});

function updateCarousel() {
  carouselItems.forEach((item, index) => {
    const isActive = index === pos;
    item.classList.toggle("active", isActive);
    item.style.transform = `translateY(${isActive ? translateY : 0}px) scale(${isActive ? 1 : 0.9})`;
  });
}