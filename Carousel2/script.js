// declare untuk set point awal dari index carousel
let currentSlide = 0;

// kita kasi listener "DomContentLoaded" yang artinya ketika
// user membuka web kita langsung menjalankan function dibawah ini
document.addEventListener("DOMContentLoaded", function() {
    // ini adalah function untuk menyembunyikan image
    // bisa dilihat dibawah 
    hidden();
})

// ambil semua .carousel.items, kita masukan kedalam array images
const images = document.querySelectorAll(".carousel-items");

// length ini untuk membaca seberapa banyak .carousel-items
// kita ada di html
const length = images.length;

// disini adalah function untuk hide semua images dan cuman 
// show 1 saja (bagian current index)
function hidden(){
    // foreach disini gunanya untuk loop 1 1 
    images.forEach(element => {
        // disini kita buat 1 per 1 displaynya none
        // atau artinya jadi hilang
        element.style.display = 'none';
    });

    // nah karena tadi kita udah display none semuanya
    // maka kita mau yang currentSlide di nyalakan lagi
    images[currentSlide].style.display = 'block';
}

// function untuk button next
function nextSlide(){
    // ini adalah validasi supaya kalau kita tekan nextnya
    // si currentSlide tidak melewati angka size(length)nya 
    // makanya kita modulo
    currentSlide = (currentSlide + 1) % length;
    hidden();
}

// function untuk previous 
function prevSlide(){
    // kita ambil contoh jika currentSliide = 2 (index 2)
    // length = 3 (total images)
    // (2 - 1 + 3) % 3
    // 4 % 3 = 1 (maka benar, ketika kita tekan prev akan ke index 1)
    currentSlide = (currentSlide - 1 + length) % length;
    hidden();
}
