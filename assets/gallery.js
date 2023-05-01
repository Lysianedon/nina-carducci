//------------------------------ GALERIE PORTFOLIO ------------------------------
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const gallery = document.querySelector('.gallery-images');
const images = document.querySelectorAll('.gallery-item');
let filteredImages = [...images];
//---------- FILTER IMAGES BY CATEGORY ----------
const filterGalleryImages = () => {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      gallery.style.opacity = 0;
      filterButtons.forEach(button => {
        button.classList.toggle('btn-active', e.target === button);
      });
      // show filtered images after delay
      setTimeout(() => {
        if (e.target.value.toLowerCase() === 'tous') {
          filteredImages = [...images];
        } else {
          filteredImages = [...document.querySelectorAll(`[data-gallery-tag="${e.target.value}"]`)];
        }
        images.forEach(img => img.style.display = filteredImages.includes(img) ? 'initial' : 'none');
        // show gallery
        gallery.style.opacity = 1;
      }, 300);
    });
  });
};
filterGalleryImages();
// ------------------- CAROUSEL GALLERY (W/ OVERLAY) ---------------------- 
const carouselGallery = document.querySelector(".small-carousel-gallery");
const carouselImage = document.querySelector(".carousel-image");
const overlay = document.querySelector(".overlay");
const previous = document.querySelector(".small-carousel-gallery .arrow.left");
const next = document.querySelector(".arrow.right");
let isGalleryOpen = false;

const openGallery = (img) => {
  isGalleryOpen = true;
  carouselImage.src = img.src;
  carouselImage.alt = img.alt;
  overlay.style.display = "initial";
  carouselGallery.style.display = "initial";
}
const closeGallery = ( ) => {
  overlay.style.display = "none";
  carouselGallery.style.display = "none";
  isGalleryOpen = false;
}

overlay.addEventListener("click", () => {
  if(isGalleryOpen) closeGallery();
})

images.forEach(img => {
  document.addEventListener("click", (e) => {
    if (e.target === img) {
      openGallery(img);      
    }
  })
})

previous.addEventListener("click", () => {
  const currentImg = filteredImages.find(img => img.src === carouselImage.src);
  currentImgPosition = filteredImages.indexOf(currentImg);
  const previousImage = filteredImages[currentImgPosition - 1];
  if (!previousImage) { // reached first image, loop back to last image
    carouselImage.src = filteredImages[filteredImages.length - 1].src;
    carouselImage.alt = imfilteredImagesagesArr[filteredImages.length - 1].alt;
  } else { // go to previous image
    carouselImage.src = previousImage.src;
    carouselImage.alt = previousImage.alt;
  }
});

next.addEventListener("click", () => {
  const currentImg = filteredImages.find(img => img.src === carouselImage.src);
  currentImgPosition = filteredImages.indexOf(currentImg);
  const nextImage = filteredImages[currentImgPosition + 1];
  if (!nextImage) { // reached last image, loop back to first image
    carouselImage.src = filteredImages[0].src;
    carouselImage.alt = filteredImages[0].alt;
  } else { // go to next image
    carouselImage.src = nextImage.src;
    carouselImage.alt = nextImage.alt;
  }
});