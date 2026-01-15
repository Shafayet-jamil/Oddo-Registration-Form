const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');

// IMPORTANT: Replace this URL with your Google Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxqFzbOH-XM3o5e7VeziI0iEA4SerTG60MzKlFzHeLMiElaU4KqMJU0ohLz6gy3efgt/exec';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Hide previous messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        department: document.getElementById('department').value,
        phone: document.getElementById('phone').value,
        notifications: document.getElementById('notifications').checked ? 'Yes' : 'No',
        suggestions: document.getElementById('suggestions').value,
        timestamp: new Date().toLocaleString()
    };

    try {
        // Send data to Google Sheets via Apps Script
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // Show success message
        successMessage.style.display = 'block';
        form.reset();

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register Now';
    }
});
