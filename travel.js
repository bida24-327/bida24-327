// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu functionality
    const menuBtn = document.querySelector('.menu-btn');
    const navigation = document.querySelector('.navigation');
    
    if (menuBtn && navigation) {
        menuBtn.addEventListener('click', function() {
            navigation.classList.toggle('active');
        });
        
        // Close menu when clicking on navigation links
        const navLinks = document.querySelectorAll('.navigation-items a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navigation.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navigation.contains(e.target) && !menuBtn.contains(e.target)) {
                navigation.classList.remove('active');
            }
        });
    }
    
    // Gallery lightbox functionality
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    if (galleryImages.length > 0) {
        // Create lightbox elements
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <span class="close-btn">&times;</span>
                <img class="lightbox-img" src="" alt="">
            </div>
        `;
        document.body.appendChild(lightbox);
        
        const lightboxImg = lightbox.querySelector('.lightbox-img');
        const closeBtn = lightbox.querySelector('.close-btn');
        
        // Add lightbox styles
        const lightboxStyles = `
            .lightbox {
                display: none;
                position: fixed;
                z-index: 9999;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.9);
                justify-content: center;
                align-items: center;
            }
            
            .lightbox-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .lightbox-img {
                width: 100%;
                height: auto;
                max-height: 80vh;
                object-fit: contain;
                border-radius: 10px;
            }
            
            .close-btn {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 35px;
                font-weight: bold;
                cursor: pointer;
                transition: 0.3s ease;
            }
            
            .close-btn:hover {
                color: #2bdaf1;
                transform: scale(1.2);
            }
        `;
        
        // Add styles to head
        const styleSheet = document.createElement('style');
        styleSheet.textContent = lightboxStyles;
        document.head.appendChild(styleSheet);
        
        // Add click event to gallery images
        galleryImages.forEach(img => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                lightbox.style.display = 'flex';
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
            });
        });
        
        // Close lightbox events
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
        
        // Close lightbox with escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
            }
        });
    }
    
    // Feedback form functionality
    const feedbackForm = document.querySelector('.feedback-form form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const rating = document.getElementById('rating').value;
            const comments = document.getElementById('comments').value;
            
            // Basic validation
            if (!name || !email || !rating || !comments) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you ${name}! Your feedback has been submitted successfully.`);
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for smooth loading
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
    
    // Add hover effects to social media icons
    const mediaIcons = document.querySelectorAll('.media-icons a');
    mediaIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Video controls for better performance
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        // Pause video when not in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        });
        
        observer.observe(video);
    });
    
    // Add animation to elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.gallery-grid img, .content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize animation styles
    const elementsToAnimate = document.querySelectorAll('.gallery-grid img, .content');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    console.log('Travel website JavaScript loaded successfully!');
});
