//------------------------------ GALERIE PORTFOLIO ------------------------------
const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
const gallery = document.querySelector('.gallery-images');
const images = document.querySelectorAll('.gallery-item');
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
        let filteredImages;
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
  const imagesArr = Array.from(images);
  const currentImg = imagesArr.find(img => img.src === carouselImage.src);
  currentImgPosition = imagesArr.indexOf(currentImg);
  const previousImage = imagesArr[currentImgPosition - 1];
  if (!previousImage) { // reached first image, loop back to last image
    carouselImage.src = imagesArr[imagesArr.length - 1].src;
    carouselImage.alt = imagesArr[imagesArr.length - 1].alt;
  } else { // go to previous image
    carouselImage.src = previousImage.src;
    carouselImage.alt = previousImage.alt;
  }
});

next.addEventListener("click", () => {
  const imagesArr = Array.from(images);
  const currentImg = imagesArr.find(img => img.src === carouselImage.src);
  currentImgPosition = imagesArr.indexOf(currentImg);
  const nextImage = imagesArr[currentImgPosition + 1];
  if (!nextImage) { // reached last image, loop back to first image
    carouselImage.src = imagesArr[0].src;
    carouselImage.alt = imagesArr[0].alt;
  } else { // go to next image
    carouselImage.src = nextImage.src;
    carouselImage.alt = nextImage.alt;
  }
});