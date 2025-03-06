import { phones } from '../config/config.js';
import { isOnline } from './phones.js';

// Function to update console UI
export function updateConsole() {
    const consoleDiv = document.querySelector('.network-diagram');
    if (!consoleDiv) {
        console.error("Console div not found");
        return;
    }

    // Create main container
    const container = document.createElement('div');
    container.style.padding = '20px';
    container.style.color = '#ff5555';
    container.style.fontFamily = '"Courier New", monospace';

    // Add computer entry
    const computerEntry = document.createElement('div');
    computerEntry.style.marginBottom = '20px';
    computerEntry.style.padding = '10px';
    computerEntry.style.border = '1px solid #ff5555';
    computerEntry.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">KMJ-MAC-MINI</div>
        <div style="font-size: 0.9em;">Status: <span style="color: #00ff00;">ONLINE</span></div>
    `;
    container.appendChild(computerEntry);

    // Create grid container for phones
    const gridContainer = document.createElement('div');
    gridContainer.style.display = 'grid';
    gridContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    gridContainer.style.gap = '10px';
    gridContainer.style.marginBottom = '20px';

    // Add phone entries to grid
    phones.forEach((phone, index) => {
        const phoneEntry = document.createElement('div');
        phoneEntry.style.padding = '10px';
        phoneEntry.style.border = '1px solid #ff5555';
        const status = isOnline(phone.ip) ? '<span style="color: #00ff00;">ONLINE</span>' : '<span style="color: #ff5555;">OFFLINE</span>';
        phoneEntry.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">Phone ${index + 1}</div>
            <div style="font-size: 0.9em;">IP: ${phone.ip}</div>
            <div style="font-size: 0.9em;">Status: ${status}</div>
        `;
        gridContainer.appendChild(phoneEntry);
    });

    container.appendChild(gridContainer);

    // Add VNC password section
    const passwordSection = document.createElement('div');
    passwordSection.style.marginTop = '20px';
    passwordSection.style.padding = '15px';
    passwordSection.style.border = '1px solid #ff5555';
    passwordSection.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 10px;">VNC Password: kmj-heloniga-1</div>
        <div style="color: #ff0000; font-weight: bold; margin-bottom: 10px;">ALL KEYSTROKES ARE MONITORED BY KMJ PARTNERS. WE SEE EVERYTHING.</div>
        <div style="font-size: 0.9em;">System Uptime: <span id="uptime">00:00:00</span></div>
    `;
    container.appendChild(passwordSection);

    // Clear and update console
    consoleDiv.innerHTML = '';
    consoleDiv.appendChild(container);

    // Start uptime counter
    let startTime = Date.now();
    function updateUptime() {
        const elapsed = Date.now() - startTime;
        const hours = Math.floor(elapsed / (1000 * 60 * 60));
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
        const uptimeElement = document.getElementById('uptime');
        if (uptimeElement) {
            uptimeElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        }
    }

    // Update uptime every second
    setInterval(updateUptime, 1000);
    updateUptime(); // Initial update
}

// Function to toggle console sidebar
export function toggleConsole() {
    const sidebar = document.getElementById("console-sidebar");
    if (!sidebar) {
        console.error("Console sidebar not found");
        return;
    }

    sidebar.classList.toggle("show");
    if (sidebar.classList.contains("show")) {
        updateConsole();
    }
} 