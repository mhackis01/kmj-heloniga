import { VPN_CONFIG } from '../config/config.js';

// VPN Connection Status
let vpnConnected = false;

// Function to check if Tailscale is running
export async function checkTailscaleStatus() {
    try {
        // Try to ping the Mac Mini's IP address
        const response = await fetch(VPN_CONFIG.checkUrl, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        // If we get a connection error, the device is not reachable
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            return false;
        }
        // For other errors, assume the device might be unreachable
        return true;
    }
}

// Function to check VPN status
export async function checkVPNStatus() {
    const loadingStatus = document.querySelector('.loading-status');
    const loginForm = document.querySelector('.login-form');
    if (!loadingStatus) return;

    try {
        // Update status message
        loadingStatus.textContent = 'Checking VPN Status...';

        // Check if Tailscale is running
        const isTailscaleRunning = await checkTailscaleStatus();

        if (isTailscaleRunning) {
            loadingStatus.textContent = 'VPN Connected';
            vpnConnected = true;

            // Show login form and hide spinner
            loadingStatus.style.display = 'none';
            document.querySelector('.loading-spinner').style.display = 'none';
            loginForm.style.display = 'block';

            // Add enter key listener for login
            document.getElementById('worker-id').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    window.handleLogin();
                }
            });
        } else {
            loadingStatus.textContent = 'VPN Not Running. Please start VPN first.';
            // Retry check after interval
            setTimeout(checkVPNStatus, VPN_CONFIG.checkInterval);
        }
    } catch (error) {
        console.error('Tailscale Check Error:', error);
        loadingStatus.textContent = 'Error checking Tailscale status. Retrying...';
        // Retry check after interval
        setTimeout(checkVPNStatus, VPN_CONFIG.checkInterval);
    }
}

// Function to get VPN connection status
export function isVPNConnected() {
    return vpnConnected;
} 