// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navMenu.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Smooth Scrolling for Navigation Links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Background Change on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Parallax Effect for Hero Section
    const heroBackground = document.querySelector('.hero-background');
    const floatingShapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        floatingShapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px) rotate(${rate * 0.1}deg)`;
        });
    });

    // Interactive Server Rack Animation
    const serverRack = document.querySelector('.server-rack');
    const servers = document.querySelectorAll('.server');
    
    if (serverRack) {
        serverRack.addEventListener('mouseenter', function() {
            servers.forEach((server, index) => {
                server.style.animationPlayState = 'paused';
                server.style.transform += ' scale(1.1)';
            });
        });
        
        serverRack.addEventListener('mouseleave', function() {
            servers.forEach((server, index) => {
                server.style.animationPlayState = 'running';
                server.style.transform = server.style.transform.replace(' scale(1.1)', '');
            });
        });
    }

    // Interactive Dashboard Preview
    const dashboardTabs = document.querySelectorAll('.dashboard-tabs .tab');
    const serverItems = document.querySelectorAll('.server-item');
    
    dashboardTabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            dashboardTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Simulate tab switching animation
            serverItems.forEach((item, itemIndex) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, itemIndex * 100);
            });
        });
    });

    // Interactive Network Diagram
    const networkNodes = document.querySelectorAll('.node');
    const connections = document.querySelectorAll('.connection');
    
    networkNodes.forEach((node, index) => {
        node.addEventListener('mouseenter', function() {
            this.style.transform += ' scale(1.2)';
            this.style.zIndex = '10';
            
            // Highlight connected connections
            connections.forEach((connection, connIndex) => {
                if (connIndex === index || connIndex === (index + 1) % 4) {
                    connection.style.height = '4px';
                    connection.style.background = 'linear-gradient(45deg, #f59e0b, #ef4444)';
                }
            });
        });
        
        node.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.2)', '');
            this.style.zIndex = '1';
            
            // Reset connections
            connections.forEach(connection => {
                connection.style.height = '2px';
                connection.style.background = 'linear-gradient(45deg, #6366f1, #10b981)';
            });
        });
    });

    // Interactive Service Cards
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Interactive Pricing Cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(-15px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Form Handling
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const subject = this.querySelector('input[placeholder="Subject"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Interactive Buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect styles
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Counter Animation for Stats
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    // Intersection Observer for stats animation
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numbers = entry.target.querySelectorAll('.stat-number');
                    numbers.forEach(number => {
                        const target = number.textContent;
                        if (target.includes('%')) {
                            animateCounter(number, 99.9, 2000);
                        } else if (target.includes('+')) {
                            animateCounter(number, 50, 2000);
                        } else {
                            animateCounter(number, 24, 2000);
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });

    // Parallax scrolling for background elements
    const parallaxElements = document.querySelectorAll('.floating-shapes, .server-rack, .network-diagram');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Interactive hover effects for service features
    const serviceFeatures = document.querySelectorAll('.service-features span');
    
    serviceFeatures.forEach(feature => {
        feature.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.background = 'var(--gradient-primary)';
            this.style.color = 'white';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.background = 'var(--light-color)';
            this.style.color = 'var(--gray-color)';
        });
    });

    // Loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading';
    loadingScreen.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingScreen);
    
    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    });

    // Utility Functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add notification styles
        const notificationStyle = document.createElement('style');
        notificationStyle.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 600;
                z-index: 10000;
                transform: translateX(100%);
                transition: transform 0.3s ease;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-success {
                background: var(--secondary-color);
            }
            .notification-error {
                background: #ef4444;
            }
            .notification-info {
                background: var(--primary-color);
            }
        `;
        document.head.appendChild(notificationStyle);
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Update navbar background
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    // Initialize tooltips for interactive elements
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.top = rect.top - 40 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) + 'px';
            tooltip.style.transform = 'translateX(-50%)';
            
            document.body.appendChild(tooltip);
            
            setTimeout(() => {
                tooltip.classList.add('show');
            }, 100);
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Add tooltip styles
    const tooltipStyle = document.createElement('style');
    tooltipStyle.textContent = `
        .tooltip {
            background: var(--dark-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 0.875rem;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10001;
        }
        .tooltip.show {
            opacity: 1;
        }
        .tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 5px solid transparent;
            border-top-color: var(--dark-color);
        }
    `;
    document.head.appendChild(tooltipStyle);

    console.log('NoneCloud website initialized successfully! 🚀');
});