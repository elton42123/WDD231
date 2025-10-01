// Join Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeJoinPage();
    updateFooterInfo();
});

function initializeJoinPage() {
    // Set timestamp when page loads
    setFormTimestamp();
    
    // Initialize modals
    initializeModals();
    
    // Add animation to membership cards
    animateMembershipCards();
}

// Set form timestamp
function setFormTimestamp() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
        console.log('Form timestamp set:', timestampField.value);
    }
}

// Initialize modal functionality
function initializeModals() {
    const modalButtons = document.querySelectorAll('.info-btn');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Open modal when info button is clicked
    modalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        });
    });
    
    // Close modal when X is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });
    
    // Close modal when clicking outside
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            });
        }
    });
}

// Animate membership cards on page load
function animateMembershipCards() {
    const cards = document.querySelectorAll('.membership-card');
    
    // Cards are already animated with CSS, but we can add additional effects
    cards.forEach((card, index) => {
        // Add hover effect enhancement
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    console.log('Membership cards animated');
}

// Form validation enhancement
function setupFormValidation() {
    const form = document.getElementById('membershipForm');
    const titleInput = document.getElementById('title');
    
    if (titleInput) {
        titleInput.addEventListener('input', function() {
            const pattern = /^[A-Za-z\s\-]{7,}$/;
            if (this.value && !pattern.test(this.value)) {
                this.setCustomValidity('Title must be at least 7 characters and contain only letters, spaces, and hyphens');
            } else {
                this.setCustomValidity('');
            }
        });
    }
    
    if (form) {
        form.addEventListener('submit', function(e) {
            // Additional validation can be added here if needed
            console.log('Form submitted successfully');
        });
    }
}

// Footer information
function updateFooterInfo() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    
    const yearElement = document.getElementById('currentYear');
    const modifiedElement = document.getElementById('lastModified');
    
    if (yearElement) yearElement.textContent = currentYear;
    if (modifiedElement) modifiedElement.textContent = `Last Modified: ${lastModified}`;
}

// Initialize form validation
setupFormValidation();