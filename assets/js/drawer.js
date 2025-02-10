// drawer.js
function showDrawer(properties) {
    const drawer = document.querySelector('.drawer');
    const content = document.querySelector('.drawer-content');
    const legend = document.querySelector('.map-legend');
    
    // Collapse legend when drawer opens
    if (legend && !legend.classList.contains('collapsed')) {
        legend.classList.add('collapsed');
    }
    
    content.innerHTML = `
        ${window.innerWidth <= 768 ? '<div class="drawer-pull"></div>' : ''}
        <div class="drawer-header">
            <h2 class="drawer-title">Plot Details</h2>
            <button class="drawer-close" onclick="hideDrawer()">
                <i class="material-icons">close</i>
            </button>
        </div>
        <div class="property-grid">
            ${createPropertyItems(properties)}
        </div>
    `;
    
    drawer.classList.add('open');
    setupDrawerInteractions(drawer);
}

function hideDrawer() {
    const drawer = document.querySelector('.drawer');
    drawer.classList.remove('open');
}

function createPropertyItems(properties) {
    const items = [
        { 
            label: 'Price', 
            value: properties.price ? `$${properties.price}` : 'N/A',  // Dynamically set price
            icon: 'attach_money',
            specialClass: 'price-value'
        },
        { 
            label: 'Status', 
            value: properties.status ? properties.status : 'Unknown',  // Dynamically set status
            icon: 'sell',
            isChip: true,
            chipColor: properties.status === 'For Sale' ? '#4CAF50' : '#FF0000'
        },
        
        { 
            label: 'Area', 
            value: properties.area_m, 
            icon: 'square_foot'
        },
        { 
            label: 'Category', 
            value: properties.Category, 
            icon: 'category',
            isChip: true,
            chipColor: getCategoryColor(properties.Category)
        },
        { 
            label: 'Parking', 
            value: properties.Parking || 'N/A', 
            icon: 'local_parking'
        },
        { 
            label: 'Units', 
            value: properties.Units || 'N/A', 
            icon: 'apartment'
        },
        { 
            label: 'Sub Category', 
            value: properties.Sub_Cat || 'N/A', 
            icon: 'layers'
        },
        { 
            label: 'Name', 
            value: properties.Name || 'N/A', 
            icon: 'label'
        }
    ];

    const propertyItemsHtml = items.map(item => createPropertyItem(item)).join('');
    
    // Add Buy button
    const buyButtonHtml = `
        <div class="property-item buy-button-container">
            <a href="https://costadenica.com" target="_blank" class="buy-button">
                <i class="material-icons">shopping_cart</i>
                Buy Now
            </a>
        </div>
    `;

    return propertyItemsHtml + buyButtonHtml;
}

function createPropertyItem({ label, value, icon, isChip, chipColor, specialClass }) {
    const valueClass = specialClass ? ` ${specialClass}` : '';
    const formattedValue = isChip 
        ? `<div class="property-chip" style="background-color: ${chipColor || 'var(--primary-purple)'}">${value}</div>`
        : `<div class="property-value${valueClass}">${value}</div>`;

    return `
        <div class="property-item">
            <div class="property-label">
                <i class="material-icons">${icon}</i>
                ${label}
            </div>
            ${formattedValue}
        </div>
    `;
}

function formatArea(area) {
    if (!area) return 'N/A';
    return Number(area).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }) + ' m²';
}

function getCategoryColor(category) {
    return CATEGORY_COLORS[category] || '#4A90E2';
}

function setupDrawerInteractions(drawer) {
    if (window.innerWidth > 768) return; // Only for mobile

    let startY = 0;
    let currentY = 0;
    
    const handleTouchStart = (e) => {
        startY = e.touches[0].clientY;
        currentY = startY;
    };
    
    const handleTouchMove = (e) => {
        currentY = e.touches[0].clientY;
        const diff = currentY - startY;
        
        if (diff > 50) {
            hideDrawer();
            removeListeners();
        }
    };
    
    const removeListeners = () => {
        drawer.removeEventListener('touchstart', handleTouchStart);
        drawer.removeEventListener('touchmove', handleTouchMove);
    };
    
    drawer.addEventListener('touchstart', handleTouchStart);
    drawer.addEventListener('touchmove', handleTouchMove);
}