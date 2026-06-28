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
// Append directly inside the DOMContentLoaded block in main.js
const ratingButtons = document.querySelectorAll(".filter-rating-btn");
if (ratingButtons.length > 0) {
    ratingButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            // Remove active status class from all buttons in group matrix
            ratingButtons.forEach(b => {
                b.classList.remove("active", "btn-dark");
                b.classList.add("btn-outline-dark");
            });

            // Assign active visual aesthetic styles to clicked button
            this.classList.add("active", "btn-dark");
            this.classList.remove("btn-outline-dark");

            const targetedRating = this.getAttribute("data-target-rating");
            const reviewCards = document.querySelectorAll(".testimonial-card-wrapper");

            reviewCards.forEach(card => {
                const cardRatingValue = card.getAttribute("data-rating");
                
                if (targetedRating === "all" || cardRatingValue === targetedRating) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    // 1. Landing Page Filter Logic Hook
    const homeFilterBtn = document.getElementById("filterSearchBtn");
    if (homeFilterBtn) {
        homeFilterBtn.addEventListener("click", function () {
            const selectedBrand = document.getElementById("brandFilter").value;
            const selectedType = document.getElementById("typeFilter").value;
            // Redirect smoothly to full inventory view appending programmatic parameters
            window.location.href = `inventory.html?brand=${selectedBrand}&type=${selectedType}`;
        });
    }

    // 2. Main Showroom Page Advanced Filter Logic Module
    const inventoryFilterBtn = document.getElementById("applyInventoryFilters");
    const inventoryResetBtn = document.getElementById("resetInventoryFilters");

    if (inventoryFilterBtn) {
        // Evaluate initialization URLs (Incoming values dispatched from homepage queries)
        parseIncomingUrlParameters();

        inventoryFilterBtn.addEventListener("click", executeShowroomFiltering);
        inventoryResetBtn.addEventListener("click", resetShowroomFilters);
    }

    function executeShowroomFiltering() {
        const brandValue = document.getElementById("inventoryBrandFilter").value;
        const typeValue = document.getElementById("inventoryTypeFilter").value;
        const items = document.querySelectorAll(".inventory-item");
        let activeMatchesCount = 0;

        items.forEach(item => {
            const matchesBrand = (brandValue === "all" || item.getAttribute("data-brand") === brandValue);
            const matchesType = (typeValue === "all" || item.getAttribute("data-type") === typeValue);

            if (matchesBrand && matchesType) {
                item.style.display = "block";
                item.style.opacity = "1";
                activeMatchesCount++;
            } else {
                item.style.display = "none";
            }
        });

        document.getElementById("showroomCounter").innerText = `Found ${activeMatchesCount} matching vehicles available`;
    }

    function resetShowroomFilters() {
        document.getElementById("inventoryBrandFilter").value = "all";
        document.getElementById("inventoryTypeFilter").value = "all";
        executeShowroomFiltering();
    }

    function parseIncomingUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const brandParam = urlParams.get('brand');
        const typeParam = urlParams.get('type');

        if (brandParam) document.getElementById("inventoryBrandFilter").value = brandParam;
        if (typeParam) document.getElementById("inventoryTypeFilter").value = typeParam;
        
        executeShowroomFiltering();
    }
});

// Interactive Currency Converter Logic Module
document.addEventListener('DOMContentLoaded', function() {
    const convertBtn = document.getElementById('convertBtn');
    const usdInput = document.getElementById('usdInput');
    const kesResult = document.getElementById('kesResult');

    if (convertBtn && usdInput && kesResult) {
        convertBtn.addEventListener('click', function() {
            const usdAmount = parseFloat(usdInput.value);
            
            // Validation check if input is empty or invalid
            if (isNaN(usdAmount) || usdAmount <= 0) {
                kesResult.innerHTML = "<span class='text-danger'>Please enter a valid amount.</span>";
                return;
            }

            // Calculation using June 2026 base evaluation conversion (1 USD = 130 KES)
            const exchangeRate = 130;
            const kesAmount = usdAmount * exchangeRate;

            // Render beautifully formatted localized currency output
            kesResult.innerHTML = `= KES ${kesAmount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        });
    }
});