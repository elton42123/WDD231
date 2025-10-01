// Directory Page JavaScript
const MEMBERS_JSON = 'data/members.json';

// View state management (Directory page only)
let currentView = 'grid';
let membersData = [];

// DOM Elements
const membersContainer = document.getElementById('membersContainer');
const directoryContainer = document.getElementById('directory'); // Home page container
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');

// Initialize the appropriate page
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing chamber members...');
    
    // Check which page we're on and initialize accordingly
    if (membersContainer) {
        // Directory page
        console.log('Directory page detected');
        initializeViewControls();
        loadMembersForDirectory();
    } else if (directoryContainer) {
        // Home page
        console.log('Home page detected - loading spotlights');
        loadMembersForHome();
    }
    
    updateFooterInfo();
});

// ========== DIRECTORY PAGE FUNCTIONS ==========
function initializeViewControls() {
    if (!gridViewBtn || !listViewBtn) return;
    
    gridViewBtn.addEventListener('click', () => switchView('grid'));
    listViewBtn.addEventListener('click', () => switchView('list'));
    
    console.log('Directory view controls initialized');
}

function switchView(view) {
    if (currentView === view) return;
    
    currentView = view;
    console.log('Switching to', view, 'view');
    
    // Update active button
    gridViewBtn.classList.toggle('active', view === 'grid');
    listViewBtn.classList.toggle('active', view === 'list');
    
    // Update container class
    membersContainer.classList.remove('grid-view', 'list-view');
    membersContainer.classList.add(`${view}-view`);
    
    // Re-render members with new view
    renderMembers();
}

// Load members data for DIRECTORY page
async function loadMembersForDirectory() {
    try {
        console.log('Loading members for directory page...');
        
        const response = await fetch(MEMBERS_JSON);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        membersData = await response.json();
        console.log('Directory members loaded:', membersData.length, 'members');
        
        renderMembers();
        
    } catch (error) {
        console.error('Error loading directory members:', error);
        displayDirectoryError('Failed to load member data. Please try again later.');
    }
}

// Render members for DIRECTORY page
function renderMembers() {
    if (!membersData || membersData.length === 0) {
        displayNoMembers();
        return;
    }
    
    console.log('Rendering directory members in', currentView, 'view');
    
    membersContainer.innerHTML = '';
    
    membersData.forEach((member) => {
        const memberElement = createDirectoryMemberElement(member);
        membersContainer.appendChild(memberElement);
    });
}

// Create directory member element
function createDirectoryMemberElement(member) {
    const card = document.createElement('article');
    card.className = `member-card ${currentView}-view`;
    
    const membershipLevel = getMembershipLevel(member.membershipLevel);
    
    if (currentView === 'grid') {
        card.innerHTML = createDirectoryGridViewHTML(member, membershipLevel);
    } else {
        card.innerHTML = createDirectoryListViewHTML(member, membershipLevel);
    }
    
    return card;
}

// Directory Grid view HTML
function createDirectoryGridViewHTML(member, membershipLevel) {
    return `
        <div class="card-header">
            <img src="images/${member.image}" alt="${member.name} logo" class="member-logo" loading="lazy">
            <div class="card-title">
                <h3>${member.name}</h3>
                <span class="membership-level ${membershipLevel.class}">${membershipLevel.name} Member</span>
            </div>
        </div>
        <div class="card-body">
            <p class="member-tagline">"${member.tagline}"</p>
            <div class="member-info">
                <div class="info-item">
                    <strong>📍</strong>
                    <span>${member.address}</span>
                </div>
                <div class="info-item">
                    <strong>📞</strong>
                    <span>${member.phone}</span>
                </div>
            </div>
            <div class="contact-links">
                <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="contact-link">
                    🌐 Visit Website
                </a>
                <a href="tel:${member.phone.replace(/\D/g, '')}" class="contact-link">
                    📞 Call Now
                </a>
            </div>
        </div>
    `;
}

// Directory List view HTML
function createDirectoryListViewHTML(member, membershipLevel) {
    return `
        <div class="card-header">
            <img src="images/${member.image}" alt="${member.name} logo" class="member-logo" loading="lazy">
            <div class="card-title">
                <h3>${member.name}</h3>
                <span class="membership-level ${membershipLevel.class}">${membershipLevel.name}</span>
            </div>
        </div>
        <div class="card-body">
            <div class="member-info">
                <div class="info-item">
                    <strong>Phone:</strong>
                    <span>${member.phone}</span>
                </div>
                <div class="info-item">
                    <strong>Address:</strong>
                    <span>${member.address}</span>
                </div>
            </div>
            <div class="contact-links">
                <a href="${member.website}" target="_blank" rel="noopener noreferrer" class="contact-link">
                    Website
                </a>
                <a href="tel:${member.phone.replace(/\D/g, '')}" class="contact-link">
                    Call
                </a>
            </div>
        </div>
    `;
}

// ========== HOME PAGE FUNCTIONS ==========
// Load members for HOME page spotlights
async function loadMembersForHome() {
    try {
        console.log('Loading members for home page spotlights...');
        
        const response = await fetch(MEMBERS_JSON);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const membersData = await response.json();
        console.log('Home page members loaded:', membersData.length, 'members');
        
        displayHomeSpotlights(membersData);
        
    } catch (error) {
        console.error('Error loading home page members:', error);
        displayHomeError('Unable to load featured members.');
    }
}

// Display spotlights on HOME page
function displayHomeSpotlights(members) {
    if (!directoryContainer) return;
    
    console.log('Displaying home page spotlights');
    
    // Clear loading state
    directoryContainer.innerHTML = '';
    
    // Filter for Gold (3) and Silver (2) members only
    const goldSilverMembers = members.filter(member => 
        member.membershipLevel === 3 || member.membershipLevel === 2
    );
    
    if (goldSilverMembers.length === 0) {
        directoryContainer.innerHTML = `
            <div class="no-spotlights">
                <p>No featured members available at this time.</p>
            </div>
        `;
        return;
    }
    
    // Randomly select 4 members (for 2x2 grid)
        const shuffled = [...goldSilverMembers].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 4); // Always select exactly 4 members
    // Create spotlight cards
    selected.forEach(member => {
        const card = document.createElement('article');
        card.className = 'spotlight-card';
        
        const membershipLevel = getMembershipLevel(member.membershipLevel);
        
        card.innerHTML = `
            <div class="spotlight-header">
                <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
                <div class="spotlight-title">
                    <h3>${member.name}</h3>
                    <span class="membership-badge ${membershipLevel.class}">${membershipLevel.name} Member</span>
                </div>
            </div>
            <p class="tagline">"${member.tagline}"</p>
            <div class="spotlight-details">
                <p><strong>📍 Address:</strong> ${member.address}</p>
                <p><strong>📞 Phone:</strong> ${member.phone}</p>
                <a href="${member.website}" target="_blank" rel="noopener" class="website-link">
                    Visit Website
                </a>
            </div>
        `;
        
        directoryContainer.appendChild(card);
    });
}

// ========== SHARED HELPER FUNCTIONS ==========
function getMembershipLevel(level) {
    const levels = {
        1: { name: 'Bronze', class: 'bronze' },
        2: { name: 'Silver', class: 'silver' },
        3: { name: 'Gold', class: 'gold' }
    };
    return levels[level] || { name: 'Member', class: 'member' };
}

// Error displays for different pages
function displayDirectoryError(message) {
    if (membersContainer) {
        membersContainer.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
            </div>
        `;
    }
}

function displayHomeError(message) {
    if (directoryContainer) {
        directoryContainer.innerHTML = `
            <div class="error-message">
                <p>${message}</p>
            </div>
        `;
    }
}

function displayNoMembers() {
    if (membersContainer) {
        membersContainer.innerHTML = `
            <div class="no-members-message">
                <p>No chamber members found.</p>
            </div>
        `;
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