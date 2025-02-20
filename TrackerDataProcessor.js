self.addEventListener("install", (event) => {
    console.log("Service Worker Installed");
    self.skipWaiting();
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
    event.waitUntil(self.clients.claim());
});

self.addEventListener("message", async (event) => {
    if (event.data.action === "fetchData") {
        try { 
            await fetch(event.data.url, {
                method: event.data.method || "GET",
                body: event.data.method === "POST" ? JSON.stringify(event.data.body) : null,
                headers: { "Content-Type": "application/json" },
            });

            // const data = await response.json();

            // const allClients = await self.clients.matchAll();
            // allClients.forEach(client => {
            //     client.postMessage({ success: true, data });
            // });

        } catch (error) {
            console.error("Fetch error in Service Worker:", error);
            const allClients = await self.clients.matchAll();
            allClients.forEach(client => {
                client.postMessage({ success: false, error: error.message });
            });
        }
    }
    else if (event.data.action === "makeData") {
        
    }
});
