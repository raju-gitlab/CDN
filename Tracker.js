(function () {
    debugger;
    console.log("****");
    if (!window.TrackerDispatcherService) {
        window.TrackerDispatcherService = {
            APIURL: "https://0j56q6pg-5278.inc1.devtunnels.ms/",
            w: window,
            d: document,
            n: navigator,
            sTag: document.querySelector('script[src]'),
            urlParams: "",
            i: null,
            j: JSON,
            c: '',
            ld: function () {
                if (window.jQuery === undefined) {
                    const sct = document.createElement("script");
                    sct.src = "https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js";
                    sct.type = "text/javascript";
                    document.head.appendChild(sct);
                }
                this.m_Req(`${this.APIURL}/api/wmc/sync`, "POST",  `{"SessionId"}`)
            },
            encr: function (p) {
                //encryption algorithm need to write
            },
            sw: function () {
                console.log("cc");
                
            },
            swp : function (url, method = "GET", body = null) {
                if (navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage({
                        action: "fetchData",
                        url,
                        method,
                        body
                    });
                } else {
                    console.error("No active Service Worker found!");
                }

                navigator.serviceWorker.addEventListener("message", (event) => {
                    if (event.data.success) {
                        console.log("Received Data from Service Worker:", event.data.data);
                    } else {
                        console.error("Service Worker Fetch Error:", event.data.error);
                    }
                });
            },
            init: async function (p) {
                this.ld();
                this.sw();
                this.i = ""
                if (!localStorage.getItem("TsToken")) {
                }

                console.log("Script initiated");
            },
            sourceToken: async function () {
                console.log("Source token called");
                return await this.mReq(`${this.c}?Token=${this.i}`);
            },
            stP: function () {
                const item = sessionStorage.getItem("_tkns")
            },
            Bcn: function (rs, dt) {
                navigator.sendBeacon(`${this.APIURL}api/EventTracker/${rs}`, this.JSON.stringify({ "Data": this.JSON.stringify(dt) }));
            },
            mReq: async function (rs) {
                try {
                    const resp = await fetch(rs);
                    return resp.ok ? await resp.json() : '[]';
                } catch (ex) {
                    return '[]';
                }
            },
            m_Req: async function (t, rs, dt) {
                sessionStorage.setItem("_tkns", `${t}-${rs}-${JSON.stringify(dt)}`)
                console.log(`Post request called : ${this.APIURL}`);
                try {
                    const resp = await fetch(`${this.APIURL}api/EventTracker/${rs}`, {
                        method: t,
                        headers: {
                            "Content-Type": "Application/json"
                        },
                        body: this.JSON.stringify({ "Data": this.JSON.stringify(dt) }),
                    });
                    return resp.ok ? await resp.json() : '[]';
                } catch (ex) {
                    return '[]';
                }
            },
            PostData: async function (event, data) {
                console.log("printedprintedprintedprintedprintedprintedprintedprintedprintedprintedprintedprinted");
                await this.m_Req("POST", "Push", data)
            },
            ap_init: function (a) {
                if (a != undefined && a != null && a.length != 0){
                    const _d = a.toString().split(',');

                }
                this.swp("https://jsonplaceholder.typicode.com/posts/1");
            }
        };
        window.sourceToken = window.TrackerDispatcherService.sourceToken.bind(window.TrackerDispatcherService);
        window.mReq = window.TrackerDispatcherService.mReq.bind(window.TrackerDispatcherService);
        window.m_Req = window.TrackerDispatcherService.m_Req.bind(window.TrackerDispatcherService);
        window.Bcn = window.TrackerDispatcherService.Bcn.bind(window.TrackerDispatcherService);
        window.PostData = window.TrackerDispatcherService.PostData.bind(window.TrackerDispatcherService);
        window.sw = window.TrackerDispatcherService.sw.bind(window.TrackerDispatcherService);
        window.ld = window.TrackerDispatcherService.ld.bind(window.TrackerDispatcherService);
        window.swp = window.TrackerDispatcherService.swp.bind(window.TrackerDispatcherService);
        window.ap_init = window.TrackerDispatcherService.ap_init.bind(window.TrackerDispatcherService);
        window.TrackerDispatcherService.init();
    }
})();
