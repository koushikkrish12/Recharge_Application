/*home*/
document.addEventListener("DOMContentLoaded", function () {
    const phoneModal = new bootstrap.Modal(document.getElementById('phoneModal'));

    // Show the modal when the page loads
    phoneModal.show();

    // Handle "Explore Plans" button click
    document.getElementById('explorePlansButton').addEventListener('click', function () {
        const mobileNumber = document.getElementById('mobileNumberInput').value;
        const otp = document.getElementById('otpInput').value;

        if (mobileNumber.length === 10 && !isNaN(mobileNumber)) {
            // Pass the mobile number and OTP to the Prepaid Plans page
            window.location.href = `Prepaid_plans.html?mobile=${mobileNumber}&otp=${otp}`;
        } else {
            alert('Please enter a valid 10-digit mobile number.');
        }
    });

    // Handle modal close event to clean up the backdrop and reset body styles
    document.getElementById('phoneModal').addEventListener('hidden.bs.modal', function () {
        // Remove the modal backdrop if it exists
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }

        // Remove the 'modal-open' class from the body to enable scrolling
        document.body.classList.remove('modal-open');

        // Reset the body padding (if any) that Bootstrap might have added
        document.body.style.paddingRight = '';

        // Ensure the body overflow is reset to allow scrolling
        document.body.style.overflow = 'visible';
    });
});