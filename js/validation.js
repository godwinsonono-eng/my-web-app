document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("dealershipContactForm");
    const successBanner = document.getElementById("formSuccessMessage");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            // Stop the default browser refresh loop to handle validation manually
            event.preventDefault();

            // Form Fields Collection
            const nameInput = document.getElementById("clientName");
            const emailInput = document.getElementById("clientEmail");
            const phoneInput = document.getElementById("clientPhone");
            const interestSelect = document.getElementById("vehicleInterest");
            const messageInput = document.getElementById("clientMessage");

            // Error Element Hooks
            const nameError = document.getElementById("nameError");
            const emailError = document.getElementById("emailError");
            const phoneError = document.getElementById("phoneError");
            const interestError = document.getElementById("interestError");
            const messageError = document.getElementById("messageError");

            // Tracks the validity state across evaluations
            let isFormValid = true;

            // 1. Full Name Assessment
            if (nameInput.value.trim() === "") {
                toggleInputError(nameInput, nameError, true);
                isFormValid = false;
            } else {
                toggleInputError(nameInput, nameError, false);
            }

            // 2. Email Pattern Regex Test
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailInput.value.trim())) {
                toggleInputError(emailInput, emailError, true);
                isFormValid = false;
            } else {
                toggleInputError(emailInput, emailError, false);
            }

            // 3. Phone Number Validation (Singapore Standard Format: 8 digits starting with 6/8/9)
            const phonePattern = /^[689]\d{7}$/;
            if (!phonePattern.test(phoneInput.value.trim())) {
                toggleInputError(phoneInput, phoneError, true);
                isFormValid = false;
            } else {
                toggleInputError(phoneInput, phoneError, false);
            }

            // 4. Model Selection Verification
            if (interestSelect.value === "") {
                toggleInputError(interestSelect, interestError, true);
                isFormValid = false;
            } else {
                toggleInputError(interestSelect, interestError, false);
            }

            // 5. Message Content Evaluation (Must exceed 15 contextual characters)
            if (messageInput.value.trim().length < 15) {
                toggleInputError(messageInput, messageError, true);
                isFormValid = false;
            } else {
                toggleInputError(messageInput, messageError, false);
            }

            // Resolution Process if all parameters succeed
            if (isFormValid) {
                // Display positive UX notification
                successBanner.classList.remove("d-none");
                
                // Reset inputs cleanly
                contactForm.reset();
                
                // Clear validation visual markers
                clearVisualBorders([nameInput, emailInput, phoneInput, interestSelect, messageInput]);

                // Automatically scroll screen back up smoothly to see success notification
                successBanner.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // Dynamic style toggle helper function
    function toggleInputError(inputElement, errorElement, hasError) {
        if (hasError) {
            inputElement.classList.add("is-invalid");
            inputElement.classList.remove("is-valid");
            errorElement.classList.remove("d-none");
        } else {
            inputElement.classList.remove("is-invalid");
            inputElement.classList.add("is-valid");
            errorElement.classList.add("d-none");
        }
    }

    // Complete cleanup utility
    function clearVisualBorders(elementsArray) {
        elementsArray.forEach(element => {
            element.classList.remove("is-valid");
        });
    }
});