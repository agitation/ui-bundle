/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Tx, $, jQuery, OpenLayers, JSON */

Agit.apiCall = (function(){
    var
        // to be set by the API-call function
        messageHandler,

        normalizePayload = function(payload, entityList)
        {
            var
                pattern = /#e#:[0-9]+/,

                expand = function(value)
                {
                    var newValue = value;

                    if (value instanceof Array)
                    {
                        newValue = [];

                        $.each(value, function(k, v){
                            newValue.push(expand(v));
                        });
                    }
                    else if (value instanceof Object)
                    {
                        newValue = {};

                        $.each(value, function(k, v){
                            newValue[k] =  expand(v);
                        });
                    }
                    else if (typeof(value) === "string" && value.match(pattern))
                    {
                        newValue = expand(entityList[value]);
                    }

                    return newValue;
                };

            return expand(payload);
        },

        showMessages = function(messages)
        {
            if (messageHandler)
            {
                messageHandler.clear("agit.api");

                messages.forEach(function(message){
                    messageHandler.showMessage(new Agit.Message(
                        message.text,
                        message.type,
                        "agit.api"
                    ));
                });
            }
        },

        // this is to make sure that, in the event of an error, we have a "proper" response.
        processResponse = function(response)
        {
            if (!response ||
                typeof(response) !== "object" ||
                response.payload === undefined ||
                response.messageList === undefined)
            {
                response =
                {
                    success : false,
                    payload : null,
                    messageList : [{ type: "error", text: "Error while loading the requested data." }]
                };
            }

            return response;
        };


    return function(endpoint, request, callback, params)
    {
        params = params || {};
        messageHandler = params.messageHandler || Agit.Service.get("messageHandler");

        if (endpoint instanceof Agit.Endpoint)
            endpoint = endpoint.getName();

        var
            indicator = params.indicator || Agit.Service.get("indicator"),

            callbackWrapper = function(response)
            {
                indicator.finish(function() {
                    response = processResponse(response);
                    showMessages(response.messageList);
                    response.payload = normalizePayload(response.payload, response.entityList);
                    callback(params.fullResponse ? response : response.payload);
                });
            },

            ajaxOpts = {
                type         : "POST",
                url          : Agit.sprintf('%s/%s', Agit.apiBaseUrl, endpoint),
                data         : "request=" + JSON.stringify(request).replace(/\+/g, '%2b').replace(/&/g, '%26'),
                success      : callbackWrapper,
                error        : callbackWrapper,
                dataType     : params.dataType || "json",
                cache        : false
            };

        if (ajaxOpts.dataType === "jsonp")
        {
            ajaxOpts.type = "GET";
            ajaxOpts.url += ".jsonp";
        }

        if (Agit.csrfToken)
        {
            ajaxOpts.headers = { "X-Token" : Agit.csrfToken };
        }

        indicator && indicator.start();

        $.ajax(ajaxOpts);
    };
})();
