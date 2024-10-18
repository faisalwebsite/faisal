document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    const skillsSection = document.querySelector('.skills');
    const educationSection = document.querySelector('.education');
    const experienceSection = document.querySelector('.experience');
    const contactSection = document.querySelector('.contact');
    const typedTextSpan = document.getElementById("typed-text");
    const textArray = ["health informatics specialist", "data analyst", "systems integrator"];
    let textArrayIndex = 0;
    let charIndex = 0;
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    // Mobile menu functionality
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav');

    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Background animation setup
    const canvas = document.createElement('canvas');
    document.body.insertBefore(canvas, document.body.firstChild);
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;
    const connectionDistance = 120;
    const mouse = { x: undefined, y: undefined, radius: 150 };

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.color = `rgba(11, 110, 149, ${Math.random() * 0.5 + 0.5})`;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < connectionDistance) {
                    ctx.strokeStyle = `rgba(11, 110, 149, ${0.1 - distance / connectionDistance * 0.1})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }

    // Initialize and start background animation
    initParticles();
    animateParticles();

    function typeText() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(eraseText, 2000);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, 50);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(typeText, 1000);
        }
    }

    function handleScroll() {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScrollTop > lastScrollTop && currentScrollTop > scrollThreshold) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollTop = currentScrollTop;

        const triggerBottom = window.innerHeight / 5 * 4;

        [skillsSection, educationSection, experienceSection, contactSection].forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add('fade-in');
            }
        });

        updateScrollIndicator();
    }

    const scrollIndicator = document.getElementById('scroll-indicator');
    const sections = [
        document.querySelector('.home'),
        document.getElementById('skills'),
        document.getElementById('education'),
        document.getElementById('experience'),
        document.getElementById('contact')
    ];

    function updateScrollIndicator() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let currentSectionIndex = sections.length - 1;

        for (let i = 0; i < sections.length; i++) {
            if (scrollPosition < sections[i].offsetTop + sections[i].offsetHeight) {
                currentSectionIndex = i;
                break;
            }
        }

        if (currentSectionIndex === sections.length - 1) {
            scrollIndicator.innerHTML = '<span class="arrow-text">Top</span><i class="fas fa-chevron-up"></i>';
        } else {
            scrollIndicator.innerHTML = '<span class="arrow-text">Scroll</span><i class="fas fa-chevron-down"></i>';
        }
    }

    function scrollToNextSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        for (let i = 0; i < sections.length; i++) {
            if (scrollPosition < sections[i].offsetTop + sections[i].offsetHeight) {
                if (i === sections.length - 1) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                    sections[i + 1].scrollIntoView({ behavior: 'smooth' });
                }
                break;
            }
        }
    }

    scrollIndicator.addEventListener('click', scrollToNextSection);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    canvas.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    canvas.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    handleScroll(); // Initial check
    setTimeout(typeText, 1000); // Start the typing animation
});