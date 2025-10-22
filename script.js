// Announce page changes for screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    announcement.style.cssText = `
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    `;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ===== PROGRESSIVE ENHANCEMENT =====
// Check for JavaScript support and enhance accordingly
if (typeof window !== 'undefined' && window.history && window.history.pushState) {
    // Browser supports modern features
    document.documentElement.classList.add('js-enabled');
} else {
    // Fallback for older browsers
    document.documentElement.classList.add('js-disabled');
}

// ===== OFFLINE SUPPORT (Service Worker Registration) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== CUSTOM CURSOR EFFECT =====
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        mix-blend-mode: difference;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
    `;

    document.body.appendChild(cursor);

    let mouseX = 0,
        mouseY = 0;
    let cursorX = 0,
        cursorY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });

    // Smooth cursor animation
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursor.style.left = cursorX - 10 + 'px';
        cursor.style.top = cursorY - 10 + 'px';

        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Scale cursor on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Initialize custom cursor on desktop devices
if (window.innerWidth > 768 && !('ontouchstart' in window)) {
    initCustomCursor();
}

// ===== DYNAMIC CSS ANIMATIONS =====
const dynamicAnimations = `
    @keyframes floatParticle {
        0% { transform: translateY(100vh) translateX(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) translateX(100px) rotate(360deg); opacity: 0; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes modalSlideIn {
        from { opacity: 0; transform: translateY(-50px) scale(0.9); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
    
    @keyframes glitch {
        0%, 100% { transform: translate(0); }
        10% { transform: translate(-2px, -2px); }
        20% { transform: translate(2px, 2px); }
        30% { transform: translate(-2px, 2px); }
        40% { transform: translate(2px, -2px); }
        50% { transform: translate(-2px, -2px); }
        60% { transform: translate(2px, 2px); }
        70% { transform: translate(-2px, 2px); }
        80% { transform: translate(2px, -2px); }
        90% { transform: translate(-2px, -2px); }
    }
    
    .notification {
        animation: slideInRight 0.3s ease !important;
    }
    
    .glitch-effect {
        animation: glitch 0.3s ease-in-out;
    }
`;

// Add dynamic styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicAnimations;
document.head.appendChild(styleSheet);

// ===== ADVANCED FEATURES =====

// Page Visibility API for performance optimization
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations and reduce activity when page is not visible
        document.body.classList.add('page-hidden');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('page-hidden');
    }
});

// Battery API for performance optimization (if supported)
if ('getBattery' in navigator) {
    navigator.getBattery().then(function(battery) {
        if (battery.level < 0.2) {
            // Reduce animations for low battery
            document.documentElement.style.setProperty('--transition-normal', '0.1s');
            document.documentElement.style.setProperty('--transition-slow', '0.2s');
        }

        battery.addEventListener('levelchange', function() {
            if (battery.level < 0.2) {
                document.documentElement.style.setProperty('--transition-normal', '0.1s');
            } else {
                document.documentElement.style.setProperty('--transition-normal', '0.3s');
            }
        });
    });
}

// Connection API for performance optimization (if supported)
if ('connection' in navigator) {
    const connection = navigator.connection;

    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        // Reduce animations for slow connections
        document.documentElement.classList.add('reduced-motion');
    }

    connection.addEventListener('change', function() {
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            document.documentElement.classList.add('reduced-motion');
        } else {
            document.documentElement.classList.remove('reduced-motion');
        }
    });
}

// ===== EASTER EGGS =====
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);

    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Add rainbow effect to entire page
    document.body.style.animation = 'rainbow 2s infinite';

    // Add glitch effect to title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('glitch-effect');
    }

    // Show special message
    const message = createNotification('🎉 Konami Code activated! You found the secret!', 'success');
    document.body.appendChild(message);

    // Add rainbow animation
    const rainbowStyle = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;

    const rainbowStyleSheet = document.createElement('style');
    rainbowStyleSheet.textContent = rainbowStyle;
    document.head.appendChild(rainbowStyleSheet);

    // Remove effects after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
        if (heroTitle) {
            heroTitle.classList.remove('glitch-effect');
        }
        if (message.parentNode) {
            message.remove();
        }
        rainbowStyleSheet.remove();
    }, 5000);
}

// Double-click logo easter egg
const logo = document.querySelector('.nav-logo');
if (logo) {
    let clickCount = 0;
    logo.addEventListener('click', function(e) {
        clickCount++;
        if (clickCount === 2) {
            e.preventDefault();
            // Create particle explosion effect
            createParticleExplosion(e.clientX, e.clientY);
            clickCount = 0;
        }

        setTimeout(() => {
            clickCount = 0;
        }, 500);
    });
}

function createParticleExplosion(x, y) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            z-index: 9999;
            animation: explode 1s ease-out forwards;
        `;

        // Random direction and distance
        const angle = (i / 20) * Math.PI * 2;
        const distance = Math.random() * 100 + 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;

        particle.style.setProperty('--end-x', endX + 'px');
        particle.style.setProperty('--end-y', endY + 'px');

        document.body.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 1000);
    }

    // Add explosion animation
    const explosionStyle = `
        @keyframes explode {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(calc(var(--end-x) - ${x}px), calc(var(--end-y) - ${y}px)) scale(0);
            }
        }
    `;

    const explosionStyleSheet = document.createElement('style');
    explosionStyleSheet.textContent = explosionStyle;
    document.head.appendChild(explosionStyleSheet);

    setTimeout(() => {
        explosionStyleSheet.remove();
    }, 1000);
}

// ===== GLOBAL FUNCTIONS FOR HTML ONCLICK ATTRIBUTES =====
// Make functions available globally for HTML onclick attributes
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.toggleTheme = toggleTheme;

// ===== CLEANUP =====
window.addEventListener('beforeunload', function() {
    // Cleanup any ongoing animations or timers
    // This helps with performance and prevents memory leaks
});

// ===== CONSOLE MESSAGE =====
console.log(`
🚀 Welcome to Alex Morgan's Portfolio!

╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   Built with modern web technologies and attention to detail  ║
║                                                               ║
║   🛠️  Technologies: HTML5, CSS3, Vanilla JavaScript          ║
║   ⚡  Features: Dark/Light theme, Animations, Accessibility  ║
║   📱  Responsive: Works on all devices                       ║
║   🔍  SEO Ready: Optimized for search engines               ║
║                                                               ║
║   Interested in working together?                             ║
║   📧 alex@alexmorgan.dev                                     ║
║   🌐 alexmorgan.dev                                          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝

Try these keyboard shortcuts:
• Ctrl/Cmd + Shift + T: Toggle theme
• Alt + 1-7: Quick navigation
• Konami Code: Secret surprise! 🎮

Found a bug or have suggestions? I'd love to hear from you!
`);

// ===== ADDITIONAL CSS FOR DYNAMIC FEATURES =====
const additionalCSS = `
.page-hidden * {
    animation-play-state: paused !important;
}

.reduced-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
}

.custom-cursor {
    z-index: 999999;
}

.notification {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
    border-radius: 12px;
    font-weight: 500;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.floating-particle {
    will-change: transform;
}

.modal-container .project-modal-content {
    line-height: 1.7;
}

.modal-container .project-links {
    display: flex;
    gap: 1rem;
    margin: 2rem 0;
    flex-wrap: wrap;
}

.modal-container .project-section {
    margin-bottom: 2rem;
}

.modal-container .project-section h4 {
    color: var(--primary-color);
    font-size: 1.25rem;
    margin-bottom: 1rem;
    font-weight: 600;
}

.modal-container .tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

.modal-container .feature-list,
.modal-container .challenge-list,
.modal-container .results-list {
    list-style: none;
    padding: 0;
}

.modal-container .feature-list li,
.modal-container .challenge-list li,
.modal-container .results-list li {
    position: relative;
    padding: 0.5rem 0 0.5rem 2rem;
    margin-bottom: 0.5rem;
    border-left: 3px solid var(--primary-color);
    padding-left: 1rem;
    background: var(--bg-glass);
    border-radius: 0 8px 8px 0;
}

.modal-container .feature-list li::before {
    content: '✨';
    position: absolute;
    left: -1.5rem;
    color: var(--primary-color);
}

.modal-container .challenge-list li::before {
    content: '🎯';
    position: absolute;
    left: -1.5rem;
    color: var(--warning-color);
}

.modal-container .results-list li::before {
    content: '📈';
    position: absolute;
    left: -1.5rem;
    color: var(--success-color);
}

@media (max-width: 768px) {
    .modal-container .project-links {
        flex-direction: column;
    }
    
    .modal-container .project-links .btn {
        justify-content: center;
        width: 100%;
    }
}
`;

// Add additional styles
const additionalStyleSheet = document.createElement('style');
additionalStyleSheet.textContent = additionalCSS;
document.head.appendChild(additionalStyleSheet);

// ===== FINAL INITIALIZATION =====
console.log('Portfolio script loaded successfully! 🎉');

function updateActiveNavOnScroll() {
    const sections = ['home', 'about', 'experience', 'projects', 'skills', 'blog', 'contact'];
    const scrollTop = window.pageYOffset + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollTop >= section.offsetTop) {
            if (activeSection !== sections[i]) {
                setActiveNavLink(sections[i]);
            }
            break;
        }
    }
}

// ===== HERO ANIMATIONS =====
function initHeroAnimations() {
    // Typing animation for code display
    if (elements.codeDisplay) {
        startTypingAnimation();
    }

    // Animated counters for stats
    if (elements.statNumbers.length > 0) {
        animateCounters();
    }

    // Generate floating particles
    generateFloatingParticles();
}

function startTypingAnimation() {
    const codeSnippets = [
        `const developer = {
  name: "Alex Morgan",
  skills: ["React", "Node.js", "Python", "AI/ML"],
  passion: "Building the future",
  status: "Available for hire",
  
  createAmazingThings() {
    return this.skills.map(skill => 
      \`Innovation with \${skill}\`
    );
  },
  
  collaborate() {
    return "Let's build something extraordinary!";
  }
};

console.log(developer.createAmazingThings());
// Ready to transform your ideas into reality ✨`,

        `class FullStackDeveloper {
  constructor() {
    this.expertise = ["Frontend", "Backend", "AI/ML"];
    this.tools = ["React", "Node.js", "Python", "AWS"];
    this.mindset = "Problem-solving & Innovation";
  }
  
  async buildProject(requirements) {
    const solution = await this.architect(requirements);
    const code = await this.develop(solution);
    const result = await this.deploy(code);
    
    return {
      status: "Success",
      quality: "Production-ready",
      performance: "Optimized",
      maintenance: "Long-term support"
    };
  }
}

const alex = new FullStackDeveloper();
// Ready to bring your vision to life! 🚀`
    ];

    let currentSnippet = 0;
    let currentChar = 0;
    let isDeleting = false;

    function typeCode() {
        const snippet = codeSnippets[currentSnippet];

        if (!isDeleting) {
            // Typing
            elements.codeDisplay.textContent = snippet.substring(0, currentChar);
            currentChar++;

            if (currentChar > snippet.length) {
                isDeleting = true;
                setTimeout(typeCode, 2000); // Wait before deleting
                return;
            }
        } else {
            // Deleting
            elements.codeDisplay.textContent = snippet.substring(0, currentChar);
            currentChar--;

            if (currentChar < 0) {
                isDeleting = false;
                currentSnippet = (currentSnippet + 1) % codeSnippets.length;
                currentChar = 0;
                setTimeout(typeCode, 500); // Wait before next snippet
                return;
            }
        }

        const speed = isDeleting ? 30 : (Math.random() * 100 + 50);
        setTimeout(typeCode, speed);
    }

    setTimeout(() => {
        typeCode();
    }, 1000);
}

function animateCounters() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    elements.statNumbers.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;

    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);

        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        }
    }, stepTime);
}

function generateFloatingParticles() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    for (let i = 0; i < 20; i++) {
        createFloatingParticle(heroSection);
    }
}

function createFloatingParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: rgba(0, 212, 255, ${Math.random() * 0.5 + 0.2});
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: floatParticle ${Math.random() * 10 + 10}s infinite linear;
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 20000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');

                // Animate skill progress bars when skills section is visible
                if (entry.target.closest('#skills') && !skillsAnimated) {
                    animateSkillBars();
                    skillsAnimated = true;
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatableElements = document.querySelectorAll('.glass-card, .timeline-item, .project-card, .skill-card, .blog-card');
    animatableElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

function animateSkillBars() {
    elements.progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        setTimeout(() => {
            bar.style.width = percentage + '%';
        }, Math.random() * 500);
    });
}

// ===== FILTERS =====
function initFilters() {
    // Project filters
    elements.projectFilters.forEach(filter => {
        filter.addEventListener('click', () => handleProjectFilter(filter));
    });

    // Skills filters
    elements.skillsFilters.forEach(filter => {
        filter.addEventListener('click', () => handleSkillsFilter(filter));
    });
}

function handleProjectFilter(activeFilter) {
    const filterValue = activeFilter.getAttribute('data-filter');

    // Update active filter button
    elements.projectFilters.forEach(filter => filter.classList.remove('active'));
    activeFilter.classList.add('active');

    // Filter project cards
    elements.projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';

            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

function handleSkillsFilter(activeFilter) {
    const filterValue = activeFilter.getAttribute('data-filter');

    // Update active filter button
    elements.skillsFilters.forEach(filter => filter.classList.remove('active'));
    activeFilter.classList.add('active');

    // Filter skill cards
    elements.skillCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';

            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===== PROJECT MODAL =====
function initModal() {
    if (elements.modalClose) {
        elements.modalClose.addEventListener('click', closeProjectModal);
    }

    if (elements.projectModal) {
        elements.projectModal.addEventListener('click', (e) => {
            if (e.target === elements.projectModal) {
                closeProjectModal();
            }
        });
    }

    // ESC key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && elements.projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

function openProjectModal(projectId) {
    const projectData = getProjectData(projectId);
    if (!projectData) return;

    elements.modalTitle.textContent = projectData.title;
    elements.modalContent.innerHTML = generateProjectModalContent(projectData);
    elements.projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    elements.projectModal.classList.remove('active');
    document.body.style.overflow = 'visible';
}

function getProjectData(projectId) {
    const projects = {
        'ai-dashboard': {
            title: 'AI Analytics Dashboard',
            description: 'Advanced analytics platform powered by machine learning algorithms for predictive business insights.',
            fullDescription: `This comprehensive AI-powered analytics platform transforms raw business data into actionable insights using cutting-edge machine learning algorithms. Built for enterprise-scale operations, it provides real-time analytics, predictive modeling, and intelligent recommendations.`,
            technologies: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Redis', 'AWS'],
            features: [
                'Real-time data processing and visualization',
                'Machine learning models for predictive analytics',
                'Interactive dashboard with custom widgets',
                'Advanced filtering and data export capabilities',
                'Multi-tenant architecture with role-based access',
                'API integration with popular business tools'
            ],
            challenges: [
                'Processing large datasets in real-time',
                'Implementing complex ML algorithms efficiently',
                'Creating intuitive data visualizations',
                'Ensuring data security and privacy compliance'
            ],
            results: [
                '60% improvement in decision-making speed',
                '40% increase in operational efficiency',
                '25% cost reduction in data analysis processes',
                '99.9% uptime with auto-scaling infrastructure'
            ],
            images: ['dashboard-1.jpg', 'dashboard-2.jpg', 'dashboard-3.jpg'],
            liveUrl: 'https://ai-dashboard.alexmorgan.dev',
            githubUrl: 'https://github.com/alexmorgan/ai-dashboard'
        },
        'ecommerce-platform': {
            title: 'Next-Gen E-Commerce Platform',
            description: 'Modern e-commerce platform with real-time inventory, AI recommendations, and seamless payments.',
            fullDescription: `A fully-featured e-commerce platform built with modern technologies, offering personalized shopping experiences through AI-powered recommendations, real-time inventory management, and integrated payment processing.`,
            technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'AWS', 'Redis', 'Elasticsearch'],
            features: [
                'AI-powered product recommendations',
                'Real-time inventory management',
                'Multiple payment gateways integration',
                'Advanced search and filtering',
                'Mobile-responsive design',
                'Admin dashboard with analytics'
            ],
            challenges: [
                'Implementing real-time inventory synchronization',
                'Building scalable recommendation engine',
                'Ensuring secure payment processing',
                'Optimizing for mobile performance'
            ],
            results: [
                '45% increase in conversion rates',
                '30% improvement in user engagement',
                '50% reduction in cart abandonment',
                '99.99% payment success rate'
            ],
            images: ['ecommerce-1.jpg', 'ecommerce-2.jpg', 'ecommerce-3.jpg'],
            liveUrl: 'https://ecommerce.alexmorgan.dev',
            githubUrl: 'https://github.com/alexmorgan/ecommerce-platform'
        }
        // Add more projects as needed
    };

    return projects[projectId];
}

function generateProjectModalContent(project) {
    return `
        <div class="project-modal-content">
            <div class="project-overview">
                <p class="project-full-description">${project.fullDescription}</p>
                
                <div class="project-links">
                    <a href="${project.liveUrl}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-external-link-alt"></i>
                        <span>View Live Project</span>
                    </a>
                    <a href="${project.githubUrl}" target="_blank" class="btn btn-secondary">
                        <i class="fab fa-github"></i>
                        <span>View Source Code</span>
                    </a>
                </div>
            </div>
            
            <div class="project-details">
                <div class="project-section">
                    <h4>Technologies Used</h4>
                    <div class="tech-stack">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-section">
                    <h4>Key Features</h4>
                    <ul class="feature-list">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-section">
                    <h4>Challenges & Solutions</h4>
                    <ul class="challenge-list">
                        ${project.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-section">
                    <h4>Results & Impact</h4>
                    <ul class="results-list">
                        ${project.results.map(result => `<li>${result}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// ===== CONTACT FORM =====
function initContactForm() {
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', handleContactSubmit);
        
        // Real-time validation
        const inputs = elements.contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearFieldError(input));
        });
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const submitButton = elements.contactForm.querySelector('.form-submit');
    const formData = new FormData(elements.contactForm);
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    try {
        // Simulate form submission (replace with actual API call)
        const response = await fetch(CONFIG.api.contactForm, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showFormSuccess();
            elements.contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        showFormError('There was an error sending your message. Please try again.');
    } finally {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

function validateForm() {
    const requiredFields = elements.contactForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let errorMessage = '';
    
    // Required field validation
    if (field.required && !value) {
        errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (fieldName === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Message length validation
    else if (fieldName === 'message' && value.length < 10) {
        errorMessage = 'Message must be at least 10 characters long';
    }
    
    // Display error
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
    
    // Update field styling
    if (errorMessage) {
        field.style.borderColor = 'var(--error-color)';
        return false;
    } else {
        field.style.borderColor = 'var(--border-color)';
        return true;
    }
}

function clearFieldError(field) {
    const errorElement = field.parentNode.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    field.style.borderColor = 'var(--border-color)';
}

function showFormSuccess() {
    // Create success notification
    const notification = createNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function showFormError(message) {
    const notification = createNotification(message, 'error');
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function createNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-secondary);
        border: 2px solid var(${type === 'success' ? '--success-color' : '--error-color'});
        color: var(${type === 'success' ? '--success-color' : '--error-color'});
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        z-index: var(--z-tooltip);
        animation: slideInRight 0.3s ease;
        backdrop-filter: blur(20px);
    `;
    
    return notification;
}

// ===== BACK TO TOP =====
function initBackToTop() {
    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===== VIEW COUNTER =====
async function initViewCounter() {
    try {
        const response = await fetch(CONFIG.api.viewCounter);
        const data = await response.json();
        visitorCount = data.value || 0;
        
        if (elements.visitorCount) {
            elements.visitorCount.textContent = formatNumber(visitorCount);
        }
    } catch (error) {
        console.error('Error fetching view count:', error);
        if (elements.visitorCount) {
            elements.visitorCount.textContent = '1,234'; // Fallback number
        }
    }
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toLocaleString();
}

// ===== CURRENT TIME =====
function initCurrentTime() {
    if (elements.currentTime) {
        updateCurrentTime();
        setInterval(updateCurrentTime, 60000); // Update every minute
    }
}

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    
    if (elements.currentTime) {
        elements.currentTime.textContent = `${timeString} PST`;
    }
}

// ===== NEURAL NETWORK ANIMATION =====
function generateNeuralNetwork() {
    const svg = document.querySelector('.network-svg');
    if (!svg) return;
    
    const nodes = [];
    const connections = [];
    const nodeCount = 20;
    
    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
        const node = {
            x: Math.random() * 800,
            y: Math.random() * 400,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2
        };
        nodes.push(node);
        
        // Create circle element
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', node.x);
        circle.setAttribute('cy', node.y);
        circle.setAttribute('r', '3');
        circle.setAttribute('fill', 'var(--primary-color)');
        circle.setAttribute('filter', 'url(#glow)');
        svg.appendChild(circle);
    }
    
    // Create connections
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = Math.sqrt(
                Math.pow(nodes[i].x - nodes[j].x, 2) + 
                Math.pow(nodes[i].y - nodes[j].y, 2)
            );
            
            if (distance < 150) {
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', nodes[i].x);
                line.setAttribute('y1', nodes[i].y);
                line.setAttribute('x2', nodes[j].x);
                line.setAttribute('y2', nodes[j].y);
                line.setAttribute('stroke', 'var(--primary-color)');
                line.setAttribute('stroke-width', '1');
                line.setAttribute('opacity', '0.3');
                line.setAttribute('filter', 'url(#glow)');
                svg.appendChild(line);
                connections.push({line, nodeA: i, nodeB: j});
            }
        }
    }
    
    // Animate network
    function animateNetwork() {
        const circles = svg.querySelectorAll('circle');
        const lines = svg.querySelectorAll('line');
        
        // Update node positions
        nodes.forEach((node, index) => {
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off edges
            if (node.x <= 0 || node.x >= 800) node.vx *= -1;
            if (node.y <= 0 || node.y >= 400) node.vy *= -1;
            
            // Update circle position
            circles[index].setAttribute('cx', node.x);
            circles[index].setAttribute('cy', node.y);
        });
        
        // Update connections
        connections.forEach(connection => {
            const nodeA = nodes[connection.nodeA];
            const nodeB = nodes[connection.nodeB];
            
            connection.line.setAttribute('x1', nodeA.x);
            connection.line.setAttribute('y1', nodeA.y);
            connection.line.setAttribute('x2', nodeB.x);
            connection.line.setAttribute('y2', nodeB.y);
        });
        
        requestAnimationFrame(animateNetwork);
    }
    
    animateNetwork();
}

// ===== ANALYTICS =====
function initAnalytics() {
    // Google Analytics (replace with your tracking ID)
    if (CONFIG.api.analytics && CONFIG.api.analytics !== 'GA_TRACKING_ID') {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.api.analytics}`;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', CONFIG.api.analytics);
    }
    
    // Track page interactions
    trackUserInteractions();
}

function trackUserInteractions() {
    // Track navigation clicks
    elements.navLinks.forEach(link => {
        link.addEventListener('click', () => {
            gtag('event', 'navigation_click', {
                'section': link.getAttribute('data-section')
            });
        });
    });
    
    // Track project views
    document.addEventListener('click', (e) => {
        if (e.target.closest('.project-btn')) {
            gtag('event', 'project_view', {
                'project_id': e.target.closest('.project-card').dataset.category
            });
        }
    });
    
    // Track contact form submissions
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', () => {
            gtag('event', 'contact_form_submit');
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Theme toggle: Ctrl/Cmd + Shift + T
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        toggleTheme();
    }
    
    // Quick navigation: Alt + number keys
    if (e.altKey && !isNaN(e.key) && e.key >= '1' && e.key <= '7') {
        e.preventDefault();
        const sections = ['home', 'about', 'experience', 'projects', 'skills', 'blog', 'contact'];
        const sectionIndex = parseInt(e.key) - 1;
        if (sections[sectionIndex]) {
            scrollToSection(sections[sectionIndex]);
        }
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Portfolio Error:', e.error);
    
    // Send error to analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.message,
            'fatal': false
        });
    }
});

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', function() {
    // Log performance metrics
    if ('performance' in window) {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Portfolio Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        
        // Send to analytics if available
        if (typeof gtag !== 'undefined') {
            gtag('event', 'timing_complete', {
                'name': 'load',
                'value': Math.round(perfData.loadEventEnd - perfData.loadEventStart)
            });
        }
    }
});

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Focus management for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Announce page changes for screen readers// ===== PORTFOLIO CONFIGURATION =====
const CONFIG = {
    // Personal Information
    personal: {
        name: "Alex Morgan",
        title: "Full-Stack Developer",
        email: "alex@alexmorgan.dev",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        timezone: "PST",
        github: "https://github.com/alexmorgan",
        linkedin: "https://linkedin.com/in/alexmorgan",
        twitter: "https://twitter.com/alexmorgan_dev"
    },
    
    // API Configuration
    api: {
        viewCounter: "https://api.countapi.xyz/hit/alexmorgan.dev/visits",
        contactForm: "https://formspree.io/f/your-form-id", // Replace with your Formspree ID
        analytics: "GA_TRACKING_ID" // Replace with your Google Analytics ID
    },
    
    // Animation Settings
    animation: {
        typingSpeed: 100,
        progressSpeed: 2000,
        scrollOffset: 100,
        particleCount: 50
    }
};

// ===== GLOBAL VARIABLES =====
let currentTheme = 'dark';
let isLoading = true;
let visitorCount = 0;
let activeSection = 'home';
let skillsAnimated = false;

// ===== DOM ELEMENTS =====
const elements = {
    // Navigation
    navbar: document.getElementById('navbar'),
    navToggle: document.getElementById('navToggle'),
    navMenu: document.getElementById('navMenu'),
    navLinks: document.querySelectorAll('.nav-link'),
    themeToggle: document.getElementById('themeToggle'),
    
    // Loading
    loadingScreen: document.getElementById('loadingScreen'),
    
    // Hero
    codeDisplay: document.getElementById('codeDisplay'),
    statNumbers: document.querySelectorAll('.stat-number'),
    currentTime: document.getElementById('currentTime'),
    
    // View Counter
    viewCounter: document.getElementById('viewCounter'),
    visitorCount: document.getElementById('visitorCount'),
    
    // Interactive Elements
    projectModal: document.getElementById('projectModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalContent: document.getElementById('modalContent'),
    modalClose: document.getElementById('modalClose'),
    
    // Forms
    contactForm: document.getElementById('contactForm'),
    
    // Back to Top
    backToTop: document.getElementById('backToTop'),
    
    // Filter Elements
    projectFilters: document.querySelectorAll('.project-filters .filter-btn'),
    skillsFilters: document.querySelectorAll('.skills-filters .filter-btn'),
    projectCards: document.querySelectorAll('.project-card'),
    skillCards: document.querySelectorAll('.skill-card'),
    
    // Progress Bars
    progressBars: document.querySelectorAll('.progress-bar')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

async function initializePortfolio() {
    try {
        // Initialize core features
        initTheme();
        initNavigation();
        initLoadingScreen();
        
        // Initialize interactive features
        initHeroAnimations();
        initScrollAnimations();
        initFilters();
        initModal();
        initContactForm();
        initBackToTop();
        
        // Initialize external features
        await initViewCounter();
        initCurrentTime();
        generateNeuralNetwork();
        
        // Initialize analytics
        initAnalytics();
        
        console.log('Portfolio initialized successfully');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
}

// ===== THEME MANAGEMENT =====
function initTheme() {
    // Get saved theme or default to dark
    currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();
    
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
    
    // Add transition class temporarily
    document.body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

function updateThemeIcon() {
    if (elements.themeToggle) {
        const icon = elements.themeToggle.querySelector('i');
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===== LOADING SCREEN =====
function initLoadingScreen() {
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Animate loading progress
    if (loadingProgress) {
        loadingProgress.style.width = '0%';
        
        setTimeout(() => {
            loadingProgress.style.width = '100%';
        }, 500);
    }
    
    // Hide loading screen after delay
    setTimeout(() => {
        if (elements.loadingScreen) {
            elements.loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'visible';
            isLoading = false;
        }
    }, 3000);
}

// ===== NAVIGATION =====
function initNavigation() {
    // Mobile menu toggle
    if (elements.navToggle) {
        elements.navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Navigation links
    elements.navLinks.forEach(link => {
        link.addEventListener('click', handleNavClick);
    });
    
    // Scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-container') && elements.navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
}

function toggleMobileMenu() {
    if (elements.navMenu && elements.navToggle) {
        elements.navMenu.classList.toggle('active');
        elements.navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = elements.navMenu.classList.contains('active') ? 'hidden' : 'visible';
    }
}

function handleNavClick(e) {
    e.preventDefault();
    const targetSection = e.target.getAttribute('data-section') || e.target.closest('[data-section]').getAttribute('data-section');
    
    if (targetSection) {
        scrollToSection(targetSection);
        setActiveNavLink(targetSection);
        
        // Close mobile menu
        if (elements.navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function setActiveNavLink(sectionId) {
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    activeSection = sectionId;
}

function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update navbar background
    if (elements.navbar) {
        if (scrollTop > 50) {
            elements.navbar.classList.add('scrolled');
        } else {
            elements.navbar.classList.remove('scrolled');
        }
    }
    
    // Update active navigation based on scroll position
    updateActiveNavOnScroll();
    
    // Show/hide back to top button
    if (elements.backToTop) {
        if (scrollTop > 500) {
            elements.backToTop.classList.add('visible');
