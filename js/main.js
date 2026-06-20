document.addEventListener("DOMContentLoaded", function () {
    const filterBtn = document.getElementById("filterSearchBtn");
    
    if (filterBtn) {
        filterBtn.addEventListener("click", function () {
            const selectedBrand = document.getElementById("brandFilter").value;
            const selectedType = document.getElementById("typeFilter").value;
            const carCards = document.querySelectorAll(".car-item");

            carCards.forEach(card => {
                const cardBrand = card.getAttribute("data-brand");
                const cardType = card.getAttribute("data-type");

                const brandMatch = (selectedBrand === "all" || cardBrand === selectedBrand);
                const typeMatch = (selectedType === "all" || cardType === selectedType);

                if (brandMatch && typeMatch) {
                    card.style.display = "block";
                    // Soft reveal fade animation
                    card.style.opacity = "1";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
});