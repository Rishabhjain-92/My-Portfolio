// ============================================
// TYPEWRITER EFFECT
// ============================================
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if (this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = this.txt;

        // Initial Type Speed
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if (!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// ============================================
// DOM INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Typewriter
    const txtElement = document.getElementById('typewriter');
    const words = ['MERN Stack Apps 🚀', 'AI-Integrated Systems 🤖', 'Smart Web Solutions 💻'];
    new TypeWriter(txtElement, words, 2000);

    // 2. Cursor Glow Effect (Follow Mouse)
    const cursorGlow = document.getElementById('cursorGlow');
    if (window.matchMedia('(pointer: fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = `${e.clientX}px`;
            cursorGlow.style.top = `${e.clientY}px`;
        });
    }

    // 3. Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    const toggleMenu = () => {
        navToggle.classList.toggle('nav__toggle--active');
        mobileMenu.classList.toggle('mobile-menu--active');
        document.body.classList.toggle('no-scroll');
    };

    navToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('mobile-menu--active')) {
                toggleMenu();
            }
        });
    });

    // 4. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav--scrolled');
        } else {
            navbar.classList.remove('nav--scrolled');
        }
    });

    // 5. Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // If it contains stats, trigger the stats counter animation
                if (entry.target.classList.contains('about__stats')) {
                    animateStats();
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animElements = document.querySelectorAll('.animate-on-scroll');
    animElements.forEach(el => scrollObserver.observe(el));

    // Fallback if IntersectionObserver is not supported or slow
    setTimeout(() => {
        animElements.forEach(el => el.classList.add('visible'));
    }, 1500);

    // 6. Stats Counter Animation
    let statsAnimated = false;
    const animateStats = () => {
        if (statsAnimated) return;
        statsAnimated = true;

        const statNumbers = document.querySelectorAll('.stat-card__number');
        statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const stepTime = 30;
            const steps = duration / stepTime;
            const increment = target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    stat.textContent = target % 1 === 0 ? target : target.toFixed(1);
                } else {
                    stat.textContent = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                }
            }, stepTime);
        });
    };

    // 7. Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav__link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav__link--active');
            }
        });
    });
});
