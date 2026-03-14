/* ===================================================================
   EduASK — Professional JavaScript Enhancements v2
   =================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    /* --- Mobile Navigation --- */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* --- Navbar Shadow on Scroll --- */
    const navbar = document.getElementById('navbar');

    const updateNavbar = () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    /* --- Smooth Scrolling for Anchor Links --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                const offset = navbar ? navbar.offsetHeight : 0;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    /* --- Animated Counter for Stats Section --- */
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateCount = (el) => {
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;

        const tick = () => {
            current += step;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                return;
            }
            el.textContent = current.toLocaleString();
            requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    };

    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !statsAnimated) {
                    statsAnimated = true;
                    statNumbers.forEach(num => animateCount(num));
                }
            });
        },
        { threshold: 0.3 }
    );

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) statsObserver.observe(statsBar);

    /* --- Godly 3D Parallax Tilt --- */
    const godlyCards = document.querySelectorAll('.certificate-preview');

    godlyCards.forEach(card => {
        if (window.innerWidth > 1024) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const cx = rect.width / 2;
                const cy = rect.height / 2;

                // Parallax depth calculation
                const rx = ((y - cy) / cy) * -6;
                const ry = ((x - cx) / cx) * 6;

                card.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'transform 0.1s ease-out';

                // Add dynamic glow follow
                if (card.classList.contains('course-card-godly')) {
                    const glowX = (x / rect.width) * 100;
                    const glowY = (y / rect.height) * 100;
                    card.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(13, 71, 161, 0.08) 0%, var(--glass-bg) 60%)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                if (card.classList.contains('course-card-godly')) {
                    card.style.background = 'var(--glass-bg)';
                }
            });
        }
    });

    /* --- Enrollment Button Interaction (Premium) --- */
    const enrollButtons = document.querySelectorAll('.enroll-button-premium, .enroll-button');
    enrollButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.course-card-godly, .course-card');
            if (!card) return;
            const h3 = card.querySelector('h3');
            const courseTitle = h3 ? h3.textContent : "Course";

            // Professional notification
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed; bottom: 2rem; right: 2rem;
                background: #0b1120; color: white;
                padding: 1.25rem 2.5rem; border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3); z-index: 10000;
                transform: translateY(100px); opacity: 0;
                transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
                font-weight: 600; font-family: 'Outfit', sans-serif;
                border-left: 4px solid var(--accent, #ffb300);
            `;
            toast.textContent = `Processing enrollment for ${courseTitle}...`;
            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.transform = 'translateY(0)';
                toast.style.opacity = '1';
            }, 100);

            setTimeout(() => {
                toast.style.transform = 'translateY(20px)';
                toast.style.opacity = '0';
                setTimeout(() => toast.remove(), 500);
            }, 3500);
        });
    });

    /* --- Page Entry Reveals --- */
    const revealElements = document.querySelectorAll('.mnc-logo-item, .cert-showcase-text, .cert-showcase-visual');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.8s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.05}s`;
        revealObserver.observe(el);
    });

    /* --- Scroll Progress Bar --- */
    const progress = document.createElement('div');
    progress.style.cssText = 'position: fixed; top: 0; left: 0; height: 3px; background: linear-gradient(90deg, #0d47a1, #ffb300); width: 0%; z-index: 9999; transition: width 0.1s ease;';
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progress.style.width = scrolled + "%";
    }, { passive: true });

    /* --- Active Nav Link Highlighting on Scroll (index only) --- */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    if (sections.length > 0) {
        const highlightNav = () => {
            const scrollY = window.scrollY + 120;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollY >= top && scrollY < top + height) {
                    navAnchors.forEach(a => {
                        a.classList.remove('active-link');
                        if (a.getAttribute('href') === '#' + id) {
                            a.classList.add('active-link');
                        }
                    });
                }
            });
        };
        window.addEventListener('scroll', highlightNav, { passive: true });
    }

    /* Hero animation simplified - using premium 3D static visual */

    /* --- Consultancy Form Submission (FormSubmit AJAX) --- */
    const consultancyForm = document.getElementById('consultancyForm');
    const formSuccess = document.getElementById('formSuccess');

    if (consultancyForm && formSuccess) {
        consultancyForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Premium button state change
            const submitBtn = consultancyForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            const formData = new FormData(this);

            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    consultancyForm.classList.add('hidden');
                    formSuccess.classList.remove('hidden');
                    formSuccess.style.opacity = '0';
                    formSuccess.style.transform = 'translateY(20px)';
                    formSuccess.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
                    
                    // Trigger entrance animation
                    setTimeout(() => {
                        formSuccess.style.opacity = '1';
                        formSuccess.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Submission Error:', error);
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
                alert('Oops! There was a problem sending your message. Please try again or contact us directly.');
            });
        });
    }
    /* --- FAQ Accordion Interactivity --- */
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherAnswer) otherAnswer.style.maxHeight = null;
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});

