function toggleContent(element) {
    const content = element.nextElementSibling;
    const arrow = element.querySelector('.toggle-arrow');
    if (content.style.display === 'none' || content.style.display === '') {
        content.style.display = 'block';
        arrow.classList.remove('fa-chevron-down');
        arrow.classList.add('fa-chevron-up');
    } else {
        content.style.display = 'none';
        arrow.classList.remove('fa-chevron-up');
        arrow.classList.add('fa-chevron-down');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".star-icon");

    // Kiểm tra và lấy dữ liệu từ localStorage, nếu null thì đặt là {}
    let ownedItems = JSON.parse(localStorage.getItem("ownedItems")) || {};

    // Cập nhật giao diện theo dữ liệu đã lưu
    function updateStars() {
        stars.forEach(star => {
            let itemName = star.getAttribute("data-item");
            star.classList.toggle("owned", !!ownedItems[itemName]); // Toggle dựa vào dữ liệu
        });
    }

    // Gán sự kiện click để đánh dấu hoặc bỏ đánh dấu
    stars.forEach(star => {
        star.addEventListener("click", function () {
            let itemName = this.getAttribute("data-item");

            if (ownedItems[itemName]) {
                delete ownedItems[itemName]; // Bỏ sở hữu
            } else {
                ownedItems[itemName] = true; // Đánh dấu sở hữu
            }

            localStorage.setItem("ownedItems", JSON.stringify(ownedItems)); // Lưu lại
            updateStars(); // Cập nhật lại giao diện ngay lập tức
        });
    });

    updateStars(); // Gọi lần đầu khi tải trang

    // Đồng bộ dữ liệu khi mở tab khác hoặc thay đổi localStorage
    window.addEventListener("storage", function () {
        ownedItems = JSON.parse(localStorage.getItem("ownedItems")) || {};
        updateStars(); // Cập nhật giao diện ngay lập tức
    });
});
