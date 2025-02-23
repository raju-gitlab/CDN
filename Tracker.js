(function () {
    if (!window.TrackerDispatcherService) {
        window.TrackerDispatcherService = {
            APIURL: "https://0j56q6pg-5278.inc1.devtunnels.ms/",
            w: window,
            d: document,
            n: navigator,
            __t: '',
            __eSk: '',
            sTag: document.querySelector('script[src]'),
            urlParams: new URLSearchParams(new URL(document.querySelector('script[src*="Tracker.js"]').src).search),
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
                this.m_Req(`${this.APIURL}/api/wmc/sync`, "POST", `{"SessionId"}`)
            },
            __lC : function() {
                const sct = document.createElement("script");
                sct.src = `./TrackerWorker.js?K=${this.__eSk}`;
                sct.type = "text/javascript";
                document.head.appendChild(sct);
            },
            encr: function (p) {
                //encryption algorithm need to write
            },
            sw: function () {
                const __aId = this.urlParams.get('AppId');

                if (__aId === undefined || __aId === null) {
                    console.log("Error in configuration");
                }
                else {
                    let __obj = new Object();
                    __obj.A = __aId;
                    __obj.K = this.__t;
                    fetch(`${this.APIURL}api/Tracker/ValidCredentials`, {
                        body: JSON.stringify(__obj),
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'content-type': 'application/json'
                        }
                    }).then(res => {
                        if (res.status === 200) {
                            return res.json();
                        }
                    })
                    .then(response => {
                        this.__eSk = response.apiResponse;
                        sessionStorage.setItem('__aId', this.__aId);
                        this.__lC();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
                // if ('serviceWorker' in navigator) {
                //     navigator.serviceWorker.register('https://cdn.jsdelivr.net/gh/raju-gitlab/CDN/TrackerDataProcessor.js')
                //         .then(() => {
                //             console.log("Service Worker Registered");

                //             navigator.serviceWorker.ready.then(() => {
                //                 console.log("Service Worker is ready to handle requests");
                //             });
                //         })
                //         .catch(err => console.error("Service Worker Registration Failed:", err));
                // }
                // fetch('https://cdn.jsdelivr.net/gh/raju-gitlab/CDN/TrackerDataProcessor.js', {
                //     method: 'POST',
                //     headers: {
                //         'Accept': 'application/json',
                //         'Authorization': 'Bearer your_token_here'
                //     }
                // })
                //     .then(() => {
                //         console.log("Service Worker Registered");
                //     })
                //     .catch(err => console.error("Service Worker Registration Failed:", err));
            },
            swp: function (url, method = "GET", body = null) {
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
                if (p != undefined && p != null) {
                    this.__t = p;
                    this.ld();
                    this.sw();
                }
                else {
                    console.log("Error in configiration");
                }
            },
            sourceToken: async function () {
                console.log("Source token called");
                return await this.mReq(`${this.c}?Token=${this.i}`);
            },
            stP: function () {
                const item = sessionStorage.getItem("_tkns")
            },
            Bcn: function (rs, dt) {
                navigator.sendBeacon(`${this.APIURL}api/EventTracker/${rs}`, this.j.stringify({ "Data": this.j.stringify(dt) }));
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
                    const resp = await fetch(`${this.APIURL}api/Tracker/${rs}`, {
                        method: t,
                        headers: {
                            "Content-Type": "Application/json"
                        },
                        body: this.j.stringify({ "Data": this.j.stringify(dt) }),
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
                if (a != undefined && a != null && a.length != 0) {
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
        window.TrackerDispatcherService.init.bind(window.TrackerDispatcherService);
    }
})();
