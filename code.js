/* Focus Out Validation */
// Function to clear error messages
function clearErrorMessages() {
    const spans = document.querySelectorAll("form span");
    spans.forEach((span) => {
        span.remove();
    });
}

// Function to display error messages
function displayError(fieldId, errorMessage) {
    const errorDisplay = document.createElement("span");
    errorDisplay.classList.add("error");
    errorDisplay.innerHTML = errorMessage;
    document.querySelector(fieldId).after(errorDisplay);
}

// Function to perform field validation
function validateField(fieldId, dataKey, regex, emptyErrorMessage, invalidErrorMessage) {
    const fieldValue = document.querySelector(fieldId).value;
    const validationErrors = {};

    if (!fieldValue) {
        validationErrors[dataKey] = emptyErrorMessage;
    } else {
        if (!regex.test(fieldValue)) {
            validationErrors[dataKey] = invalidErrorMessage;
        } else {
            console.info(dataKey + ": ", fieldValue);
        }
    }

    return validationErrors;
}

// Function to handle form field focusout events
function handleFocusOut(event, fieldId, dataKey, regex, emptyErrorMessage, invalidErrorMessage) {
    event.preventDefault();
    clearErrorMessages();

    const validationErrors = validateField(fieldId, dataKey, regex, emptyErrorMessage, invalidErrorMessage);

    if (Object.keys(validationErrors).length > 0) {
        displayError(fieldId, validationErrors[dataKey]);
    } else {
        console.log("Data sent to backend");
    }
}

// Event listeners for each field
document.querySelector("#first-name").addEventListener("focusout", (event) => {
    handleFocusOut(event, "#first-name", "firstName", /^[A-Za-z\s]+$/, "Please enter your first name", "Please enter a valid first name");
});

document.querySelector("#last-name").addEventListener("focusout", (event) => {
    handleFocusOut(event, "#last-name", "lastName", /^[A-Za-z\s]+$/, "Please enter your last name", "Please enter a valid last name");
});

document.querySelector("#address").addEventListener("focusout", (event) => {
    handleFocusOut(event, "#address", "address", /^[A-Za-z0-9\s]+$/, "Please enter your address", "Please enter a valid address");
});

document.querySelector("#postalcode").addEventListener("focusout", (event) => {
    handleFocusOut(event, "#postalcode", "postalCode", /^\d{4}$/, "Please enter your postal code", "Your postal code must have 4 digits (CH)");
});

document.querySelector("#city").addEventListener("focusout", (event) => {
    handleFocusOut(event, "#city", "city", /^[A-Za-z\s]+$/, "Please enter your city", "Please enter a valid city");
});

document.querySelector("#email").addEventListener("focusout", (event) => {
    handleFocusOut(event, "#email", "email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter your email", "Please enter a valid email address");
});

document.querySelector("#message").addEventListener("focusout", (event) => {
    handleFocusOut(event, "#message", "message", null, "Please enter a message", "Your message is too short (min. 10 characters)");
});



/* Submit Validation */
// add eventListener to the submit button
document.querySelector("#submit").addEventListener("click", validateForm);
// validateForm function
function validateForm(event) {
    event.preventDefault();

     // delete error messages to refill the fields
    const spans = document.querySelectorAll("form span");
    spans.forEach((span) => {
        span.remove();
    });

     // store input in data object
     let data = {};
     // store errors in object
     let validationErrors = {};

     // properties for data object
     data.firstName = document.querySelector("#first-name").value;
     data.lastName = document.querySelector("#last-name").value;
     data.address = document.querySelector('#address').value;
     data.postalCode = document.querySelector('#postalcode').value;
     data.city = document.querySelector('#city').value;
     data.email = document.querySelector("#email").value;
     data.message = document.querySelector("#message").value;

     // Form validation first name
     if (!data.firstName) {
        validationErrors.firstName = "Please enter your first name";
     } else {
        // variable for name Regex
        const nameRegex = /^[A-Za-z\s]+$/;
        // check if name is valid
        if (!nameRegex.test(data.firstName)) {
            validationErrors.firstName = "Please enter a valid first name";
        } else {
            console.info("First name: ", data.firstName);
        }
     };

     // Form validation last name
     if (!data.lastName) {
        validationErrors.lastName = "Please enter your last name";
     } else {
        // variable for name Regex
        const nameRegex = /^[A-Za-z\s]+$/;
        // check if name is valid
        if (!nameRegex.test(data.lastName)) {
            validationErrors.lastName = "Please enter a valid last name";
        } else {
            console.info("Last name: ", data.lastName);
        }
     };

     // Form validation address
     if (!data.address) {
        validationErrors.address = "Please enter your address";
     } else {
        // variable for name Regex
        const addressRegex = /^[A-Za-z0-9\s]+$/;
        // check if name is valid
        if (!addressRegex.test(data.address)) {
            validationErrors.address = "Please enter a valid address";
        } else {
            console.info("Address: ", data.address);
        }
     };

     // Form validation for postal code
    if (!data.postalCode) {
        validationErrors.postalCode = "Please enter your postal code"
    } else {
        // variable for postal code Regec
        const plzRegex = /^\d{4}$/;
        // check if message has 4 digits 
        if (!plzRegex.test(data.postalCode)) {
            validationErrors.postalCode = "Your postal code must have 4 digits (CH)";
        } else {
            console.info("Postal code: ", data.postalCode);
        }
    }

    // Form validation for city
    if (!data.city) {
        validationErrors.city = "Please enter your city";
     } else {
        // variable for city Regex
        const cityRegex = /^[A-Za-z\s]+$/;
        // check if city name is valid
        if (!cityRegex.test(data.city)) {
            validationErrors.city = "Please enter a valid city";
        } else {
            console.info("City: ", data.city);
        }
     };

     // Form validation email
     if (!data.email) {
        validationErrors.email = "Please enter your email";
     } else {
        // variable for email Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // check if email address is valid
        if (!emailRegex.test(data.email)) {
            validationErrors.email = "Please enter a valid email address";
        } else {
            console.info("Email: ", data.email);
        }
     }

     // Form validation for message
    if (!data.message) {
        validationErrors.message = "Please enter a message"
    } else {
        // check if message is longer than 10 characters 
        if (data.message.length < 11) {
            validationErrors.message = "Your message is too short (min. 10 characters)";
        } else {
            console.info("Message: ", data.message);
        }
    }


    // display error messages in the validationErrors object
    function displayError(validationErrors) {
        if (validationErrors.firstName) {
            // create span Element
            const errorDisplay = document.createElement("span");
            // add class to span
            errorDisplay.classList.add("error");
            // add error to span
            errorDisplay.innerHTML = validationErrors.firstName;
            // add error message
            document.querySelector("#first-name").after(errorDisplay);
        }

        if (validationErrors.lastName) {
            const errorDisplay = document.createElement("span");
            errorDisplay.classList.add("error");
            errorDisplay.innerHTML = validationErrors.lastName;
            document.querySelector("#last-name").after(errorDisplay);
        }

        if (validationErrors.address) {
            const errorDisplay = document.createElement("span");
            errorDisplay.classList.add("error");
            errorDisplay.innerHTML = validationErrors.address;
            document.querySelector("#address").after(errorDisplay);
        }

        if (validationErrors.postalCode) {
            const errorDisplay = document.createElement("span");
            errorDisplay.classList.add("error");
            errorDisplay.innerHTML = validationErrors.postalCode;
            document.querySelector("#postalcode").after(errorDisplay);
        }

        if (validationErrors.city) {
            const errorDisplay = document.createElement("span");
            errorDisplay.classList.add("error");
            errorDisplay.innerHTML = validationErrors.city;
            document.querySelector("#city").after(errorDisplay);
        }

        if (validationErrors.email) {
            const errorDisplay = document.createElement("span");
            errorDisplay.classList.add("error");
            errorDisplay.innerHTML = validationErrors.email;
            document.querySelector("#email").after(errorDisplay);
        }

        if (validationErrors.message) {
            const errorDisplay = document.createElement("span");
            errorDisplay.classList.add("error");
            errorDisplay.innerHTML = validationErrors.message;
            document.querySelector("#message").after(errorDisplay);
        }
    };

    // send data to backend when no errors or displey if there are
    if (Object.keys(validationErrors). length > 0) {
        displayError(validationErrors);
    } else {
        // console.log("Thank you for your message!");
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "block";
        console.log(successMessage);
    }
};