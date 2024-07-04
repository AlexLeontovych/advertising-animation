document.addEventListener('DOMContentLoaded', function() {
    const firstImage = document.querySelector('.carousel-image');
    firstImage.classList.add('active');
    
    flyIn(() => {
        startCarousel();
        setTimeout(() => {
            activateFirstParagraph();
            showControlsAndText();

            setTimeout(() => {
                const details = document.querySelector('.details');
                details.style.opacity = '0';
                details.style.color = "black";
            }, 0); 
            details.style.opacity = '1';
        }, 1000);
    });
});

let manualControl = false; 
let intervalId;
let animationInProgress = false; 


function flyIn(callback) {
    const textImageWrapper = document.querySelector('.text-image-wrapper');
    const flyInImage = document.querySelector('.fly-in-image');
    const firstImage = document.querySelector('.carousel-image.active');
    
    textImageWrapper.style.left = '0';
    
    setTimeout(() => {
        flyInImage.style.left = '0';
        flyInImage.style.bottom = '95%';

        const additionalTexts = document.querySelectorAll('.additional-text1');
        const additionalTexts2 = document.querySelectorAll('.additional-text2');
        const additionalTexts3 = document.querySelectorAll('.additional-text3');
        additionalTexts.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('show');
            }, (index + 1) * 500);
        });
        additionalTexts2.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('show');
            }, (index + 1) * 700);
        });
        additionalTexts3.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('show');
            }, (index + 1) * 900);
        });

        const whiteBlock = document.querySelector('.white-block');
        const lastAnimationDelay = (additionalTexts3.length * 900) + 100;
        setTimeout(() => {
            whiteBlock.style.display = 'block';
            setTimeout(() => {
                whiteBlock.classList.add('show');
                firstImage.classList.add('scale-down');
                
                if (typeof callback === 'function') {
                    callback();
                }

                setTimeout(() => {
                    document.querySelectorAll('.fly-in-text, .fly-in-text-second').forEach((el) => {
                        el.style.display = 'none';
                    });
                }, 1000);
                
            }, 50);
        }, lastAnimationDelay + 500);
    }, 2000);
}

function activateFirstParagraph() {
    const firstParagraph = document.querySelector('.paragraph-container p:first-child');
    firstParagraph.classList.add('active');
    firstParagraph.parentElement.classList.add('show');
}

function showControlsAndText() {
    const buttons = document.querySelectorAll('button');
    const currentImageText = document.querySelector('.current-image-text');
    
    buttons.forEach(button => button.classList.add('show'));
    currentImageText.textContent = `1/${carouselImages.length}`; 
    currentImageText.classList.add('show');
}

document.querySelector('.prev-button').addEventListener('click', () => {
    manualControl = true;
    stopCarousel();
    if (!animationInProgress) {
        switchImage('prev');
    }
});

document.querySelector('.next-button').addEventListener('click', () => {
    manualControl = true;
    stopCarousel();
    if (!animationInProgress) {
        switchImage('next');
    }
});

let currentImageIndex = 0;
const carouselImages = document.querySelectorAll('.carousel-image');
const totalCarouselImages = carouselImages.length;

function switchImage(direction) {
    if (animationInProgress) return; 

    animationInProgress = true; 

    const currentImage = carouselImages[currentImageIndex];
    currentImage.classList.remove('active');

    if (direction === 'next') {
        currentImageIndex = (currentImageIndex + 1) % totalCarouselImages;
    } else if (direction === 'prev') {
        currentImageIndex = (currentImageIndex - 1 + totalCarouselImages) % totalCarouselImages;
    }

    const nextImage = carouselImages[currentImageIndex];
    nextImage.classList.add('active');


    const currentImageText = document.querySelector('.current-image-text');
    currentImageText.textContent = `${currentImageIndex + 1}/${totalCarouselImages}`;

    switchParagraph(currentImageIndex, direction);
}

document.querySelector('.learn-more').addEventListener('click', () => {
    window.location.href = '404.html';
});

function startCarousel() {
    if (!manualControl) {
        intervalId = setInterval(() => {
            switchImage('next');
        }, 5000);
    }
}

function stopCarousel() {
    clearInterval(intervalId);
}

let currentParagraphIndex = 0;
const paragraphs = document.querySelectorAll('.paragraph-container p');
const totalParagraphs = paragraphs.length;

for (let i = 0; i < totalParagraphs; i++) {
    if (i === 0) {
        paragraphs[i].classList.add('active');
    } else {
        paragraphs[i].classList.remove('active');
    }
}

function switchParagraph(newIndex, direction) {
    const currentParagraph = paragraphs[currentParagraphIndex];
    const nextParagraph = paragraphs[newIndex];

    currentParagraph.classList.add('fade-out');
    currentParagraph.classList.remove('active');

    if (direction === 'next') {
        nextParagraph.classList.add('slide-in-left');
    } else if (direction === 'prev') {
        nextParagraph.classList.add('slide-in-right');
    }

    nextParagraph.classList.add('active');

    setTimeout(() => {
        currentParagraph.classList.remove('fade-out');
        nextParagraph.classList.remove('slide-in-left', 'slide-in-right');
        currentParagraphIndex = newIndex;

        animationInProgress = false; 
    }, 1000); 
}
