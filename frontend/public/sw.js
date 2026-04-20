console.log("SERVICE WORKER ACTIVO");
self.addEventListener('push', (event)=> {
    const data = event.data ? event.data.json() : {};

    const options = {
        body: data.body,
        data: {
            url: data.url
        }
    };
    
    event.waitUntil(
        self.registration.showNotification(data.head, options)
    );
});


self.addEventListener('notificationclick', (event)=> {
    
    event.notification.close();
    const url = event.notification.data?.url || "https://frontend-x64j.onrender.com"; // front aplicacion
    
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            // Usa una pestaña ya abierta
            for (const client of clientList) {
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }

            // Si no hay pestaña, abre una nueva
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});