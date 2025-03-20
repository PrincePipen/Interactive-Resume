/**
 * Interactive Resume JavaScript
 * Author: Prince Stephen Lacsa
 * Description: Professional JavaScript functionality for interactive resume
 * Version: 3.0
 */

// ==========================================================================
// NAVIGATION CONTROLS
// ==========================================================================

/**
 * Handles the mobile menu toggle functionality
 * Toggles active class and animates navigation links
 */
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Add accessibility support
    burger.setAttribute('aria-expanded', 'false');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Update aria-expanded for accessibility
        const isExpanded = nav.classList.contains('nav-active');
        burger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Add keyboard accessibility for burger menu
    burger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            burger.click();
        }
    });
};

/**
 * Implements smooth scrolling for navigation links
 * Scrolls to the target section when a navigation link is clicked
 */
const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Offset for fixed navbar
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const nav = document.querySelector('.nav-links');
                const burger = document.querySelector('.burger');
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    burger.setAttribute('aria-expanded', 'false');
                    document.querySelectorAll('.nav-links li').forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });
};

/**
 * Simplified sticky navigation
 * Changes the navbar background color and shadow on scroll
 */
const stickyNav = () => {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(43, 45, 66, 0.95)';
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(43, 45, 66, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
};

// ==========================================================================
// ANIMATIONS AND VISUAL EFFECTS
// ==========================================================================

/**
 * Animates skill cards when they come into view
 * Applies animation effects to skill cards when they are visible on screen
 */
const animateSkillCards = () => {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const animateCard = (card) => {
        card.classList.add('animate');
    };
    
    const checkPosition = () => {
        skillCards.forEach((card, index) => {
            const position = card.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (position < screenHeight * 0.9) {
                // Add a staggered delay based on index
                setTimeout(() => {
                    animateCard(card);
                }, index * 100);
            }
        });
    };
    
    window.addEventListener('scroll', checkPosition);
    checkPosition(); // Check on page load
};

/**
 * Fades in elements when scrolling
 * Adds the active class to elements with the fade-in class when they are visible
 */
const fadeInElements = () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const checkFade = () => {
        fadeElements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (position < screenHeight * 0.85) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', checkFade);
    checkFade(); // Check on page load
};

/**
 * Parallax effect for header
 * Creates a subtle parallax scrolling effect on the header background
 */
const parallaxEffect = () => {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        if (header) {
            const backgroundPositionY = 50 + (scrollPosition * 0.1);
            header.style.backgroundPositionY = `${backgroundPositionY}%`;
        }
    });
};

/**
 * Animate numbers (for potential stats/counters)
 * Increments number counters when they come into view
 */
const animateNumbers = () => {
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length === 0) return;
    
    const speed = 200;
    
    const updateCount = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => updateCount(counter), 1);
        } else {
            counter.innerText = target;
        }
    };
    
    const checkCounters = () => {
        counters.forEach(counter => {
            const position = counter.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (position < screenHeight * 0.9 && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                updateCount(counter);
            }
        });
    };
    
    window.addEventListener('scroll', checkCounters);
    checkCounters(); // Check on page load
};

/**
 * Add hover animations for project cards
 * Applies dynamic transform effects when hovering over project cards
 */
const projectHoverEffects = () => {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        project.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotate(2deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            const projectImage = this.querySelector('.project-image img');
            if (projectImage) {
                projectImage.style.transform = 'scale(1.1)';
            }
        });
        
        project.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            const projectImage = this.querySelector('.project-image img');
            if (projectImage) {
                projectImage.style.transform = '';
            }
        });
        
        // Add focus effects for keyboard navigation
        project.addEventListener('focusin', function() {
            this.style.transform = 'translateY(-15px) rotate(2deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        project.addEventListener('focusout', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
};

/**
 * Enhanced hover effects for skill cards
 * Adds interactive animations when hovering over skill cards
 */
const skillCardEffects = () => {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.skill-icon i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.skill-icon i');
            icon.style.transform = '';
            this.style.transform = '';
        });
        
        // Add focus effects for keyboard navigation
        card.addEventListener('focusin', function() {
            const icon = this.querySelector('.skill-icon i');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('focusout', function() {
            const icon = this.querySelector('.skill-icon i');
            icon.style.transform = '';
            this.style.transform = '';
        });
    });
};

/**
 * Add project overlay effect
 * Shows overlay with links when hovering over project cards
 */
const projectOverlayEffect = () => {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(project => {
        const overlay = project.querySelector('.project-overlay');
        if (!overlay) return;
        
        project.addEventListener('mouseenter', () => {
            overlay.style.opacity = '1';
        });
        
        project.addEventListener('mouseleave', () => {
            overlay.style.opacity = '0';
        });
        
        // Keyboard accessibility
        project.addEventListener('focusin', () => {
            overlay.style.opacity = '1';
        });
        
        project.addEventListener('focusout', () => {
            overlay.style.opacity = '0';
        });
        
        // Mobile tap handling
        project.addEventListener('click', () => {
            // Check if we're on mobile
            if (window.innerWidth <= 768) {
                const wasTapped = project.classList.contains('tapped');
                
                // Reset all projects first
                document.querySelectorAll('.project-card').forEach(p => {
                    p.classList.remove('tapped');
                });
                
                if (!wasTapped) {
                    project.classList.add('tapped');
                    overlay.style.opacity = '1';
                    
                    // Update indicator text
                    const indicator = project.querySelector('.mobile-tap-indicator span');
                    if (indicator) {
                        indicator.innerHTML = '<i class="fas fa-check-circle"></i> Project details shown';
                    }
                } else {
                    overlay.style.opacity = '0';
                    
                    // Reset indicator text
                    const indicator = project.querySelector('.mobile-tap-indicator span');
                    if (indicator) {
                        indicator.innerHTML = '<i class="fas fa-hand-pointer"></i> Tap to view project';
                    }
                }
            }
        });
    });
};

/**
 * Initialize progress bars for skills
 * Animates the skill progress bars when they come into view
 */
const initSkillProgressBars = () => {
    const progressBars = document.querySelectorAll('.skill-progress-bar');
    
    const animateProgressBar = (bar) => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
        // Use default gradient, removed theme-based gradient
    };
    
    const checkProgress = () => {
        progressBars.forEach(bar => {
            const position = bar.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (position < screenHeight * 0.9 && !bar.classList.contains('animated')) {
                bar.classList.add('animated');
                setTimeout(() => {
                    animateProgressBar(bar);
                }, 200);
            }
        });
    };
    
    window.addEventListener('scroll', checkProgress);
    checkProgress(); // Check on page load
};

/**
 * Initialize typing animation
 * Creates a typewriter effect for the header text
 */
const initTypingAnimation = () => {
    const typedTextElement = document.getElementById('typed-text');
    
    if (!typedTextElement || typeof Typed !== 'function') return;
    
    new Typed('#typed-text', {
        strings: [
            "Building creative web experiences",
            "Crafting intuitive user interfaces",
            "Turning ideas into digital reality",
            "Solving problems with clean code"
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });
};

/**
 * Initialize back to top button
 * Shows/hides the back to top button and scrolls to top when clicked
 */
const initBackToTop = () => {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

/**
 * Initialize scroll indicator
 * Animates the mouse scroll indicator in the header
 */
const initScrollIndicator = () => {
    const scrollIndicator = document.querySelector('.mouse-scroll-indicator');
    
    if (!scrollIndicator) return;
    
    scrollIndicator.addEventListener('click', () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
};

/**
 * Add parallax effect to header elements
 * Creates a depth effect when scrolling
 */
const initHeaderParallax = () => {
    const header = document.querySelector('header');
    const heroContent = document.querySelector('.hero-content');
    
    if (!header || !heroContent) return;
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const isMobile = window.innerWidth <= 768;
        
        // Calculate threshold based on screen size
        const scrollThreshold = isMobile ? window.innerHeight * 0.8 : window.innerHeight;
        
        if (scrollY < scrollThreshold) {
            // Use gentler transform value on mobile
            const translateY = isMobile ? scrollY * 0.2 : scrollY * 0.4;
            heroContent.style.transform = `translateY(${translateY}px)`;
            
            // Calculate opacity with a minimum value (0.4 for mobile, 0 for desktop)
            const minOpacity = isMobile ? 0.4 : 0;
            const opacityValue = Math.max(
                minOpacity,
                1 - (scrollY / (scrollThreshold * 0.75))
            );
            
            heroContent.style.opacity = opacityValue;
        }
    });
};

/**
 * Handle mobile-specific project interactions
 * Changes behavior of project cards on mobile devices
 */
const initMobileProjectInteractions = () => {
    // Check if mobile on page load
    const checkMobile = () => {
        const isMobile = window.innerWidth <= 768;
        const projects = document.querySelectorAll('.project-card');
        
        projects.forEach(project => {
            const overlay = project.querySelector('.project-overlay');
            if (!overlay) return;
            
            if (isMobile) {
                // Set initial opacity to 0 on mobile
                overlay.style.opacity = '0';
                project.classList.add('mobile-mode');
            } else {
                // Remove any mobile-specific classes
                project.classList.remove('mobile-mode', 'tapped');
                
                // Reset indicator text if we switch from mobile to desktop
                const indicator = project.querySelector('.mobile-tap-indicator span');
                if (indicator) {
                    indicator.innerHTML = '<i class="fas fa-hand-pointer"></i> Tap to view project';
                }
            }
        });
    };
    
    // Check on resize
    window.addEventListener('resize', checkMobile);
    
    // Initial check
    checkMobile();
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================

/**
 * Initialize all functions when the DOM is fully loaded
 * Group functionality by purpose for better organization
 */
function init() {
    // Navigation
    navSlide();
    smoothScroll();
    stickyNav();
    
    // Animations
    parallaxEffect();
    fadeInElements();
    animateSkillCards();
    projectHoverEffects();
    skillCardEffects();
    projectOverlayEffect();
    animateNumbers();
    initSkillProgressBars();
    
    // UI Components
    initBackToTop();
    initScrollIndicator();
    initHeaderParallax();
    
    // Mobile optimizations
    initMobileProjectInteractions();
    
    console.log('Interactive Resume initialized successfully');
}

// Run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
