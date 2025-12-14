// Function to load products dynamically
function loadProducts(productType) {
    const container = document.getElementById('productsContainer');
    if (!container) return;

    let products = [];
    let productName = '';

    // Determine which products to load based on current page
    if (typeof bloxFruitsProducts !== 'undefined') {
        products = bloxFruitsProducts;
        productName = 'Blox Fruits';
    } else if (typeof stealBrainrotProducts !== 'undefined') {
        products = stealBrainrotProducts;
        productName = 'Steal a Brainrot';
    } else if (typeof murderMystery2Products !== 'undefined') {
        products = murderMystery2Products;
        productName = 'Murder Mystery 2';
    } else if (typeof robuxProducts !== 'undefined') {
        products = robuxProducts;
        productName = 'Robux';
    }

    if (products.length === 0) return;

    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = `package-card ${product.featured ? 'featured' : ''}`;
        
        let badgeHTML = '';
        if (product.featured) {
            badgeHTML = '<div class="package-badge">الأكثر شعبية</div>';
        }

        // إضافة صورة المنتج إذا كانت موجودة
        let imageHTML = '';
        if (product.image && product.image.trim() !== '') {
            imageHTML = `
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image-img">
                </div>
            `;
        } else {
            // إذا لم تكن هناك صورة، استخدم gradient حسب نوع المنتج
            let gradientClass = 'blox-fruits-bg';
            if (productName === 'Steal a Brainrot') {
                gradientClass = 'brainrot-bg';
            } else if (productName === 'Murder Mystery 2') {
                gradientClass = 'murder-mystery-bg';
            } else if (productName === 'Robux') {
                gradientClass = 'robux-bg';
            }
            imageHTML = `<div class="product-image ${gradientClass}"></div>`;
        }

        const featuresHTML = product.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');

        card.innerHTML = `
            ${imageHTML}
            ${badgeHTML}
            <div class="package-header">
                <h3>${product.name}</h3>
                <div class="package-price">${product.price.toLocaleString('ar-IQ')} دينار</div>
            </div>
            <ul class="package-features">
                ${featuresHTML}
            </ul>
            <button class="btn-purchase" 
                    data-product="${productName}" 
                    data-package="${product.name}" 
                    data-price="${product.price}"
                    data-id="${product.id}">
                اشتري الآن
            </button>
        `;

        container.appendChild(card);
        
        // إضافة event listener للصور المكسورة
        const productImg = card.querySelector('.product-image-img');
        if (productImg) {
            productImg.addEventListener('error', function() {
                const imgContainer = this.parentElement;
                if (imgContainer) {
                    // استبدال الصورة المكسورة بـ gradient
                    let gradientClass = 'blox-fruits-bg';
                    if (productName === 'Steal a Brainrot') {
                        gradientClass = 'brainrot-bg';
                    } else if (productName === 'Murder Mystery 2') {
                        gradientClass = 'murder-mystery-bg';
                    } else if (productName === 'Robux') {
                        gradientClass = 'robux-bg';
                    }
                    imgContainer.className = `product-image ${gradientClass}`;
                    imgContainer.innerHTML = '';
                }
            });
        }
    });
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

