Ranger.defineHelper("ajax", ["jquery", "promise", "console", "debug"], function ($, Promise, console, debug) {

    this.getJSON = function (url, data) {
        return this.get(url, data, "json");
    };

    this.get = function (url, data, dataType) {
        return this._send({
            url: url,
            data: data,
            dataType: dataType,
            type: 'GET'
        });
    };

    this.post = function (url, data, dataType) {
        return this._send({
            url: url,
            data: data,
            dataType: dataType,
            type: 'POST'
        });
    };

    this._send = function (params) {
        if(debug) {
            console.log("---- Sending AJAX ----", params);
        }
        return Promise.cast($.ajax(params))
            .then(function (data) {
                if(debug) {
                    console.log("---- Received AJAX -----", data);
                }
                return Promise.resolve(data);
            });
    };

});