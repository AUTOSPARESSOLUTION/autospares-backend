// keepAwake.js
const BACKEND_URL = 'https://your-backend-url.herokuapp.com';

function keepBackendAwake() {
    fetch(`${BACKEND_URL}/api/health`)
        .then(() => console.log('✅ Backend is awake'))
        .catch(() => console.log('💤 Backend is sleeping...'));
    
    setInterval(() => {
        fetch(`${BACKEND_URL}/api/health`)
            .then(() => console.log('🔔 Backend pinged - keeping awake'))
            .catch(() => console.log('⚠️ Backend not responding'));
    }, 5 * 60 * 1000);
}

document.addEventListener('DOMContentLoaded', keepBackendAwake);
