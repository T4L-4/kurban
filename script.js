// Countdown Timer
function updateCountdown() {
    const targetDate = new Date("May 27, 2026 00:00:00").getTime();
    
    setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }, 1000);
}

// Header Scroll Effect
function handleHeaderScroll() {
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Reveal Animations
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navWrapper = document.querySelector('.nav-wrapper');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navWrapper.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // Prevent scroll when menu is open
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navWrapper.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
}

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    handleHeaderScroll();
    initScrollReveal();
    initFAQ();
    initMobileMenu();
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
