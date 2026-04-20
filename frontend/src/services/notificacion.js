const VAPID_PUBLIC = import.meta.env.VITE_API_VAPID_KEY;
const API_URL = import.meta.env.VITE_API_URL;
const NOTIFICACION_URL=import.meta.env.VITE_NOTIFICACION_URL;

export const suscribirNotificaciones = async () => {
    // Comprobamos si las notificaciones son compatibles con el navegador
    const registerSw = async () => {
        if ('serviceWorker' in navigator) {
            const reg = await navigator.serviceWorker.register('sw.js');
            initialiseState(reg)

        } else {
            alert("No se pueden enviar notificaciones. ☹️")
        }
    };

    // Comprueba si el usuario habilitó las notificaciones, dió permiso y el navegador es compatible.
    const initialiseState = (reg) => {
        if (!reg.showNotification || Notification.permission === 'denied' || !'PushManager' in window) {
            alert('No se pueden mostrar las notificaciones. 😢');
            return;
        }
        
        subscribirse(reg);
    }

    const subscribirse = async (reg) => {
        const subscription = await reg.pushManager.getSubscription();

        if (subscription) {
            sendSubData(subscription);
            return;
        }

        const applicationServerKey = Uint8Array.from(atob(VAPID_PUBLIC.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0));
        const options = {
            userVisibleOnly: true,
            applicationServerKey
        };

        const sub = await reg.pushManager.subscribe(options);
        sendSubData(sub)
    };

    
    const sendSubData = async (subscripcion) => {
        const browser = navigator.userAgent.match(/(firefox|chrome|safari)/ig)[0].toLowerCase();
        const data = {
            status_type: 'subscribe',
            subscription: subscripcion.toJSON(),
            browser: browser,
        };

        const res = await fetch(NOTIFICACION_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
            },
            credentials: "include"
        });

    };

    registerSw();
};