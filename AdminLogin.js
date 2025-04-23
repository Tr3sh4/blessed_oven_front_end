// Reveal Pass
document.getElementById('forgot-password-link').addEventListener('click', function (e) {
    e.preventDefault();

    // Show Forgot Pass Overlay
    document.getElementById('overlay').style.display = 'flex';

    // Reset fields
    const codeInput = document.getElementById('code-input');
    const loginPassword = document.getElementById('login-password');
    const verifyBtn = document.getElementById('verify-code-btn');

    codeInput.value = '';
    codeInput.readOnly = false;
    codeInput.type = 'password'; // Hide entered code
    loginPassword.type = 'password'; // Hide login password
    verifyBtn.style.display = 'inline';

    // Reset label text
    document.getElementById('code-label').textContent = 'Enter Code Number';
});

// Close overlay button
document.getElementById('close-overlay-btn').addEventListener('click', function () {
    document.getElementById('overlay').style.display = 'none';
});

// Code verification and user credentials check
document.getElementById('verify-code-btn').addEventListener('click', function () {
    const correctCode = '1234';
    const codeInput = document.getElementById('code-input');
    const inputCode = codeInput.value.trim();

    if (codeInput.readOnly) return;

    if (inputCode === correctCode) {
        document.getElementById('code-label').textContent = 'Password';
        codeInput.type = 'text';
        codeInput.value = 'admin123';
        codeInput.readOnly = true;
        document.getElementById('verify-code-btn').style.display = 'none';

        // Reveal login-password input
        document.getElementById('login-password').type = 'text';

        // Hide the password after 3 seconds
        setTimeout(() => {
            codeInput.type = 'password';
        }, 3000);
    } else {
        alert('Incorrect code. Please try again.');
    }
});

// Login Attempts & Lockout
let loginAttempts = 0;
let lockCount = 0;
const maxAttempts = 3;
const maxLockouts = 3;
const lockDurations = [0.5, 1,];

const loginBtn = document.querySelector('button[type="submit"]');
const codeInput = document.getElementById('code-input');
const loginPassword = document.getElementById('login-password');
const codeLabel = document.getElementById('code-label');
const verifyBtn = document.getElementById('verify-code-btn');

function disableLogin(durationMinutes) {
    loginBtn.disabled = true;
    loginBtn.style.backgroundColor = 'gray';
    alert(`Too many failed attempts. Try again in ${durationMinutes} minute(s).`);

    setTimeout(() => {
        loginBtn.disabled = false;
        loginBtn.style.backgroundColor = '';
        loginAttempts = 0; 
    }, durationMinutes * 60 * 1000); 
}

// Login functionality
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = loginPassword.value;

    if (loginBtn.disabled) {
        alert('Login is temporarily disabled. Please wait.');
        return;
    }

    if (username === 'admin' && password === 'admin123') {
        alert('Login successful!');
        lockCount = 0;
        loginAttempts = 0;
        window.location.href = 'AdminDashboard.html';
    } else {
        loginAttempts++;

        // Reset displayed password and code
        codeInput.value = '';
        codeInput.readOnly = false;
        codeInput.type = 'password';
        loginPassword.type = 'password';
        loginPassword.value = '';
        codeLabel.textContent = 'Enter Code Number';
        verifyBtn.style.display = 'inline';

        if (loginAttempts >= maxAttempts) {
            lockCount++;
            loginAttempts = 0; // Reset current cycle attempts

            if (lockCount >= maxLockouts) {
                loginBtn.disabled = true;
                loginBtn.style.backgroundColor = 'gray';
                alert('Your account is permanently locked. Please contact admin.');
                return;
            }

            const lockTime = lockDurations[lockCount - 1] || 10;
            disableLogin(lockTime);
        } else {
            alert(`Incorrect username or password. Attempts left: ${maxAttempts - loginAttempts}`);
        }
    }
});
