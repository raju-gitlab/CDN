(function () {
    if (!window.TrackerWorkerService) {
        window.TrackerWorkerService = {
            APIKEY : '',
            AppId : '',
            URL : 'http://localhost:5278/',
            Send : function(data) {
                fetch ('', {

                })
                .then((res) => {

                })
            },
            Init : function () {
                console.log("Tracker initiated");
            }
        };
        window.Send = window.TrackerWorkerService.Send.bind(window.TrackerWorkerService);
        window.TrackerWorkerService.Init();
    }
})();