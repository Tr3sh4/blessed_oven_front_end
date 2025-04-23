// Function to confirm logout and redirect to login page
function confirmLogout() {
    // Confirm logout action
    const logoutConfirmed = confirm("Are you sure you want to logout?");

    if (logoutConfirmed) {
        // Redirect to the login page
        window.location.href = "AdminLogin.html"; // Replace with the actual path to your Admin Login page
    }
}
