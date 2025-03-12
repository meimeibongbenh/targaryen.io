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

    // Lấy danh sách món đã sở hữu từ localStorage
    let ownedItems = JSON.parse(localStorage.getItem("ownedItems")) || {};

    // Cập nhật giao diện dựa trên dữ liệu đã lưu
    stars.forEach(star => {
        let itemName = star.getAttribute("data-item");
        if (ownedItems[itemName]) {
            star.classList.add("owned");
        }

        // Xử lý khi người dùng click vào sao
        star.addEventListener("click", function () {
            if (ownedItems[itemName]) {
                delete ownedItems[itemName]; // Bỏ sở hữu
                star.classList.remove("owned");
            } else {
                ownedItems[itemName] = true; // Đánh dấu sở hữu
                star.classList.add("owned");
            }

            // Lưu vào localStorage
            localStorage.setItem("ownedItems", JSON.stringify(ownedItems));
        });
    });
});
