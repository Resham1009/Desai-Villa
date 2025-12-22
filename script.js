// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Section Navigation - Show/Hide Sections
const allSections = document.querySelectorAll('.content-section');

// Function to show a specific section and hide others
function showSection(sectionId) {
    // Remove landing page class to allow scrolling
    document.body.classList.remove('landing-page');
    
    // Hide hero section (Desai Villa title)
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.display = 'none';
    }
    
    // Show main content container
    document.getElementById('mainContent').style.display = 'block';
    
    // Hide all sections
    allSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    // Update navigation arrows visibility
    updateNavArrows(sectionId);

    // Close mobile menu
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Function to update navigation arrows visibility
function updateNavArrows(currentSectionId) {
    const prevArrow = document.getElementById('prevSectionArrow');
    const nextArrow = document.getElementById('nextSectionArrowContent');
    const currentIndex = sectionOrder.indexOf(currentSectionId);
    
    if (prevArrow) {
        // Hide left arrow on first section
        if (currentIndex === 0) {
            prevArrow.style.display = 'none';
        } else {
            prevArrow.style.display = 'flex';
        }
    }
    
    if (nextArrow) {
        // Hide right arrow on last section
        if (currentIndex === sectionOrder.length - 1) {
            nextArrow.style.display = 'none';
        } else {
            nextArrow.style.display = 'flex';
        }
    }
}

// Function to show home (all sections visible)
function showHome() {
    // Remove landing page class to allow scrolling
    document.body.classList.remove('landing-page');
    
    // Hide hero section (Desai Villa title)
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.display = 'none';
    }
    
    // Show main content container
    document.getElementById('mainContent').style.display = 'block';
    
    allSections.forEach(section => {
        section.style.display = 'block';
    });
    
    // Update navigation arrows for home section
    updateNavArrows('home');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Navigation link click handlers
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // Remove #
        showSection(targetId);
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});


// Villa logo/name click - go back to landing page
const villaLogo = document.querySelector('.villa-logo');
const villaName = document.querySelector('.villa-name');
const villaElement = villaLogo || villaName;

if (villaElement) {
    villaElement.addEventListener('click', function(e) {
        e.preventDefault();
        // Hide all content and go back to landing page
        allSections.forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById('mainContent').style.display = 'none';
        
        // Show hero section (Desai Villa logo) again
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.display = 'flex';
        }
        
        // Add landing page class to prevent scrolling
        document.body.classList.add('landing-page');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Remove active state from all nav links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        
        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
    // Make logo/name clickable
    villaElement.style.cursor = 'pointer';
}

// Section order for navigation
const sectionOrder = ['home', 'amenities', 'places-nearby', 'rules', 'terms', 'menu', 'contact'];

// Function to get current section ID
function getCurrentSectionId() {
    const visibleSection = document.querySelector('.content-section[style*="display: block"]');
    if (visibleSection) {
        return visibleSection.id;
    }
    return null;
}

// Function to navigate to next section
function goToNextSection() {
    const currentId = getCurrentSectionId();
    if (!currentId) return;
    
    const currentIndex = sectionOrder.indexOf(currentId);
    if (currentIndex < sectionOrder.length - 1) {
        const nextId = sectionOrder[currentIndex + 1];
        showSection(nextId);
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const nextLink = document.querySelector(`a[href="#${nextId}"]`);
        if (nextLink) {
            nextLink.classList.add('active');
        }
    }
}

// Function to navigate to previous section
function goToPrevSection() {
    const currentId = getCurrentSectionId();
    if (!currentId) return;
    
    const currentIndex = sectionOrder.indexOf(currentId);
    if (currentIndex > 0) {
        const prevId = sectionOrder[currentIndex - 1];
        showSection(prevId);
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const prevLink = document.querySelector(`a[href="#${prevId}"]`);
        if (prevLink) {
            prevLink.classList.add('active');
        }
    }
}

// Landing page arrow - go to About Us
const nextSectionArrow = document.getElementById('nextSectionArrow');
if (nextSectionArrow) {
    nextSectionArrow.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('home');
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const aboutUsLink = document.querySelector('a[href="#home"]');
        if (aboutUsLink) {
            aboutUsLink.classList.add('active');
        }
    });
}

// Content page navigation arrows
const prevSectionArrow = document.getElementById('prevSectionArrow');
const nextSectionArrowContent = document.getElementById('nextSectionArrowContent');

if (prevSectionArrow) {
    prevSectionArrow.addEventListener('click', function(e) {
        e.preventDefault();
        goToPrevSection();
    });
}

if (nextSectionArrowContent) {
    nextSectionArrowContent.addEventListener('click', function(e) {
        e.preventDefault();
        goToNextSection();
    });
}

// Menu link in Terms section
const menuLink = document.querySelector('.menu-link');
if (menuLink) {
    menuLink.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('menu');
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        const menuNavLink = document.querySelector('a[href="#menu"]');
        if (menuNavLink) {
            menuNavLink.classList.add('active');
        }
    });
}

// Initialize - show landing page on page load (no content visible)
window.addEventListener('DOMContentLoaded', () => {
    // Hide all content sections initially
    allSections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('mainContent').style.display = 'none';
    
    // Add landing page class to body to prevent scrolling
    document.body.classList.add('landing-page');
    
    // Remove active state from all nav links
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
});

// Gallery Scroll Effect
const galleryObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.setAttribute('data-scroll', 'in');
        }
    });
}, galleryObserverOptions);

// Observe gallery items for scroll animation
document.querySelectorAll('.gallery-item').forEach(item => {
    galleryObserver.observe(item);
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

// Gallery image click handler - open lightbox
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close lightbox
lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
});

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

// Video placeholder click handler
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', () => {
        alert('Video player will be implemented here. You can embed a YouTube video or use a video player.');
        // Example: Replace video-placeholder with actual video embed
        // <iframe width="100%" height="500" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>
    });
}

// Active state is now handled by click events

// Form validation for contact forms (if added later)
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe info cards for animation
document.querySelectorAll('.info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

