// ===========================
// Kali Login Screen Handler with Boot Sequence
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    const loginScreen = document.getElementById('kali-login-screen');
    const bootScreen = document.getElementById('boot-screen');
    const accessGrantedScreen = document.getElementById('access-granted-screen');
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('kali-password');
    const body = document.body;

    // Initially hide main content
    body.classList.add('content-hidden');

    // Kali Linux boot messages
    const bootMessages = [
        { text: '[    0.000000] Linux version 6.1.0-kali9-amd64 (devel@kali.org)', type: 'info' },
        { text: '[    0.000000] Command line: BOOT_IMAGE=/boot/vmlinuz-6.1.0-kali9-amd64', type: '' },
        { text: '[    0.000000] Kernel command line: quiet splash', type: '' },
        { text: '[    0.124567] Memory: 8192MB available', type: 'success' },
        { text: '[    0.234891] CPU: Intel(R) Core(TM) i7 @ 2.60GHz', type: 'info' },
        { text: '[    0.456234] Initializing cgroup subsys cpuset', type: '' },
        { text: '[    0.567890] Initializing cgroup subsys cpu', type: '' },
        { text: '[    0.678123] Initializing cgroup subsys cpuacct', type: '' },
        { text: '[    0.789456] ACPI: Core revision 20220331', type: '' },
        { text: '[    0.890234] ACPI: 4 ACPI AML tables successfully acquired and loaded', type: 'success' },
        { text: '[    1.012345] PCI: Using configuration type 1 for base access', type: '' },
        { text: '[    1.123456] ACPI: Added _OSI(Module Device)', type: '' },
        { text: '[    1.234567] ACPI: Added _OSI(Processor Device)', type: '' },
        { text: '[    1.345678] ACPI: Added _OSI(3.0 _SCP Extensions)', type: '' },
        { text: '[    1.456789] ACPI: Interpreter enabled', type: 'success' },
        { text: '[    1.567890] ACPI: PM: (supports S0 S3 S4 S5)', type: '' },
        { text: '[    1.678901] ACPI: Using IOAPIC for interrupt routing', type: '' },
        { text: '[    1.789012] PCI: MMCONFIG for domain 0000 [bus 00-3f]', type: '' },
        { text: '[    1.890123] PCI: MMCONFIG at [mem 0xf8000000-0xfbffffff]', type: '' },
        { text: '[    2.001234] SCSI subsystem initialized', type: 'success' },
        { text: '[    2.112345] libata version 3.00 loaded', type: '' },
        { text: '[    2.223456] usbcore: registered new interface driver usbfs', type: '' },
        { text: '[    2.334567] usbcore: registered new interface driver hub', type: '' },
        { text: '[    2.445678] usbcore: registered new device driver usb', type: '' },
        { text: '[    2.556789] NetLabel: Initializing', type: 'info' },
        { text: '[    2.667890] NetLabel: domain hash size = 128', type: '' },
        { text: '[    2.778901] NetLabel: protocols = UNLABELED CIPSOv4 CALIPSO', type: '' },
        { text: '[    2.890012] NetLabel: unlabeled traffic allowed by default', type: 'success' },
        { text: '[    3.001123] Freeing unused kernel memory: 2048K', type: '' },
        { text: '[    3.112234] Write protecting the kernel read-only data: 18432k', type: 'success' },
        { text: '[    3.223345] Freeing unused kernel memory: 2028K', type: '' },
        { text: '[    3.334456] systemd[1]: systemd 252.5-1~kali1 running in system mode', type: 'info' },
        { text: '[    3.445567] systemd[1]: Detected architecture x86-64', type: '' },
        { text: '[    3.556678] systemd[1]: Set hostname to <kali>', type: 'success' },
        { text: '[    3.667789] systemd[1]: Reached target Local File Systems (Pre)', type: 'success' },
        { text: '[    3.778890] systemd[1]: Reached target Local File Systems', type: 'success' },
        { text: '[    3.889901] systemd[1]: Starting Load/Save Random Seed...', type: '' },
        { text: '[    3.990012] systemd[1]: Starting Create Volatile Files and Directories...', type: '' },
        { text: '[    4.101123] systemd[1]: Started Network Name Resolution', type: 'success' },
        { text: '[    4.212234] systemd[1]: Started Network Manager', type: 'success' },
        { text: '[    4.323345] systemd[1]: Reached target Network', type: 'success' },
        { text: '[    4.434456] systemd[1]: Starting OpenSSH server daemon...', type: '' },
        { text: '[    4.545567] systemd[1]: Started OpenSSH server daemon', type: 'success' },
        { text: '[    4.656678] systemd[1]: Reached target Multi-User System', type: 'success' },
        { text: '[    4.767789] systemd[1]: Reached target Graphical Interface', type: 'success' },
        { text: '[    4.878890] systemd[1]: Starting Update UTMP about System Runlevel Changes...', type: '' },
        { text: '[    4.989901] systemd[1]: Startup finished in 4.989s (kernel) + 2.456s (userspace) = 7.445s', type: 'success' },
        { text: '', type: '' },
        { text: 'Kali GNU/Linux Rolling kali tty1', type: 'info' },
        { text: '', type: '' },
        { text: 'kali login: kali', type: 'success' },
        { text: 'Password: ', type: '' },
        { text: 'Last login: Thu Dec 19 20:46:33 2025', type: '' },
        { text: '', type: '' },
        { text: 'Initializing security modules...', type: 'info' },
        { text: 'Loading user profile...', type: '' },
        { text: 'Establishing secure connection...', type: 'success' },
        { text: '', type: '' }
    ];

    // Boot sequence function
    function startBootSequence() {
        // Hide login screen
        loginScreen.classList.add('fade-out');

        setTimeout(() => {
            loginScreen.style.display = 'none';

            // Show boot screen
            bootScreen.classList.add('active');

            // Display boot messages sequentially
            const bootTextContainer = document.getElementById('boot-text');
            let messageIndex = 0;

            function displayNextMessage() {
                if (messageIndex < bootMessages.length) {
                    const message = bootMessages[messageIndex];
                    const line = document.createElement('div');
                    line.className = `boot-line ${message.type}`;
                    line.textContent = message.text;
                    bootTextContainer.appendChild(line);

                    // Auto-scroll to bottom
                    const bootContainer = bootTextContainer.parentElement;
                    bootContainer.scrollTop = bootContainer.scrollHeight;

                    messageIndex++;

                    // Random delay between 30-80ms for realistic effect
                    const delay = Math.random() * 50 + 30;
                    setTimeout(displayNextMessage, delay);
                } else {
                    // Boot sequence complete, start access granted animation
                    setTimeout(showAccessGranted, 500);
                }
            }

            displayNextMessage();
        }, 800);
    }

    // Access Granted animation
    function showAccessGranted() {
        // Fade out boot screen
        bootScreen.classList.add('fade-out');

        setTimeout(() => {
            bootScreen.style.display = 'none';

            // Show access granted screen
            accessGrantedScreen.classList.add('active');

            // Typewriter effect for "ACCESS GRANTED"
            const text = 'ACCESS GRANTED';
            const accessTextElement = document.getElementById('access-granted-text');
            let charIndex = 0;

            function typeNextChar() {
                if (charIndex < text.length) {
                    accessTextElement.textContent += text[charIndex];
                    charIndex++;

                    // Typing speed: 80-120ms per character
                    const delay = Math.random() * 40 + 80;
                    setTimeout(typeNextChar, delay);
                } else {
                    // Hide cursor after typing complete
                    setTimeout(() => {
                        document.querySelector('.access-cursor').style.display = 'none';

                        // Wait 1 second then transition to home page
                        setTimeout(enterWebsite, 1000);
                    }, 500);
                }
            }

            typeNextChar();
        }, 500);
    }

    // Enter website (show main content)
    function enterWebsite() {
        // Fade out access granted screen
        accessGrantedScreen.classList.add('fade-out');

        setTimeout(() => {
            accessGrantedScreen.style.display = 'none';
            body.classList.remove('content-hidden');

            // Start matrix rain effect once after login
            startMatrixRain();
        }, 500);
    }

    // Handle login button click
    function handleLogin() {
        startBootSequence();
    }

    // Login button click event
    loginBtn.addEventListener('click', handleLogin);

    // Allow Enter key to login
    passwordInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            handleLogin();
        }
    });
});


// ===========================
// Matrix Rain Effect
// ===========================
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Matrix characters
const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~';
const fontSize = 14;
const columns = canvas.width / fontSize;

// Array to store drop positions - start at top (0) instead of random
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 0; // Start all drops at the top
}

// Draw matrix rain
function drawMatrix() {
    // Semi-transparent black to create fade effect
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text style
    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    // Draw characters
    for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Store interval ID so we can start it on demand
let matrixInterval = null;

// Function to start matrix rain (called once after login)
function startMatrixRain() {
    if (!matrixInterval) {
        // Reset all drops to start from top for fresh effect
        for (let i = 0; i < drops.length; i++) {
            drops[i] = Math.floor(Math.random() * -20); // Slight stagger for natural cascade
        }
        matrixInterval = setInterval(drawMatrix, 50);
    }
}


// ===========================
// Typewriter Effect
// ===========================
const roles = [
    'Security Researcher',
    'Jr. Cybersecurity Analyst',
    'Pentester',
    'SOC Analyst'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

const typewriterElement = document.querySelector('.typewriter-text');

function typeWriter() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        // Delete characters
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        // Type characters
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    // Check if word is complete
    if (!isDeleting && charIndex === currentRole.length) {
        // Pause at end
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect after page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// ===========================
// Mobile Navigation Toggle
// ===========================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');

    // Animate hamburger
    const bars = hamburger.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        if (navMenu.classList.contains('active')) {
            if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
            if (index === 1) bar.style.opacity = '0';
            if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        }
    });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    });
});

// ===========================
// Smooth Scrolling
// ===========================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// ===========================
// Glitch Effect on Hover
// ===========================
const glitchText = document.querySelector('.glitch-text');

glitchText.addEventListener('mouseenter', () => {
    let iterations = 0;
    // Sanitize data-text attribute (defense-in-depth)
    const originalText = glitchText.getAttribute('data-text') || 'Harish D';
    const sanitizedText = originalText.replace(/[<>"'&]/g, ''); // Remove HTML special chars

    const interval = setInterval(() => {
        glitchText.textContent = sanitizedText
            .split('')
            .map((char, index) => {
                if (index < iterations) {
                    return sanitizedText[index];
                }
                return matrixChars[Math.floor(Math.random() * matrixChars.length)];
            })
            .join('');

        iterations += 1 / 3;

        if (iterations >= sanitizedText.length) {
            clearInterval(interval);
            glitchText.textContent = sanitizedText;
        }
    }, 30);
});

// ===========================
// Progress Bar Animation
// ===========================
const progressBars = document.querySelectorAll('.progress-fill');

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 100);
            progressObserver.unobserve(progressBar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// ===========================
// Project Card Hover Effects
// ===========================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.borderColor = '#00ff41';
    });

    card.addEventListener('mouseleave', function () {
        this.style.borderColor = 'rgba(0, 255, 65, 0.2)';
    });
});

// ===========================
// Scroll Spy Navigation Highlighting
// ===========================
const navSections = document.querySelectorAll('.section, .hero');

const navObserverOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
};

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');

            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });

            // Add active class to the corresponding nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, navObserverOptions);

// Observe all sections
navSections.forEach(section => {
    navObserver.observe(section);
});

// ===========================
// Tech Badge Hover Effects
// ===========================
const techBadges = document.querySelectorAll('.tech-badge');

techBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
    });

    badge.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
    });
});

// ===========================
// Scroll Indicator Hide on Scroll
// ===========================
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
    } else {
        scrollIndicator.style.opacity = '1';
    }
});

// ===========================
// Terminal Command Typewriter Animation
// ===========================
class TerminalCommandAnimator {
    constructor() {
        this.currentlyAnimating = new Set(); // Track sections currently animating to prevent overlaps
        this.lastScrollY = window.scrollY; // Track last scroll position
        this.scrollDirection = 'down'; // Track scroll direction

        // Monitor scroll direction
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
            this.lastScrollY = currentScrollY;
        }, { passive: true });
    }

    async animateCommand(commandElement, cursorElement, contentElement, sectionId) {
        const command = commandElement.dataset.command;
        if (!command) return;

        // Show cursor
        cursorElement.classList.remove('hidden');

        // Type command character by character
        let currentText = '';
        for (let i = 0; i < command.length; i++) {
            currentText += command[i];
            commandElement.textContent = currentText;

            // Random delay between 50-100ms for realistic typing
            await this.delay(Math.random() * 50 + 50);
        }

        // Hide cursor after typing
        await this.delay(200);
        cursorElement.classList.add('hidden');

        // Execution delay (command processing)
        await this.delay(400);

        // Reveal content
        contentElement.classList.add('revealed');

        // Remove from currently animating set
        this.currentlyAnimating.delete(sectionId);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    observeSections() {
        const sections = document.querySelectorAll('.section:not(#home)');

        // Create two observers with different trigger zones

        // Observer for DOWNWARD scrolling (trigger when entering from bottom)
        const downwardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && this.scrollDirection === 'down') {
                    this.handleSectionIntersection(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -250px 0px' // Trigger when section is 250px into viewport from bottom
        });

        // Observer for UPWARD scrolling (trigger when entering from top)
        const upwardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && this.scrollDirection === 'up') {
                    this.handleSectionIntersection(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-100px 0px 0px 0px' // Trigger when section header is 100px into viewport from top
        });

        // Observe all sections with both observers
        sections.forEach(section => {
            downwardObserver.observe(section);
            upwardObserver.observe(section);
        });
    }

    handleSectionIntersection(section) {
        const sectionId = section.id;

        // Skip if this section is currently animating
        if (this.currentlyAnimating.has(sectionId)) return;

        const commandElement = section.querySelector('.terminal-command');
        const cursorElement = section.querySelector('.terminal-cursor');
        const contentElement = section.querySelector('.section-content');

        if (commandElement && cursorElement && contentElement) {
            // Mark this section as currently animating
            this.currentlyAnimating.add(sectionId);

            // Reset for animation
            commandElement.textContent = '';
            cursorElement.classList.remove('hidden');
            contentElement.classList.remove('revealed');

            // Determine delay based on scroll direction
            const delay = this.scrollDirection === 'down' ? 300 : 200;

            // Add a delay to ensure the header is fully visible before starting animation
            setTimeout(() => {
                this.animateCommand(commandElement, cursorElement, contentElement, sectionId);
            }, delay);
        }
    }
}

// Initialize terminal command animator on DOM load
document.addEventListener('DOMContentLoaded', () => {
    const animator = new TerminalCommandAnimator();
    animator.observeSections();
});

// ===========================
// Contact Form Handler with EmailJS
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your public key
    emailjs.init('iNNHjtZ8tQ2s9C-le');

    // Rate limiting state
    const rateLimiter = {
        attempts: 0,
        lastAttempt: 0,
        maxAttempts: 3,
        windowMs: 60000, // 1 minute

        canSubmit() {
            const now = Date.now();

            // Reset if window expired
            if (now - this.lastAttempt > this.windowMs) {
                this.attempts = 0;
            }

            // Check if under limit
            if (this.attempts >= this.maxAttempts) {
                const remainingTime = Math.ceil((this.windowMs - (now - this.lastAttempt)) / 1000);
                return { allowed: false, remainingTime };
            }

            return { allowed: true };
        },

        recordAttempt() {
            this.attempts++;
            this.lastAttempt = Date.now();
        }
    };

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = contactForm ? contactForm.querySelector('.form-submit') : null;

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Rate limiting check
            const rateLimitCheck = rateLimiter.canSubmit();
            if (!rateLimitCheck.allowed) {
                showFormStatus('error', `[ ERROR ] Too many attempts. Please wait ${rateLimitCheck.remainingTime} seconds.`);
                return;
            }

            // Input sanitization function
            function sanitizeInput(input, maxLength = 500) {
                // Trim whitespace
                let sanitized = input.trim();

                // Limit length
                sanitized = sanitized.substring(0, maxLength);

                // Remove null bytes
                sanitized = sanitized.replace(/\0/g, '');

                // Normalize unicode
                sanitized = sanitized.normalize('NFC');

                // Remove control characters except newlines and tabs
                sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

                return sanitized;
            }

            // Get and sanitize form values
            const name = sanitizeInput(document.getElementById('name').value, 100);
            const email = sanitizeInput(document.getElementById('email').value, 254);
            const message = sanitizeInput(document.getElementById('message').value, 2000);

            // Basic validation
            if (!name || !email || !message) {
                showFormStatus('error', '[ ERROR ] All fields are required!');
                return;
            }

            // Name length validation
            if (name.length < 2) {
                showFormStatus('error', '[ ERROR ] Name must be at least 2 characters!');
                return;
            }

            // Message length validation
            if (message.length < 10) {
                showFormStatus('error', '[ ERROR ] Message must be at least 10 characters!');
                return;
            }

            // RFC 5322 compliant email validation (simplified)
            const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
            if (!emailRegex.test(email)) {
                showFormStatus('error', '[ ERROR ] Please enter a valid email address!');
                return;
            }

            // Email length check
            if (email.length > 254) {
                showFormStatus('error', '[ ERROR ] Email address is too long!');
                return;
            }

            // Check for consecutive dots
            if (email.includes('..')) {
                showFormStatus('error', '[ ERROR ] Invalid email format!');
                return;
            }

            // Record attempt before sending
            rateLimiter.recordAttempt();

            // Show loading state
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> [ SENDING... ]';
            showFormStatus('info', '[ INFO ] Sending your message...');

            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_name: 'Harish D'
            };

            // Send email using EmailJS
            emailjs.send('service_pxf4tgd', 'template_uu29jg9', templateParams)
                .then(function (response) {
                    // Success logged for debugging (remove in production)
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        console.log('Form submitted successfully');
                    }
                    showFormStatus('success', '[ SUCCESS ] Message sent! I\'ll get back to you soon.');

                    // Reset form after 3 seconds
                    setTimeout(() => {
                        contactForm.reset();
                        formStatus.className = 'form-status';
                        formStatus.textContent = '';
                        submitButton.disabled = false;
                        submitButton.innerHTML = originalButtonText;
                    }, 3000);
                }, function (error) {
                    // Log error only in development
                    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                        console.error('Form submission failed:', error.message);
                    }
                    showFormStatus('error', '[ ERROR ] Failed to send message. Please try again or email me directly.');
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                });
        });
    }

    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
    }
});

// ===========================
// Console Easter Egg
// ===========================
console.log('%c🔒 SYSTEM ACCESS GRANTED 🔒', 'color: #00ff41; font-size: 20px; font-weight: bold; font-family: monospace;');
console.log('%cWelcome to Harish D\'s Portfolio', 'color: #00f3ff; font-size: 14px; font-family: monospace;');
console.log('%cInterested in cybersecurity? Check the contact form!', 'color: #e0e0e0; font-size: 12px; font-family: monospace;');
// Email removed to prevent harvesting

