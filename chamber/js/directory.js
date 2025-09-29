// js/directory.js

document.addEventListener('DOMContentLoaded', () => {
  initDirectory();
});

async function initDirectory() {
  try {
    const response = await fetch('../data/members.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const businesses = await response.json();
    populateBusinesses(businesses);
  } catch (error) {
    console.error('Error loading member data:', error);
    const businessList = document.getElementById('business-list');
    businessList.innerHTML = `<p>Failed to load business directory.</p>`;
  }

  // Also attach toggle buttons if applicable
  const gridBtn = document.getElementById('gridView');
  const listBtn = document.getElementById('listView');
  const businessList = document.getElementById('business-list');

  if (gridBtn && listBtn && businessList) {
    gridBtn.addEventListener('click', () => {
      businessList.classList.add('grid');
      businessList.classList.remove('list');
    });
    listBtn.addEventListener('click', () => {
      businessList.classList.add('list');
      businessList.classList.remove('grid');
    });
  }
}

function populateBusinesses(businesses) {
  const businessList = document.getElementById('business-list');
  businessList.innerHTML = businesses.map(biz => createCard(biz)).join('');
}

function createCard(biz) {
  // If list view, maybe omit image or shrink it
  return `
    <div class="business-card">
      <img src="../images/${biz.image}" alt="${biz.name} logo">
      <div class="info">
        <h3>${biz.name}</h3>
        <p><em>${biz.tagline || ''}</em></p>
        <p><strong>Address:</strong> ${biz.address}</p>
        <p><strong>Phone:</strong> ${biz.phone}</p>
        <p><strong>Website:</strong> <a href="${biz.website}" target="_blank">${biz.website}</a></p>
        <p><strong>Level:</strong> ${membershipLevelName(biz.membershipLevel)}</p>
      </div>
    </div>
  `;
}

function membershipLevelName(level) {
  switch (level) {
    case 3: return 'Gold';
    case 2: return 'Silver';
    case 1: return 'Member';
    default: return 'Member';
  }
}
