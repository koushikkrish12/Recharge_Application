
/*payment*/

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get("amount") || localStorage.getItem("planPrice");
    const data = urlParams.get("data") || localStorage.getItem("planData");
    const mobile = urlParams.get("mobile") || localStorage.getItem("rechargeNumber");

    // Store values for future reference
    if (amount) localStorage.setItem("planPrice", amount);
    if (data) localStorage.setItem("planData", data);
    if (mobile) localStorage.setItem("rechargeNumber", mobile);

    // Update UI
    document.getElementById("planAmount").textContent = amount || "N/A";
    document.getElementById("planDetails").textContent = data || "N/A";
    document.getElementById("mobileNumber").textContent = mobile || "Not Provided";
});




function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    document.getElementById("planAmount").textContent = params.get("amount") || "N/A";
    document.getElementById("planDetails").textContent = params.get("data") || "N/A";
    document.getElementById("mobileNumber").textContent = params.get("mobile") || "Not Provided";
}

window.onload = getQueryParams;

// Function to validate card details
function validateCardDetails() {
    const cardNumber = document.querySelector("#cardPaymentModal input[placeholder='16-digit card number']").value;
    const expiryDate = document.querySelector("#cardPaymentModal input[placeholder='MM/YY']").value;
    const cvv = document.querySelector("#cardPaymentModal input[placeholder='3-digit CVV']").value;

    // Validate card number (16 digits)
    if (!/^\d{16}$/.test(cardNumber)) {
        alert("Please enter a valid 16-digit card number.");
        return false;
    }

    // Validate expiry date (MM/YY format)
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert("Please enter a valid expiry date in MM/YY format.");
        return false;
    }

    // Validate CVV (3 digits)
    if (!/^\d{3}$/.test(cvv)) {
        alert("Please enter a valid 3-digit CVV.");
        return false;
    }

    return true;
}

// Function to validate UPI ID
function validateUPI() {
    const upiId = document.querySelector("#upiPaymentModal input[placeholder='example@upi']").value;

    // Validate UPI ID (basic format check)
    if (!/^[\w.-]+@[\w.-]+$/.test(upiId)) {
        alert("Please enter a valid UPI ID (e.g., example@upi).");
        return false;
    }

    return true;
}

// Attach event listeners to the payment confirmation buttons
document.addEventListener("DOMContentLoaded", function () {
    // Card payment validation
    document.querySelector("#cardPaymentModal .btn-danger").addEventListener("click", function (e) {
        if (!validateCardDetails()) {
            e.preventDefault(); // Prevent form submission if validation fails
        }
    });

    // UPI payment validation (for both Google Pay and Paytm)
    document.querySelectorAll("#upiPaymentModal .btn-danger").forEach(button => {
        button.addEventListener("click", function (e) {
            if (!validateUPI()) {
                e.preventDefault(); // Prevent form submission if validation fails
            }
        });
    });
});
/*prepaid plans*/
document.addEventListener("DOMContentLoaded", function () {
    var phoneModal = new bootstrap.Modal(document.getElementById('phoneModal'));

    // Show the modal when the page loads
    phoneModal.show();

    // Handle "Explore Plans" button click
    document.getElementById('explorePlansButton').addEventListener('click', function () {
        const mobileNumber = document.getElementById('mobileNumberInput').value;
        const otp = document.getElementById('otpInput').value;

        if (mobileNumber.length === 10 && !isNaN(mobileNumber) && otp.length === 6 && !isNaN(otp)) {
            // Pass the mobile number and OTP to the Prepaid Plans page
            window.location.href = `Prepaid_plans.html?mobile=${mobileNumber}&otp=${otp}`;
        } else {
            alert('Please enter a valid 10-digit mobile number and 6-digit OTP.');
        }
    });
});

let selectedAmount = '';
let selectedData = '';
let selectedValidity = '';

function showMobileNumberModal(amount, data, validity) {
    selectedAmount = amount;
    selectedData = data;
    selectedValidity = validity;

    // Check if mobile number is already passed from the home page
    const params = new URLSearchParams(window.location.search);
    const mobileNumber = params.get('mobile');

    if (mobileNumber) {
        // If mobile number is already available, proceed directly to payment
        window.location.href = `Payment.html?amount=${selectedAmount}&data=${selectedData}&validity=${selectedValidity}&mobile=${mobileNumber}`;
    } else {
        // If mobile number is not available, show the mobile number modal
        const mobileNumberModal = new bootstrap.Modal(document.getElementById('mobileNumberModal'));
        mobileNumberModal.show();
    }
}

// Handle "Proceed to Payment" button click in the mobile number modal
document.getElementById('proceedToPayment').addEventListener('click', function () {
    const mobileNumber = document.getElementById('mobileNumber').value;
    if (mobileNumber.length === 10 && !isNaN(mobileNumber)) {
        window.location.href = `Payment.html?amount=${selectedAmount}&data=${selectedData}&validity=${selectedValidity}&mobile=${mobileNumber}`;
    } else {
        alert('Please enter a valid 10-digit mobile number.');
    }
});

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    document.getElementById("planAmount").textContent = `${params.get("amount")}`;
    document.getElementById("planDetails").textContent = `${params.get("data")}, ${params.get("validity")}`;
    document.getElementById("mobileNumber").textContent = params.get("mobile");
}

window.onload = getQueryParams;