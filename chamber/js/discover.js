// Discover Page JavaScript
const ATTRACTIONS_JSON = 'data/attractions.json';
const LAST_VISIT_KEY = 'lastVisitDate';

// Initialize discover page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Discover page loaded - initializing...');
    initializeDiscoverPage();
    updateFooterInfo();
});

function initializeDiscoverPage() {
    console.log('Initializing discover page...');
    
    // Handle visitor message
    handleVisitorMessage();
    
    // Load attractions data
    loadAttractions();
    
    // Close message functionality
    setupMessageClose();
}

// Handle localStorage for visitor messages
function handleVisitorMessage() {
    const messageElement = document.getElementById('message-text');
    const messageContainer = document.getElementById('visitor-message');
    
    if (!messageElement || !messageContainer) {
        console.error('Visitor message elements not found');
        return;
    }
    
    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const currentTime = Date.now();
    
    console.log('Last visit timestamp:', lastVisit);
    
    if (!lastVisit) {
        // First visit
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
        console.log('First visit detected');
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const timeDifference = currentTime - lastVisitTime;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        console.log('Days since last visit:', daysDifference);
        
        if (daysDifference === 0) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            messageElement.textContent = "You last visited 1 day ago.";
        } else {
            messageElement.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }
    
    // Show message
    messageContainer.classList.add('show');
    console.log('Visitor message displayed');
    
    // Store current visit
    localStorage.setItem(LAST_VISIT_KEY, currentTime.toString());
}

// Setup message close functionality
function setupMessageClose() {
    const closeButton = document.getElementById('close-message');
    const messageContainer = document.getElementById('visitor-message');
    
    if (closeButton && messageContainer) {
        closeButton.addEventListener('click', function() {
            messageContainer.classList.remove('show');
            console.log('Visitor message closed');
        });
    } else {
        console.warn('Close button or message container not found');
    }
}

// Load attractions from JSON
async function loadAttractions() {
    console.log('Starting to load attractions from:', ATTRACTIONS_JSON);
    
    try {
        const response = await fetch(ATTRACTIONS_JSON);
        console.log('Fetch response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const attractions = await response.json();
        console.log('Attractions loaded successfully:', attractions);
        console.log('Number of attractions:', attractions.length);
        
        // Debug: Check first attraction
        if (attractions.length > 0) {
            console.log('First attraction:', attractions[0]);
            console.log('First attraction image path:', `images/${attractions[0].image}`);
        }
        
        displayAttractions(attractions);
        
    } catch (error) {
        console.error('Error loading attractions:', error);
        displayError(`Unable to load attractions data: ${error.message}`);
    }
}

// Display attractions with grid layout
function displayAttractions(attractions) {
    const container = document.getElementById('attractions-container');
    
    if (!container) {
        console.error('Attractions container not found!');
        return;
    }
    
    console.log('Displaying attractions in container');
    
    // Clear loading message
    container.innerHTML = '<h2>Top Attractions</h2>';
    
    // Create grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'attractions-container';
    updateGridLayout(gridContainer); // Set initial grid layout
    
    // Create attraction cards
    attractions.forEach((attraction, index) => {
        console.log(`Creating card for attraction ${index + 1}:`, attraction.name);
        const card = createAttractionCard(attraction);
        gridContainer.appendChild(card);
    });
    
    container.appendChild(gridContainer);
    console.log('All attraction cards created and displayed');
    
    // Update grid layout on window resize
    window.addEventListener('resize', function() {
        updateGridLayout(gridContainer);
    });
}

// Update grid layout based on screen size
function updateGridLayout(container) {
    const width = window.innerWidth;
    console.log('Updating grid layout for width:', width);
    
    // Remove existing grid classes
    container.classList.remove('small-grid', 'medium-grid', 'large-grid');
    
    if (width <= 640) {
        container.classList.add('small-grid');
        console.log('Applied small-grid layout');
    } else if (width <= 1024) {
        container.classList.add('medium-grid');
        console.log('Applied medium-grid layout');
    } else {
        container.classList.add('large-grid');
        console.log('Applied large-grid layout');
    }
}

// Create individual attraction card
function createAttractionCard(attraction) {
    const card = document.createElement('article');
    card.className = 'attraction-card';
    
    // Create image with error handling
    const imagePath = `images/${attraction.image}`;
    console.log(`Creating image with path: ${imagePath}`);
    
    card.innerHTML = `
        <figure class="card-image">
            <img src="${imagePath}" 
                 alt="${attraction.name}" 
                 loading="lazy"
                 width="300" 
                 height="200"
                 onerror="handleImageError(this, '${attraction.name}')">
        </figure>
        <div class="card-content">
            <h2>${attraction.name}</h2>
            <address class="card-address">${attraction.address}</address>
            <p class="card-description">${attraction.description}</p>
            <button class="learn-more-btn" onclick="learnMore('${attraction.name.replace(/'/g, "\\'")}')">
                Learn More
            </button>
        </div>
    `;
    
    return card;
}

// Handle image loading errors
function handleImageError(img, attractionName) {
    console.error(`Image failed to load for ${attractionName}:`, img.src);
    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgTm90IEF2YWlsYWJsZTwvdGV4dD4KPC9zdmc+';
    img.alt = 'Image not available for ' + attractionName;
}

// Simple Learn More button handler
function learnMore(attractionName) {
    console.log('Learn More clicked for:', attractionName);
    alert(`More information about ${attractionName} would be displayed here!\n\nThis could include:\n• Detailed history\n• Visiting hours\n• Admission fees\n• Contact information\n• Nearby amenities`);
}

// Display error message
function displayError(message) {
    console.error('Displaying error:', message);
    const container = document.getElementById('attractions-container');
    
    if (!container) {
        console.error('Cannot display error - container not found');
        return;
    }
    
    container.innerHTML = `
        <div class="error-message">
            <h2>Unable to Load Attractions</h2>
            <p>${message}</p>
            <small>Please check the browser console for details and try refreshing the page.</small>
            <br><br>
            <button onclick="location.reload()" style="
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
            ">Refresh Page</button>
        </div>
    `;
}

// Footer information
function updateFooterInfo() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    
    const yearElement = document.getElementById('currentYear');
    const modifiedElement = document.getElementById('lastModified');
    
    if (yearElement) {
        yearElement.textContent = currentYear;
        console.log('Footer year updated:', currentYear);
    }
    
    if (modifiedElement) {
        modifiedElement.textContent = `Last Modified: ${lastModified}`;
        console.log('Last modified updated:', lastModified);
    }
}

// Debug function to test JSON file accessibility
async function testJSONAccess() {
    try {
        const response = await fetch(ATTRACTIONS_JSON);
        console.log('JSON Test - Status:', response.status);
        console.log('JSON Test - URL:', response.url);
        const text = await response.text();
        console.log('JSON Test - First 200 chars:', text.substring(0, 200));
    } catch (error) {
        console.error('JSON Test - Error:', error);
    }
}

// Run test on load
setTimeout(testJSONAccess, 1000);