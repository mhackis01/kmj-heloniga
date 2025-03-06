import { phones } from '../config/config.js';

let activePhone = null;
let currentWorkerPhoneIndex = 0;

// Function to check if a phone is online
export function isOnline(ip) {
    return ip.startsWith("http") || ip.includes(":"); // Check if valid IP
}

// Function to generate phone boxes
export function generatePhoneBoxes() {
    const container = document.getElementById("phone-container");
    container.innerHTML = "";

    phones.forEach((phone, index) => {
        const frameSrc = isOnline(phone.ip) ? `http://${phone.ip}` : "";
        const phoneBox = document.createElement("div");
        phoneBox.classList.add("phone-box");
        phoneBox.dataset.index = index;
        phoneBox.innerHTML = `
            <iframe class="vnc-frame" src="${frameSrc}" id="vnc${index}"></iframe>
            <div class="overlay">[ PHONE ${index + 1} ]</div>
        `;
        phoneBox.addEventListener("click", () => selectPhone(index));
        container.appendChild(phoneBox);
    });
}

// Function to select a phone
export function selectPhone(index) {
    // Remove previous selection
    document.querySelectorAll(".phone-box").forEach(box => box.classList.remove("active"));

    // Set new active phone
    activePhone = document.getElementById(`vnc${index}`);
    document.querySelector(`.phone-box[data-index="${index}"]`).classList.add("active");

    console.log(`Selected Phone ${index + 1}`);
}

// Function to toggle worker view
export function toggleView() {
    const container = document.getElementById("phone-container");
    const workerView = document.getElementById("worker-view");
    const isWorkerView = workerView.style.display !== "none";

    container.style.display = isWorkerView ? "grid" : "none";
    workerView.style.display = isWorkerView ? "none" : "grid";

    if (!isWorkerView) {
        // Set initial phone in worker view
        const workerPhone = document.getElementById("worker-phone");
        workerPhone.src = isOnline(phones[0].ip) ? `http://${phones[0].ip}` : "";
    }
}

// Function to update worker phone
export function updateWorkerPhone() {
    const workerPhone = document.getElementById("worker-phone");
    workerPhone.src = isOnline(phones[currentWorkerPhoneIndex].ip) ?
        `http://${phones[currentWorkerPhoneIndex].ip}` : "";
}

// Function to refresh phone
export function refreshPhone() {
    const workerPhone = document.getElementById("worker-phone");
    workerPhone.src = workerPhone.src; // Reload the iframe
}

// Function to switch to a specific phone
export function switchToPhone(index) {
    currentWorkerPhoneIndex = index;
    updateWorkerPhone();
}

// Function to get active phone
export function getActivePhone() {
    return activePhone;
} 