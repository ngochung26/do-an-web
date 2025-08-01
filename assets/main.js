// Lấy các phần tử DOM cần thiết
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Thêm sự kiện 'click' cho nút hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Thêm hiệu ứng cho header khi cuộn trang (tùy chọn)
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// LOGIC FOR PRODUCT DETAIL PAGE
if (document.querySelector('.product-detail-section')) {
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail-item');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src;
            thumbnails.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    function handleOptionSelection(selector) {
        const options = document.querySelectorAll(selector);
        options.forEach(option => {
            option.addEventListener('click', function() {
                options.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    handleOptionSelection('.option-btn');
    handleOptionSelection('.color-swatch');

    const productColorData = {
        '16e.html': [
            { image: 'assets/images/16e den.webp', price: 15000000 },
            { image: 'assets/images/16e trang.webp', price: 18000000 }
        ],
        '16pro.html': [
            { image: 'assets/images/16 prm titan tự nhiên.jpg', price: 31990000 },
            { image: 'assets/images/16prm titan sa mac.jpg', price: 31990000 },
            { image: 'assets/images/16prm Trắng titan.jpg', price: 31990000 },
            { image: 'assets/images/16prm titan đen.jpg', price: 31990000 }
        ],
        '16plus.html': [
            { image: 'assets/images/16plus trang.webp', price: 26990000 },
            { image: 'assets/images/16 plus den.webp', price: 26990000 },
            { image: 'assets/images/16 plus xanh la.webp', price: 26990000 },
            { image: 'assets/images/16plus hing.webp', price: 26990000 },
            { image: 'assets/images/16plus xanh.webp', price: 26990000 }
        ],
        '16promax.html': [
            { image: 'assets/images/16 prm titan tự nhiên.jpg', price: 37990000 },
            { image: 'assets/images/16prm titan sa mac.jpg', price: 37990000 },
            { image: 'assets/images/16prm Trắng titan.jpg', price: 37990000 },
            { image: 'assets/images/16prm titan đen.jpg', price: 37990000 }
        ]
    };

    const currentPage = window.location.pathname.split('/').pop();

    let colorSwatches = Array.from(document.querySelectorAll('.color-swatch'));
    if (currentPage === '16e.html') {
        colorSwatches = colorSwatches.slice(0, 2);
    }

    const priceElement = document.querySelector('.price');
    const storageOptions = document.querySelectorAll('.storage-options .option-btn');

        const priceMapDefault = {
            '128GB': currentPage === '16e.html' ? 13500000 : 23990000,
            '256GB': currentPage === '16e.html' ? 15700000 : 26990000,
            '512GB': currentPage === '16e.html' ? 20200000 : 32990000,
            '1TB': 46990000
        };

        // Update 16e prices to match user input in VND approx
        if (currentPage === '16e.html') {
            priceMapDefault['128GB'] = 13500000; // $599 ~ 13.5 triệu VND
            priceMapDefault['256GB'] = 15700000; // $699
            priceMapDefault['512GB'] = 20200000; // $899
        }

    let selectedStorage = null;
    let selectedColorIndex = 0;

    // Initialize selectedStorage and selectedColorIndex based on active classes
    storageOptions.forEach(option => {
        if (option.classList.contains('active')) {
            selectedStorage = option.textContent.trim();
        }
    });

    colorSwatches.forEach((swatch, index) => {
        if (swatch.classList.contains('active')) {
            selectedColorIndex = index;
        }
    });

    function updatePrice() {
        if (!priceElement || !selectedStorage) return;

        let basePrice;

        if (currentPage === '16e.html') {
            // For 16e, price depends on storage only, same for both colors
            basePrice = priceMapDefault[selectedStorage] || 0;
        } else {
            basePrice = priceMapDefault[selectedStorage] || 0;
            // For other products, price can be adjusted by color if needed (not implemented here)
        }

        priceElement.textContent = basePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + '₫';
    }

    // Initial price update
    updatePrice();

    colorSwatches.forEach((swatch, index) => {
        swatch.addEventListener('click', () => {
            selectedColorIndex = index;
            mainImage.src = productColorData[currentPage][index].image;

            // Update active class for color swatches
            colorSwatches.forEach(item => item.classList.remove('active'));
            swatch.classList.add('active');

            updatePrice();
        });
    });

    storageOptions.forEach(option => {
        option.addEventListener('click', () => {
            selectedStorage = option.textContent.trim();

            // Update active class for storage options
            storageOptions.forEach(item => item.classList.remove('active'));
            option.classList.add('active');

            updatePrice();
        });
    });

    // Tab switching logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabTarget = this.dataset.tab;

            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            this.classList.add('active');
            document.getElementById(tabTarget).classList.add('active');
        });
    });

    // Buy Now button event
    const buyNowBtn = document.querySelector('.btn-buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            alert('Mua ngay clicked!');
        });
    }
}
