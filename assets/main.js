// Lấy các phần tử DOM cần thiết
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Thêm sự kiện 'click' cho nút hamburger
hamburger.addEventListener('click', () => {
    // Thêm hoặc xóa class 'active' cho cả nút hamburger và menu
    // Class 'active' sẽ được dùng trong CSS để hiển thị menu và thay đổi icon
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Thêm hiệu ứng cho header khi cuộn trang (tùy chọn)
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // Khi cuộn xuống hơn 50px, thêm shadow cho header
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        // Khi ở trên cùng, bỏ shadow
        header.style.boxShadow = 'none';
    }
});
// =======================================================
// LOGIC FOR PRODUCT DETAIL PAGE
// =======================================================

// Chỉ chạy code này nếu chúng ta đang ở trên trang chi tiết sản phẩm
if (document.querySelector('.product-detail-section')) {

    // 1. Image Gallery Logic
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail-item');

    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Đặt ảnh chính thành ảnh của thumbnail được click
            mainImage.src = this.src;

            // Cập nhật trạng thái active
            thumbnails.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. Option Selection Logic (cho dung lượng, màu sắc,...)
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

    // Add image switching logic for color swatches
    const colorSwatches = document.querySelectorAll('.color-swatch');
    // const mainImage = document.getElementById('mainProductImage');  // Removed duplicate declaration

    // Map color swatch index to image src
    const colorImageMap = [
        'assets/images/15pro natural.png',
        'assets/images/15pro blue.png',
        'assets/images/15pro white.png',
        'assets/images/15pro black.png'
    ];

    colorSwatches.forEach((swatch, index) => {
        swatch.addEventListener('click', () => {
            mainImage.src = colorImageMap[index];
        });
    });

    // 3. Tab Switching Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Lấy target từ data-attribute
            const tabTarget = this.dataset.tab;

            // Xóa active class từ tất cả các nút và nội dung
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Thêm active class cho nút và nội dung được chọn
            this.classList.add('active');
            document.getElementById(tabTarget).classList.add('active');
        });
    });

    // 4. Price update logic for storage options
    const priceElement = document.querySelector('.price');
    const storageOptions = document.querySelectorAll('.storage-options .option-btn');

    // Define price map for each storage option
    const priceMap = {
        '128GB': '28.990.000₫',
        '256GB': '31.990.000₫',
        '512GB': '35.990.000₫',
        '1TB': '39.990.000₫'
    };

    storageOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedStorage = this.textContent.trim();
            if (priceMap[selectedStorage]) {
                priceElement.textContent = priceMap[selectedStorage];
            }
        });
    });

    // Add event listener for Buy Now button
    const buyNowBtn = document.querySelector('.btn-buy-now');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            alert('Mua ngay clicked!');
            // Alternatively, redirect to checkout page:
            // window.location.href = 'checkout.html';
        });
    }
}
