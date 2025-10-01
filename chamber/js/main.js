// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.getElementById('mobileNav');
    const themeToggle = document.getElementById('themeToggle');
    
  // Mobile navigation toggle
hamburger.addEventListener('click', function(e) {
    e.stopPropagation();
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    mobileNav.classList.toggle('active');
});

// Close mobile nav when clicking outside
document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});

// Close mobile nav when clicking a link
mobileNav.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        mobileNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    }
});
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', function() {
        const isDark = document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode', !isDark);
        
        // Update button text
        themeToggle.textContent = isDark ? '🌞' : '🌓';
        
        // Save preference to localStorage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        themeToggle.textContent = '🌞';
    }
    
    // Update footer year and last modified
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});