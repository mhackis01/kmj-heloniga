import { handleLogin, handleLogout } from './modules/auth.js';
import { checkVPNStatus } from './modules/vpn.js';
import { generatePhoneBoxes, selectPhone, toggleView, refreshPhone, switchToPhone, getActivePhone } from './modules/phones.js';
import { updateTasklist, toggleSubtasks } from './modules/tasks.js';
import { toggleConsole } from './modules/console.js';

// Make functions available globally
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.toggleConsole = toggleConsole;
window.toggleTasklist = () => {
    const sidebar = document.getElementById("tasklist-sidebar");
    if (!sidebar) {
        console.error("Tasklist sidebar not found");
        return;
    }

    sidebar.classList.toggle("show");
    if (sidebar.classList.contains("show")) {
        updateTasklist();
    }
};
window.toggleView = toggleView;
window.toggleSubtasks = toggleSubtasks;

// Function to initialize the application
function initializeApp() {
    // Initialize all the existing functionality
    generatePhoneBoxes();
    updateTasklist();

    // Add event listeners for phone buttons
    const phoneButtons = document.querySelectorAll('.phone-button');
    phoneButtons.forEach((button, index) => {
        button.addEventListener('click', () => switchToPhone(index));
    });

    // Add event listener for refresh button
    const refreshButton = document.querySelector('.control-button:nth-child(1)');
    if (refreshButton) refreshButton.addEventListener('click', refreshPhone);

    // Add auto-save for notes
    const notes = document.getElementById('worker-notes');
    if (notes) {
        notes.addEventListener('input', saveNotes);
        loadNotes(); // Load saved notes when page loads
    }

    // Add keyboard event listener for VNC
    document.addEventListener("keydown", (event) => {
        const activePhone = getActivePhone();
        if (activePhone) {
            const vncWindow = activePhone.contentWindow;
            if (vncWindow) {
                vncWindow.postMessage({ type: "keypress", key: event.key }, "*");
                console.log(`Sent key: ${event.key} to active VNC`);
            }
        }
    });
}

// Add auto-save functionality for notes
function saveNotes() {
    const notes = document.getElementById('worker-notes');
    if (notes) {
        localStorage.setItem('worker-notes', notes.value);
    }
}

function loadNotes() {
    const notes = document.getElementById('worker-notes');
    if (notes) {
        notes.value = localStorage.getItem('worker-notes') || '';
    }
}

// Start VPN check when the page loads
document.addEventListener('DOMContentLoaded', () => {
    checkVPNStatus();
});

// Listen for login success event
window.addEventListener('loginSuccess', () => {
    initializeApp();
}); 