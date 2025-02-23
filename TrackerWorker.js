(function () {
    if (!window.TrackerWorkerService) {
        window.TrackerWorkerService = {
            APIKEY : '',
            AppId : '',
            URL : 'https://0j56q6pg-5278.inc1.devtunnels.ms/',
            TSend : function(data) {
                fetch ('', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'content-type': 'application/json',
                        'aId' : localStorage.getItem('__aId'),
                        'uId' : localStorage.getItem('__uId'),
                        'AppName' : 'Test',
                        'Signature' : 'test',
                    }
                })
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.error(err);
                })
            },
            Init : function () {
                console.log("Tracker initiated");
            }
        };
        window.TSend = window.TrackerWorkerService.TSend.bind(window.TrackerWorkerService);
        window.TrackerWorkerService.Init();
    }
})();
