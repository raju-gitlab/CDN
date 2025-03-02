(function () {
    if (!window.TrackerDispatcherService) {
        window.TrackerDispatcherService = {
            APIURL: "https://0j56q6pg-5278.inc1.devtunnels.ms/",
            w: window,
            d: document,
            n: navigator,
            __valid: false,
            __t: '',
            __eSk: '',
            __key: '',
            __sSUID: sessionStorage.getItem('__sSUID'),
            __metaData: '',
            sTag: document.querySelector('script[src]'),
            urlParams: new URLSearchParams(new URL(document.querySelector('script[src*="Tracker.js"]').src).search),
            i: null,
            j: JSON,
            c: '',
            __Version: 'v1',
            __Mdt: function () {
                let __dataObject = new Object();
                __dataObject.DeviceType = this.detectDevice();
                // __detaObject.Platform = this
                __dataObject.BrowserType = this.detectBrowser();
                __dataObject.IsOpenOnBrowser = true;
                __dataObject.SessionId = this.__sSUID;
                __dataObject.apId = localStorage.getItem('__aId');
                __dataObject.Token = localStorage.getItem('__eSk');
                this.__metaData = JSON.stringify(__dataObject);
            },
            __ip: function () {
                return fetch('https://ipapi.co/json', {
                    method: 'GET'
                })
                    .then(res => {
                        if (res.status === 200) {
                            return res.json();
                        }
                    })
                    .then(response => {
                        return response.ip;
                    })
                    .catch(err => {
                        return '';
                    })
            },
            __oUBD: function () {
                const userAgent = navigator.userAgent;
                let browserName = "Unknown";
                if (userAgent.includes("Firefox")) {
                    browserName = "Mozilla Firefox";
                } else if (userAgent.includes("Edg")) {
                    browserName = "Microsoft Edge";
                } else if (userAgent.includes("Chrome")) {
                    browserName = "Google Chrome";
                } else if (userAgent.includes("Safari")) {
                    browserName = "Apple Safari";
                } else if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
                    browserName = "Internet Explorer";
                }
                return {
                    browser: browserName,
                    userAgent: userAgent,
                    platform: navigator.platform,
                    language: navigator.language,
                };
            },
            __uBD: async function () {
                const __b = this.__uBV();
                if (navigator.userAgentData) {
                    const data = await navigator.userAgentData.getHighEntropyValues(["platform", "architecture", "model", "uaFullVersion"]);
                    return {
                        browser: navigator.userAgentData.brands.map(b => b.brand).join(", "),
                        version: data.uaFullVersion,
                        platform: data.platform,
                        architecture: data.architecture,
                        model: data.model
                    };
                }
                else {
                    return this.__oUBD();
                }
            },
            __uBV: function () {
                const userAgent = navigator.userAgent;
                let match;
                if ((match = userAgent.match(/Chrome\/([\d.]+)/))) {
                    return { _b_: "Google Chrome", _v_: match[1] };
                } else if ((match = userAgent.match(/Firefox\/([\d.]+)/))) {
                    return { _b_: "Mozilla Firefox", _v_: match[1] };
                } else if ((match = userAgent.match(/Edg\/([\d.]+)/))) {
                    return { _b_: "Microsoft Edge", _v_: match[1] };
                } else if ((match = userAgent.match(/Safari\/([\d.]+)/)) && !userAgent.includes("Chrome")) {
                    return { _b_: "Apple Safari", _v_: match[1] };
                } else if ((match = userAgent.match(/MSIE ([\d.]+)/)) || (match = userAgent.match(/rv:([\d.]+)\) like Gecko/))) {
                    return { _b_: "Internet Explorer", _v_: match[1] };
                }

                return { _b_: "Unknown", _v_: "Unknown" }
            },
            ld: function () {
                if (window.jQuery === undefined) {
                    const sct = document.createElement("script");
                    sct.src = "https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js";
                    sct.type = "text/javascript";
                    document.head.appendChild(sct);
                }
                this.m_Req(`${this.APIURL}/api/wmc/sync`, "POST", `{"SessionId"}`)
            },
            __lC: function () {
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
                    }).then(response => {
                        this.__valid = true;
                        this.__eSk = response.apiResponse;
                        localStorage.setItem('__aId', this.urlParams.get('AppId'));
                        localStorage.setItem('__eSk', this.__eSk);
                    }).catch((err) => {
                        this.__valid = false;
                        console.log(err);
                    })
                }
            },
            swp: function (url, method = "GET", body = null, tagname = null) {
                if (navigator.serviceWorker.controller) {
                    let __eObject = new Object();
                    __eObject.id = this.__suid();
                    __eObject.tagName = tagname; 
                    if (typeof(body) != 'string') {
                        __eObject.data = JSON.stringify(body);
                    }
                    else{
                        __eObject.data = body;
                    }
                    navigator.serviceWorker.controller.postMessage({
                        action: "message",
                        data: __eObject,
                        sessionId : sessionStorage.getItem('__sSUID'),
                        metadeta: this.__metaData,
                        MethodType: method,
                        Endpoint: url
                    });
                } else {
                    console.error("No active Service Worker found!");
                }
            },
            init: async function (p) {
                await this.sUid();
                this.__Mdt();
                if (p != undefined && p != null) {
                    this.__t = p;
                    this.ld();
                    this.sw();
                    if (this.__sSUID === null || this.__sSUID === undefined) {
                        this.__sSUID = this.__suid();
                        sessionStorage.setItem('__sSUID', this.__sSUID);
                        const __sessionObj = new Object();
                        __sessionObj.SessionId = this.__sSUID;
                        __sessionObj.MetaData = this.__metaData;
                        __sessionObj.SessionInfo = localStorage.getItem('__uId');
                        await fetch(`${this.APIURL}api/Tracker/InititateSession`, {
                            body: JSON.stringify(__sessionObj),
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'content-type': 'application/json',
                                'Token': p,
                                'aId': localStorage.getItem('__aId')
                            }
                        }).then((res) => {
                            console.log(res);
                        }).catch((err) => {
                            console.error(err);
                        });
                    }
                }
                else {
                    console.log("Error in configiration");
                }
            },
            sourceToken: async function () {
                return await this.mReq(`${this.c}?Token=${this.i}`);
            },
            stP: function () {
                const item = sessionStorage.getItem("_tkns")
            },
            Bcn: function (rs, dt) {
                navigator.sendBeacon(`${this.APIURL}api/Tracker/${rs}`, this.j.stringify({ "Data": this.j.stringify(dt) }));
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
            PostData: async function (event, tagname, data) {
                if (this.__valid) {
                    //(url, method = "GET", body = null)
                    // this.swp('endpoint', 'POST', data);

                    if ('serviceWorker' in navigator) {
                        this.swp('Tracker/Post', 'POST', data);
                    }
                    else {
                        this.m_Req(`${this.APIURL}/api/wmc/sync`, "POST", `{"SessionId"}`);
                    }
                }
                else {
                    console.error("")
                }
            },
            __suid() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
                    const r = (Math.random() * 16) | 0,
                        v = c === "x" ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                });
            },
            sUid: async function (__em = '') {
                const stuId = localStorage.getItem('__uId');
                if (stuId === undefined || stuId === null) {
                    const setId = `${this.__suid()}|${__em}`;
                    localStorage.setItem('__uId', setId);
                }
                else
                {
                    let __stuId = stuId.split('|');
                    if (__stuId[1] != __em) {
                        __stuId[1] = __em;
                        localStorage.setItem('__uId', __stuId);
                    }
                }
            },
            detectBrowser() {
                var userAgent = navigator.userAgent;
                if (userAgent.indexOf("Edg") > -1) {
                    return "MicrosoftEdge";
                } else if (userAgent.indexOf("Chrome") > -1) {
                    return "Chrome";
                } else if (userAgent.indexOf("Firefox") > -1) {
                    return "Firefox";
                } else if (userAgent.indexOf("Safari") > -1) {
                    return "Safari";
                } else if (userAgent.indexOf("Opera") > -1) {
                    return "Opera";
                } else if (userAgent.indexOf("Trident") > -1 || userAgent.indexOf("MSIE") > -1) {
                    return "InternetExplorer";
                }

                return "Unknown";
            },
            detectDevice() {
                const userAgent = navigator.userAgent.toLowerCase();
                const width = window.innerWidth;
                if (/mobile|android|iphone|ipod|blackberry|opera mini|windows phone/i.test(userAgent)) {
                    return "Mobile";
                }
                if (/ipad|tablet|playbook|silk/i.test(userAgent) || (width > 600 && width < 1024)) {
                    return "Tablet";
                }
                if (/smart-tv|apple-tv|google-tv|hbbtv|netcast|viera|webos|tv/i.test(userAgent)) {
                    return "SmartTV";
                }
                if (/macintosh|windows nt|linux|x11/i.test(userAgent)) {
                    return "Desktop";
                }
                return "UnknownDevice";
            },
            IsEmail : function(mailId) {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegex.test(mailId);
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
        window.TrackerDispatcherService.init.bind(window.TrackerDispatcherService);
    }
})();
