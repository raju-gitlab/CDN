const __dbTitle = "trkDB";
const __dtTbl = "eventsStorage";
const __dbInstat = false;
const __apId = "";
const __tkn = "";
const __serverURL = "https://0j56q6pg-5278.inc1.devtunnels.ms";
const __ekey = "";
let intervalId = null;
(function () {
    self.addEventListener("install", (event) => {
        console.log("Service Worker Installed");
        this.__IDBInit().then((scs) => { console.log("DB initiated"); this.__dbInstat = true; }).catch((err) => { console.log("DB Initialzation falied"); this.__dbInstat = false; });
        self.skipWaiting();
    });

    self.addEventListener("activate", (event) => {
        console.log("Service Worker Activated");
        this.__asyncPost();
        event.waitUntil(self.clients.claim());
    });

    self.addEventListener("message", async (event) => {
        if (intervalId === null) {
            this.__asyncPost();
        }

        let postData = event.data.data;
        if (typeof (event.data.data) != 'string') {
            postData = JSON.stringify(event.data.data)
        }
        const metaData = JSON.parse(event.data.metadeta);
        await fetch(`${__serverURL}/api/${event.data.Endpoint}`, {
            method: "POST",
            body: postData,
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'Token': metaData.Token,
                'SessionId': metaData.SessionId,
                'Signature': '123456',
                'AppId': metaData.apId
            },
        }).then((res) => {

        }).catch(async (err) => {
            await this.__IDBPushData(event.data.data);
        });
    });

    self.addEventListener("clientevents", async (event) => {
        await fetch(event.data.url, {
            method: event.data.method || "GET",
            body: JSON.stringify(event.data.body),
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json',
                'aId': this.__apId,
                'Token': this.__tkn,
                'ReqOn': new Date()
            },
        });
    });
})();

function __IDBInit() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(__dbTitle, 1);
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(__dtTbl)) {
                db.createObjectStore(__dtTbl, { keyPath: "id", autoIncrement: false });
            }
        };

        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject(event.target.error);
    });
}

async function __IDBPushData(data) {
    const db = await __IDBInit();
    const dta = { id: generateUUID(), name: "Raju Basak" };
    console.log(data);
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(__dtTbl, "readwrite");
        const store = transaction.objectStore(__dtTbl);
        const request = store.add(data);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function __IDBdeleteData(id) {
    const db = await __IDBInit();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(__dtTbl, "readwrite");
        const store = transaction.objectStore(__dtTbl);
        const request = store.delete(id);

        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
    });
}

async function __IDBfetchAllData() {
    const db = await __IDBInit();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction(__dtTbl, "readonly");
        const store = transaction.objectStore(__dtTbl);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

class OQ {
    constructor() {
        this.__trkReq = [];
    }

    __QPush(__i) {
        const __Ssd = localStorage.getItem('__fRL');
        if (__Ssd != null && __Ssd != undefined) {
            let __dt = JSON.parse(__Ssd);
            __dt.push(__i);
        }
        else {
            this.__trkReq.push(__i);
        }
    }

    __DQ(__i) {
        this.__trkReq.pop();
    }

    __TP() {
        return this.__IsEmpty() ? -1 : this.__trkReq[0];
    }

    __IsEmpty() {
        return this.__trkReq.length === 0;
    }

    __size() {
        return this.__trkReq.length;
    }
}

function generateUUID() {
    var d = new Date() * 1;
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
    });
    return uuid;
}
function __asyncPost() {
    if (this.intervalId) return;
    this.intervalId = generateUUID();
    setInterval(async () => {
        try {
            const __dbData = await this.__IDBfetchAllData();
            console.log(__dbData);
            // const response = await fetch(url);
            // const data = await response.json();
            // self.postMessage({ status: "success", data });
        } catch (error) {
            self.postMessage({ status: "error", error: error.message });
        }
    }, 30000);
}

//__ekey
function encryptData() {
    // with encr key first encr data and then post in api
}
