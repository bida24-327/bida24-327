  document.getElementById('contactForm').addEventListener('submit'), function (event){
            event.preventDefault(); // Prevent the default form submission
  }
  galleryImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the link from navigating
            lightbox.style.display = 'flex';
            lightboxImg.src = this.href;
        });
    });

    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
