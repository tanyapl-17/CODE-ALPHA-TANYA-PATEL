const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

const IMAGE_COUNT = 75; // Set to 75 to exceed your 70 minimum

function createGallery() {
    for (let i = 1; i <= IMAGE_COUNT; i++) {
        const item = document.createElement('div');
        item.classList.add('gallery-item');

        const img = document.createElement('img');
        
        // Using Picsum Photos (Reliable & Free)
        // We use ?random= and the loop index 'i' to ensure 75 different images
        img.src = `https://picsum.photos/500/600?random=${i}`;
        img.alt = `Gallery Photo ${i}`;
        img.loading = "lazy"; // Better performance

        // Open Lightbox on Click
        item.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
        });

        item.appendChild(img);
        gallery.appendChild(item);
    }
}

// Close Lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Close when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});

// Start the gallery
createGallery();