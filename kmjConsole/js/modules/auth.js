import { sendDiscordMessage } from './discord.js';

// Login state
let currentWorker = null;
let loginTime = null;

// Function to log time (stub for future implementation)
async function logTime(workerId, action) {
    // TODO: Implement time logging functionality
    console.log(`[Time Log] ${workerId} - ${action} at ${new Date().toISOString()}`);
}

// Function to handle login
export async function handleLogin() {
    const workerIdInput = document.getElementById('worker-id');
    const loginButton = document.getElementById('login-button');
    const workerId = workerIdInput.value.trim();

    if (!workerId) {
        alert('Please enter a Worker ID');
        return;
    }

    // Login
    currentWorker = workerId;
    loginTime = new Date();
    loginButton.textContent = 'Login';
    loginButton.classList.remove('logged-in');
    workerIdInput.disabled = true;

    // Log login time
    await logTime(workerId, 'LOGIN');

    // Send Discord notification
    await sendDiscordMessage(`👤 Worker ${workerId} has logged in at ${loginTime.toLocaleString()}`);

    // Hide loading overlay and initialize app
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
            // Show logout button
            document.getElementById('logout-button').style.display = 'block';
            window.dispatchEvent(new CustomEvent('loginSuccess'));
        }
    }, 1000);
}

// Function to handle logout
export async function handleLogout() {
    const logoutTime = new Date();
    const duration = Math.round((logoutTime - loginTime) / 1000 / 60); // Duration in minutes

    // Log logout time
    await logTime(currentWorker, `LOGOUT (Duration: ${duration} minutes)`);

    // Reset UI
    currentWorker = null;
    loginTime = null;
    document.getElementById('logout-button').style.display = 'none';

    // Send Discord notification
    await sendDiscordMessage(`👋 Worker has logged out. Session duration: ${duration} minutes`);

    // Show loading overlay again
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
        document.querySelector('.loading-status').style.display = 'none';
        document.querySelector('.loading-spinner').style.display = 'none';
        document.querySelector('.login-form').style.display = 'block';
        // Reset login form
        const workerIdInput = document.getElementById('worker-id');
        workerIdInput.value = '';
        workerIdInput.disabled = false;
    }
}

// Function to check if user is logged in
export function isLoggedIn() {
    return currentWorker !== null;
} 