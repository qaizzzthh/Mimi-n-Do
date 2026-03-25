let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function showSlide(index) {
    // Reset index jika melebihi jumlah slide
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;

    // Sembunyikan semua slide dan nonaktifkan dot
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => {
        dot.classList.remove('active-dot');
    });

    // Tampilkan slide yang aktif
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active-dot');
}

function changeSlide(n) {
    currentSlide += n;
    showSlide(currentSlide);
    resetTimer();
}

function setSlide(n) {
    currentSlide = n;
    showSlide(currentSlide);
    resetTimer();
}

function startTimer() {
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 3500);
}

function resetTimer() {
    clearInterval(slideInterval);
    startTimer();
}

// Mulai slider otomatis saat halaman dimuat
window.onload = startTimer;