// Enhanced JavaScript for CloudTribe AI Labs Website

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        width: 0%;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        z-index: 1001;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress bar on scroll
    window.addEventListener('scroll', function() {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / scrollable) * 100;
        progressBar.style.width = progress + '%';
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (!targetElement) return;
            
            // Close mobile menu if open
            const menu = document.getElementById('menu');
            if (window.innerWidth < 960 && menu && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
            
            // Smooth scroll with easing
            const startPosition = window.pageYOffset;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
            const distance = targetPosition - startPosition;
            let startTime = null;
            
            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, 1000);
                window.scrollTo(0, run);
                if (timeElapsed < 1000) requestAnimationFrame(animation);
            }
            
            // Easing function
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        });
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card-3d, .about-content p, .about-img, .value-item, .testimonial-card');
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Initial setup - hide elements
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.style.transitionDelay = (index % 3) * 0.1 + 's';
    });
    
    // Function to reveal elements
    function revealOnScroll() {
        revealElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
    // Initial check
    revealOnScroll();
}

// ===== FORM VALIDATION =====
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const formInputs = contactForm.querySelectorAll('.form-control');
    
    // Add floating label effect
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
            validateInput(this);
        });
        
        // Check if input has value on load
        if (input.value !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Input validation function
    function validateInput(input) {
        const parent = input.parentElement;
        
        // Remove existing validation message
        const existingMsg = parent.querySelector('.validation-message');
        if (existingMsg) {
            parent.removeChild(existingMsg);
        }
        
        let isValid = true;
        let message = '';
        
        // Validation rules
        if (input.value.trim() === '') {
            isValid = false;
            message = 'This field is required';
        } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
        
        // Update input styling
        if (!isValid) {
            input.classList.add('invalid');
            input.classList.remove('valid');
            
            // Add validation message
            const validationMsg = document.createElement('div');
            validationMsg.className = 'validation-message';
            validationMsg.textContent = message;
            validationMsg.style.color = '#ef4444';
            validationMsg.style.fontSize = '0.8rem';
            validationMsg.style.marginTop = '5px';
            
            parent.appendChild(validationMsg);
        } else {
            input.classList.remove('invalid');
            input.classList.add('valid');
        }
        
        return isValid;
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isFormValid = true;
        
        // Validate all inputs
        formInputs.forEach(input => {
            if (!validateInput(input)) {
                isFormValid = false;
            }
        });
        
        if (isFormValid) {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Success message
                contactForm.innerHTML = `
                    <div class="success-message">
                        <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                        <h3>Thank You!</h3>
                        <p>Your message has been sent successfully. We'll get back to you soon.</p>
                    </div>
                `;
                
                // Style success message
                const successMessage = contactForm.querySelector('.success-message');
                successMessage.style.textAlign = 'center';
                successMessage.style.padding = '2rem';
                
                const successIcon = contactForm.querySelector('.success-icon');
                successIcon.style.fontSize = '3rem';
                successIcon.style.color = 'var(--success)';
                successIcon.style.marginBottom = '1rem';
                
                // Add confetti effect
                createConfetti();
            }, 1500);
        }
    });
    
    // Confetti effect
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        document.body.appendChild(confettiContainer);
        
        const colors = ['#2563eb', '#4f46e5', '#10b981', '#ffffff', '#f472b6'];
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const posX = Math.random() * 100;
            const delay = Math.random() * 3;
            const rotation = Math.random() * 360;
            
            confetti.style.cssText = `
                position: absolute;
                top: -20px;
                left: ${posX}%;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                opacity: 0.8;
                transform: rotate(${rotation}deg);
                animation: confettiFall 3s ease-in forwards ${delay}s;
            `;
            
            confettiContainer.appendChild(confetti);
        }
        
        // Add confetti animation to stylesheet
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0); opacity: 1; }
                100% { transform: translateY(1000px) rotate(720deg); opacity: 0; }
            }
        `;
        document.head.appendChild(styleSheet);
        
        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 6000);
    }
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    // Only on desktop
    if (window.innerWidth < 768 || !('ontouchstart' in document.documentElement)) {
        const cursor = document.querySelector('.custom-cursor');
        if (!cursor) return;
        
        document.addEventListener('mousemove', e => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursor.style.opacity = '1';
        });
        
        // Enlarge cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .service-card-3d, .project-card, .carousel-btn, .dot');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'var(--primary)';
                cursor.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'var(--primary)';
                cursor.style.backgroundColor = 'transparent';
            });
        });
        
        // Add click effect
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(0.9)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.2)';
            setTimeout(() => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 200);
        });
        
        // Hide when cursor leaves the window
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // Show when cursor enters the window
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
        });
    }
}

// ===== PRELOADER FUNCTION =====
function createPreloader() {
    // Show preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="logo-3d">
                <div class="cloud-icon">
                    <i class="fas fa-cloud"></i>
                </div>
                <div class="logo-particles"></div>
            </div>
            <h2 class="loading-text">CloudTribe AI Labs</h2>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
        </div>
    `;
    document.body.appendChild(preloader);
    
    // Create particles for logo
    const logoParticles = preloader.querySelector('.logo-particles');
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'logo-particle';
        
        // Random size and position
        const size = Math.random() * 5 + 3;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 60 + 30;
        const x = Math.cos(angle) * distance + 75;
        const y = Math.sin(angle) * distance + 75;
        
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animationDelay = (Math.random() * 3) + 's';
        
        logoParticles.appendChild(particle);
    }
    
    // Simulate loading progress
    let progress = 0;
    const loadingProgress = preloader.querySelector('.loading-progress');
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        
        if (progress === 100) {
            clearInterval(progressInterval);
            
            // Hide preloader after loading completes
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                
                // Remove preloader after fade out
                setTimeout(() => {
                    preloader.remove();
                    document.body.classList.add('loaded');
                }, 800);
            }, 1000);
        }
    }, 200);
}

// ===== NAVIGATION FUNCTIONS =====
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
        
    // Add active class to current menu item
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== HEADER SCROLL EFFECT =====
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// ===== HERO 3D EFFECTS =====
function initHero3DEffects() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create glowing particles
    const glowingParticles = hero.querySelector('.glowing-particles');
    if (glowingParticles) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = Math.random() * 0.5 + 0.3;
            const animationDuration = Math.random() * 20 + 10;
            const animationDelay = Math.random() * 10;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, ${opacity});
                border-radius: 50%;
                top: ${posY}%;
                left: ${posX}%;
                animation: particleFloat ${animationDuration}s infinite ease-in-out ${animationDelay}s;
            `;
            
            glowingParticles.appendChild(particle);
        }
    }
    
    // Add mouse move parallax effect
    hero.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const cubes = document.querySelectorAll('.floating-cube');
        const spheres = document.querySelectorAll('.floating-sphere');
        
        cubes.forEach((cube, index) => {
            const factorX = (index + 1) * 20;
            const factorY = (index + 1) * 25;
            cube.style.transform = `translate(${mouseX * factorX}px, ${mouseY * factorY}px) rotateX(${mouseY * 45}deg) rotateY(${mouseX * 45}deg)`;
        });
        
        spheres.forEach((sphere, index) => {
            const factorX = (index + 1) * 15;
            const factorY = (index + 1) * 20;
            sphere.style.transform = `translate(${mouseX * factorX}px, ${mouseY * factorY}px) scale(${1 + mouseY * 0.2})`;
            sphere.style.boxShadow = `0 0 ${30 + mouseX * 20}px rgba(37, 99, 235, ${0.3 + mouseY * 0.2})`;
        });
    });
}

// ===== SERVICES 3D CARDS =====
function initServices3DCards() {
    const serviceCards = document.querySelectorAll('.service-card-3d');
    
    serviceCards.forEach(card => {
        // Track if card is currently flipped
        let isFlipped = false;
        const cardInner = card.querySelector('.card-inner');
        
        // Reset to initial state
        if (cardInner) {
            cardInner.style.transform = '';
        }
        
        // Click event to flip card
        card.addEventListener('click', function(e) {
            if (!cardInner) return;
            
            // Only flip the card if we're not interacting with any buttons/links inside
            if (e.target.tagName.toLowerCase() !== 'a' && 
                e.target.tagName.toLowerCase() !== 'button') {
                isFlipped = !isFlipped;
                
                if (isFlipped) {
                    cardInner.style.transform = 'rotateY(180deg)';
                } else {
                    cardInner.style.transform = 'rotateY(0)';
                }
            }
        });
        
        // 3D tilt effect on mousemove
        card.addEventListener('mousemove', function(e) {
            // Only add tilt effect if not in mobile view and card is not flipped
            if (window.innerWidth > 768 && !isFlipped) {
                const cardRect = card.getBoundingClientRect();
                const cardX = cardRect.left + cardRect.width / 2;
                const cardY = cardRect.top + cardRect.height / 2;
                
                const mouseX = e.clientX - cardX;
                const mouseY = e.clientY - cardY;
                
                const rotateY = mouseX * 0.05;
                const rotateX = -mouseY * 0.05;
                
                if (!cardInner) return;
                
                cardInner.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            }
        });
        
        // Reset transform on mouseleave
        card.addEventListener('mouseleave', function() {
            if (!cardInner) return;
            
            // Reset to original state or flipped state
            if (isFlipped) {
                cardInner.style.transform = 'rotateY(180deg)';
            } else {
                cardInner.style.transform = 'rotateY(0) rotateX(0)';
            }
        });
        
        // For buttons in back of card
        const backButtons = card.querySelectorAll('.card-back a, .card-back button');
        backButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                // Stop propagation to prevent the card from flipping back
                e.stopPropagation();
            });
        });
    });
}

// ===== PROJECTS 3D CAROUSEL =====
function initProjects3DCarousel() {
    const carousel = document.querySelector('.carousel-3d');
    if (!carousel) return;
    
    const slides = document.querySelectorAll('.project-card');
    const totalSlides = slides.length;
    if (totalSlides === 0) return;
    
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    let autoPlayInterval;
    
    // Function to update carousel
    function updateCarousel() {
        // Update active slide
        slides.forEach((slide, index) => {
            const position = (index - currentSlide + totalSlides) % totalSlides;
            
            if (position === 0) {
                // Center slide
                slide.style.transform = 'rotateY(0) translateZ(300px)';
                slide.style.opacity = '1';
                slide.style.zIndex = '3';
            } else if (position === 1 || position === totalSlides - 1) {
                // Side slides
                const direction = position === 1 ? 1 : -1;
                slide.style.transform = `rotateY(${direction * 45}deg) translateZ(150px) translateX(${direction * 200}px)`;
                slide.style.opacity = '0.7';
                slide.style.zIndex = '2';
            } else {
                // Hidden slides
                slide.style.transform = 'rotateY(0) translateZ(0)';
                slide.style.opacity = '0';
                slide.style.zIndex = '1';
            }
        });
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Initialize carousel
    updateCarousel();
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
            resetAutoPlay();
        });
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carousel.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const threshold = 50;
        
        if (touchEndX < touchStartX - threshold) {
            // Swipe left - next slide
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe right - previous slide
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
            resetAutoPlay();
        }
    }
    
    // Auto play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }, 5000);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Start auto play
    startAutoPlay();
    
    // Pause auto play on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
    carousel.addEventListener('mouseleave', startAutoPlay);
}

// ===== ANIMATED STATS COUNTER =====
function initAnimatedStats() {
    const statItems = document.querySelectorAll('.stat-number');
    const statBars = document.querySelectorAll('.stat-progress');
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Animate counter
    function animateCounter(el) {
        if (el.classList.contains('counted')) return;
        
        el.classList.add('counted');
        
        const target = parseInt(el.dataset.target);
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // Update every ~16ms for 60fps
        
        const counter = setInterval(() => {
            count += increment;
            
            if (count >= target) {
                count = target;
                clearInterval(counter);
            }
            
            el.textContent = Math.floor(count);
        }, 16);
    }
    
    // Animate progress bar
    function animateProgressBar(el) {
        if (el.classList.contains('animated')) return;
        
        el.classList.add('animated');
        
        const statItem = el.closest('.stat-item');
        if (!statItem) return;
        
        const statNumber = statItem.querySelector('.stat-number');
        if (!statNumber) return;
        
        const maxValue = parseInt(statNumber.dataset.target);
        let percentage;
        
        // Calculate percentage based on max values
        if (maxValue <= 10) {
            percentage = maxValue * 10;
        } else if (maxValue <= 100) {
            percentage = maxValue;
        } else {
            percentage = maxValue / 100;
        }
        
        // Cap percentage at 100%
        percentage = Math.min(percentage, 100);
        
        // Animate width
        el.style.width = percentage + '%';
    }
    
    // Check and animate stats on scroll
    function checkStats() {
        statItems.forEach(item => {
            if (isElementInViewport(item)) {
                animateCounter(item);
            }
        });
        
        statBars.forEach(bar => {
            if (isElementInViewport(bar)) {
                animateProgressBar(bar);
            }
        });
    }
    
    // Add floating particles to stats section
    const statSection = document.querySelector('.stats');
    if (statSection) {
        const particleContainer = statSection.querySelector('.particle-container');
        if (particleContainer) {
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'floating-particle';
                
                // Random size
                const size = Math.random() * 10 + 5;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                
                // Random position
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';
                
                // Random animation delay
                particle.style.animationDelay = (Math.random() * 5) + 's';
                
                particleContainer.appendChild(particle);
            }
        }
    }
    
    // Attach scroll listener
    window.addEventListener('scroll', checkStats);
    // Initial check
    checkStats();
}

// ===== TESTIMONIALS SLIDER =====
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const track = slider.querySelector('.testimonials-track');
    const slides = slider.querySelectorAll('.testimonial-card');
    const dots = slider.querySelectorAll('.testimonial-dots .dot');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');
    
    const slideWidth = 100; // 100%
    const totalSlides = slides.length;
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Set initial position
    track.style.width = (totalSlides * 100) + '%';
    slides.forEach(slide => {
        slide.style.width = (100 / totalSlides) + '%';
    });
    
    // Function to move to slide
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * slideWidth / totalSlides}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentSlide - 1);
            resetAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentSlide + 1);
            resetAutoSlide();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slider.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const threshold = 50;
        
        if (touchEndX < touchStartX - threshold) {
            // Swipe left - next slide
            goToSlide(currentSlide + 1);
            resetAutoSlide();
        } else if (touchEndX > touchStartX + threshold) {
            // Swipe right - previous slide
            goToSlide(currentSlide - 1);
            resetAutoSlide();
        }
    }
    
    // Auto slide functionality
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            goToSlide((currentSlide + 1) % totalSlides);
        }, 5000);
    }
    
    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }
    
    // Start auto slide
    startAutoSlide();
    
    // Pause auto slide on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);
}

// ===== PARTICLES BACKGROUND =====
function createParticlesBackground() {
    // Create particles in various sections
    createParticlesForSection('.hero-3d-background', 30);
    createParticlesForSection('.floating-elements', 20);
    createParticlesForSection('.light-rays', 15);
    createParticlesForSection('.about-shapes', 10);
    createParticlesForSection('.contact-shapes', 10);
    
    function createParticlesForSection(selector, count) {
        const section = document.querySelector(selector);
        if (!section) return;
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const opacity = Math.random() * 0.3 + 0.1;
            const animationDuration = Math.random() * 15 + 10;
            const animationDelay = Math.random() * 5;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background-color: rgba(255, 255, 255, ${opacity});
                border-radius: 50%;
                top: ${posY}%;
                left: ${posX}%;
                animation: particleFloat ${animationDuration}s infinite ease-in-out ${animationDelay}s;
            `;
            
            section.appendChild(particle);
        }
    }
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    // Skip on mobile for better performance
    if (window.innerWidth < 768) return;
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        
        // Hero section parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroElements = hero.querySelectorAll('.floating-cube, .floating-sphere');
            heroElements.forEach((element, index) => {
                const speed = 0.1 + (index * 0.05);
                const transform = element.style.transform.split(' translateY')[0]; // Remove previous translateY
                element.style.transform = transform + ` translateY(${scrollY * speed}px)`;
            });
        }
        
        // Services section parallax
        const services = document.querySelector('#services');
        if (services) {
            const floatElements = services.querySelectorAll('.float-element');
            floatElements.forEach((element, index) => {
                const speed = 0.05 + (index * 0.03);
                element.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }
        
        // Projects section parallax
        const projects = document.querySelector('#projects');
        if (projects) {
            const rays = projects.querySelectorAll('.light-ray');
            rays.forEach((ray, index) => {
                const speed = 0.08 + (index * 0.04);
                ray.style.transform = `rotate(-45deg) translateX(-50%) translateY(${scrollY * speed}px)`;
            });
        }
        
        // About section parallax
        const about = document.querySelector('#about');
        if (about) {
            const shapes = about.querySelectorAll('.about-shape');
            shapes.forEach((shape, index) => {
                const speed = 0.07 + (index * 0.03);
                shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02}deg)`;
            });
        }
        
        // Contact section parallax
        const contact = document.querySelector('#contact');
        if (contact) {
            const shapes = contact.querySelectorAll('.contact-shape');
            shapes.forEach((shape, index) => {
                const speed = 0.06 + (index * 0.02);
                shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * -0.01}deg)`;
            });
        }
    });
}

function initMobileNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('menu');
    
    if (!menuToggle || !menu) return;
    
    // Toggle menu on click
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = menuToggle.contains(event.target) || menu.contains(event.target);
        
        if (!isClickInside && menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
    
    // Close menu when clicking on a link
    const navLinks = menu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menu.classList.remove('active');
        });
    });
    
    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 960 && menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
}

// ===== EVENT LISTENERS =====

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ========== PRELOADER ==========
    createPreloader();
    
    // ========== INITIALIZE NAVIGATION ==========
    initNavigation();
    
    // ========== HEADER SCROLL EFFECT ==========
    initHeaderScroll();
    
    // ========== INITIALIZE HERO 3D EFFECTS ==========
    initHero3DEffects();
    
    // ========== INITIALIZE 3D SERVICES CARDS ==========
    initServices3DCards();
    
    // ========== INITIALIZE 3D PROJECTS CAROUSEL ==========
    initProjects3DCarousel();
    
    // ========== INITIALIZE ANIMATED STATS COUNTER ==========
    initAnimatedStats();
    
    // ========== INITIALIZE TESTIMONIALS SLIDER ==========
    initTestimonialsSlider();
    
    // ========== CREATE PARTICLES BACKGROUND ==========
    createParticlesBackground();
    
    // ========== ADD PARALLAX EFFECTS ON SCROLL ==========
    initParallaxEffects();
    
    // ========== SMOOTH SCROLL WITH PROGRESS ==========
    initSmoothScroll();
    
    // ========== SCROLL REVEAL ANIMATIONS ==========
    initScrollReveal();
    
    // ========== INITIALIZE FORM VALIDATION ==========
    initFormValidation();
    
    // ========== INITIALIZE BACK TO TOP BUTTON ==========
    initBackToTop();
    
    // ========== CUSTOM CURSOR EFFECT ==========
    initCustomCursor();

    // ========== MOBILE NAVIGATION ==========
    initMobileNavigation();
});

// Ensure everything is properly loaded
window.onload = function() {
    // Hide any remaining preloader
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
    
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Initialize newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() !== '') {
                // Show success message
                const originalContent = this.innerHTML;
                this.innerHTML = '<p class="success-message">Thank you for subscribing!</p>';
                setTimeout(() => {
                    this.innerHTML = originalContent;
                    emailInput.value = '';
                }, 3000);
            }
        });
    }
};

// Reinitialize responsive elements on window resize
window.addEventListener('resize', function() {
    // Reinitialize carousel on window resize
    if (window.innerWidth > 768) {
        initServices3DCards();
        initProjects3DCarousel();
        initParallaxEffects();
    }
});
