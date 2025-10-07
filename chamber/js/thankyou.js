// Thank You Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeThankYouPage();
    updateFooterInfo();
});

function initializeThankYouPage() {
    displayApplicationData();
    setupConfirmationAnimation();
}

// Display form data from URL parameters
function displayApplicationData() {
    const urlParams = new URLSearchParams(window.location.search);
    const summaryContainer = document.getElementById('applicationData');
    
    if (!summaryContainer) return;
    
    // Get form data from URL parameters
    const formData = {
        firstName: urlParams.get('firstName') || 'Not provided',
        lastName: urlParams.get('lastName') || 'Not provided',
        email: urlParams.get('email') || 'Not provided',
        phone: urlParams.get('phone') || 'Not provided',
        businessName: urlParams.get('businessName') || 'Not provided',
        membershipLevel: getMembershipLevelName(urlParams.get('membershipLevel')),
        timestamp: formatTimestamp(urlParams.get('timestamp'))
    };
    
    // Create HTML for displaying data
    summaryContainer.innerHTML = `
        <div class="confirmation-icon">
            <span>✅</span>
        </div>
        <div class="success-message">
            <h3>Application Received Successfully!</h3>
            <p>We've sent a confirmation email and will contact you within 2 business days.</p>
        </div>
        <div class="data-item">
            <span class="data-label">First Name:</span>
            <span class="data-value">${formData.firstName}</span>
        </div>
        <div class="data-item">
            <span class="data-label">Last Name:</span>
            <span class="data-value">${formData.lastName}</span>
        </div>
        <div class="data-item">
            <span class="data-label">Email:</span>
            <span class="data-value">${formData.email}</span>
        </div>
        <div class="data-item">
            <span class="data-label">Phone:</span>
            <span class="data-value">${formData.phone}</span>
        </div>
        <div class="data-item">
            <span class="data-label">Business Name:</span>
            <span class="data-value">${formData.businessName}</span>
        </div>
        <div class="data-item">
            <span class="data-label">Membership Level:</span>
            <span class="data-value">${formData.membershipLevel}</span>
        </div>
        <div class="data-item">
            <span class="data-label">Application Date:</span>
            <span class="data-value">${formData.timestamp}</span>
        </div>
        <div class="next-steps">
            <h3>What Happens Next?</h3>
            <ul>
                <li>Our team will review your application within 2 business days</li>
                <li>You'll receive a welcome email with membership details</li>
                <li>A chamber representative will contact you to discuss benefits</li>
                <li>You'll gain access to all member resources upon approval</li>
            </ul>
        </div>
    `;
    
    console.log('Application data displayed:', formData);
}

// Helper function to format membership level name
function getMembershipLevelName(level) {
    const levels = {
        'np': 'NP Membership (Non-Profit) - Free',
        'bronze': 'Bronze Membership - $200/year',
        'silver': 'Silver Membership - $400/year', 
        'gold': 'Gold Membership - $600/year'
    };
    return levels[level] || 'Not specified';
}

// Helper function to format timestamp
function formatTimestamp(timestamp) {
    if (!timestamp) return 'Not available';
    
    try {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Error formatting timestamp:', error);
        return 'Not available';
    }
}

// Add some animation to the confirmation
function setupConfirmationAnimation() {
    const confirmationIcon = document.querySelector('.confirmation-icon span');
    if (confirmationIcon) {
        confirmationIcon.style.opacity = '0';
        confirmationIcon.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
            confirmationIcon.style.transition = 'all 0.5s ease';
            confirmationIcon.style.opacity = '1';
            confirmationIcon.style.transform = 'scale(1)';
        }, 100);
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