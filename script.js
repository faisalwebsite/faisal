document.addEventListener('DOMContentLoaded', function() {
    // Elements
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

    // Mobile menu functionality
    const menuIcon = document.querySelector('.menu-icon');
    const nav = document.querySelector('nav');
    let isMenuOpen = false;

    menuIcon.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        nav.classList.toggle('active');
        menuIcon.querySelector('i').classList.toggle('fa-bars');
        menuIcon.querySelector('i').classList.toggle('fa-times');
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    });

    // Navigation smooth scroll
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close mobile menu if open
                if (isMenuOpen) {
                    nav.classList.remove('active');
                    menuIcon.querySelector('i').classList.remove('fa-times');
                    menuIcon.querySelector('i').classList.add('fa-bars');
                    isMenuOpen = false;
                    document.body.style.overflow = '';
                }
                
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Typing animation
    function typeText() {
        if (typedTextSpan && charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(eraseText, 2000);
        }
    }

    function eraseText() {
        if (typedTextSpan && charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, 50);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(typeText, 1000);
        }
    }

    // Scroll animations
    function handleScroll() {
        // Skills section animation
        if (skillsSection) {
            const skillsSectionRect = skillsSection.getBoundingClientRect();
            if (skillsSectionRect.top < window.innerHeight && skillsSectionRect.bottom > 0) {
                const skillsTitle = skillsSection.querySelector('h2');
                const skills = skillsSection.querySelectorAll('.skill');
                
                if (skillsTitle) skillsTitle.classList.add('fade-in');
                skills.forEach((skill, index) => {
                    setTimeout(() => {
                        skill.classList.add('fade-in');
                    }, index * 200);
                });
            }
        }

        // Education and Experience sections animation
        [educationSection, experienceSection].forEach(section => {
            if (section) {
                const sectionRect = section.getBoundingClientRect();
                if (sectionRect.top < window.innerHeight * 0.8) {
                    section.classList.add('fade-in');
                }
            }
        });

        updateScrollIndicator();
    }

    // Scroll indicator
    const scrollIndicator = document.getElementById('scroll-indicator');
    const sections = [
        document.querySelector('.home'),
        document.getElementById('skills'),
        document.getElementById('education'),
        document.getElementById('experience'),
        document.getElementById('contact')
    ].filter(Boolean);

    function updateScrollIndicator() {
        if (!scrollIndicator || sections.length === 0) return;

        const scrollPosition = window.scrollY + window.innerHeight / 2;
        let currentSectionIndex = sections.length - 1;

        for (let i = 0; i < sections.length; i++) {
            if (scrollPosition < sections[i].offsetTop + sections[i].offsetHeight) {
                currentSectionIndex = i;
                break;
            }
        }

        scrollIndicator.innerHTML = currentSectionIndex === sections.length - 1 
            ? '<span class="arrow-text">Top</span><i class="fas fa-chevron-up"></i>'
            : '<span class="arrow-text">Scroll</span><i class="fas fa-chevron-down"></i>';
    }

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
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
        });
    }

    // Contact form handling
    const contactFormSection = document.querySelector('.contact-form-section');
    const contactButton = document.querySelector('nav a[href="#contact"]');
    const closeFormButton = document.querySelector('.close-form');

    if (contactButton) {
        contactButton.addEventListener('click', function(e) {
            e.preventDefault();
            contactFormSection.style.display = 'block';
            setTimeout(() => {
                contactFormSection.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeFormButton) {
        closeFormButton.addEventListener('click', function() {
            contactFormSection.classList.remove('active');
            setTimeout(() => {
                contactFormSection.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
        });
    }

    contactFormSection.addEventListener('click', function(e) {
        if (e.target === contactFormSection) {
            contactFormSection.classList.remove('active');
            setTimeout(() => {
                contactFormSection.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactFormSection.classList.contains('active')) {
            contactFormSection.classList.remove('active');
            setTimeout(() => {
                contactFormSection.style.display = 'none';
            }, 300);
            document.body.style.overflow = '';
        }
    });

    // Initialize
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    setTimeout(typeText, 1000); // Start typing animation
});