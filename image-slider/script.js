const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dots = document.querySelectorAll(".dot");
const slider = document.querySelector(".slider");

let index = 0;
let autoSlide;

// Show Slide
function showSlide(i) {

    if (i >= images.length) index = 0;
    if (i < 0) index = images.length - 1;

    slides.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");
}

// Next Slide
function nextSlide() {
    index++;
    showSlide(index);
}

// Previous Slide
function prevSlide() {
    index--;
    showSlide(index);
}

// Buttons
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Dots
dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        showSlide(index);
    });
});

// Auto Play
function startAutoSlide() {
    autoSlide = setInterval(() => {
        nextSlide();
    }, 3000);
}

// Stop Auto Play
function stopAutoSlide() {
    clearInterval(autoSlide);
}

// Pause on Hover
slider.addEventListener("mouseenter", stopAutoSlide);
slider.addEventListener("mouseleave", startAutoSlide);

// Keyboard Support
document.addEventListener("keydown", (e) => {

    if (e.key === "ArrowRight") {
        nextSlide();
    }

    if (e.key === "ArrowLeft") {
        prevSlide();
    }

});

// Touch Swipe Support
let startX = 0;
let endX = 0;

slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
});

slider.addEventListener("touchend", (e) => {

    endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        nextSlide();
    }

    if (endX - startX > 50) {
        prevSlide();
    }

});

// Initialize
showSlide(index);
startAutoSlide();