/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Tx, $, jQuery, OpenLayers, JSON */

Agit.ApiCall = function(endpoint, requestObject, successCallback, _params)
{
    var
        defaultParams = {
            indicator      : Agit.Service.get('indicator'),
            messageHandler : Agit.Service.get('messageHandler'),
            dataType       : 'json',
            callback       : function(){},
            processType    : 'api'  // 'api', 'apicomplete', or 'raw'. with 'api*', we expect an API response and will preprocess it
        },

        params = $.extend(defaultParams, _params || {}),

        processPayload = function(payload, entityList)
        {
            var
                pattern = /#e#:[0-9]+/,
                expand = function(value)
                {
                    var
                        type = $.type(value),
                        newValue = value;

                    if (type === 'object')
                    {
                        newValue = {};
                        $.each(value, function(k, v){
                            newValue[k] =  expand(v);
                        });
                    }
                    else if (type === 'array')
                    {
                        newValue = [];
                        $.each(value, function(k, v){
                            newValue.push(expand(v));
                        });
                    }
                    else if (type === 'string' && value.match(pattern))
                    {
                        newValue = expand(entityList[value]);
                    }

                    return newValue;
                };

            return expand(payload);
        },

        processMessages = function(messageList)
        {
            var i = 0;

            if (messageList.length > 0)
            {
                params.messageHandler.clear('agit.api');

                for (i; i < messageList.length; i++)
                {
                    params.messageHandler.showMessage(new Agit.Message(
                        messageList[i].text,
                        messageList[i].type,
                        'agit.api'
                    ));
                }
            }
        },
        combinedCallback = function(res)
        {
            var finishCallback = function(){};

            if (!res ||
                typeof(res) !== 'object' ||
                res.payload === undefined ||
                res.messageList === undefined)
            {
                res =
                {
                    success : false,
                    payload : null,
                    messageList : [{type: "error", text: Agit.L10n.t("Call failed or returned an invalid response.")}]
                };
            }

            if (['api', 'apicomplete'].indexOf(params.processType) > -1)
            {
                finishCallback = function()
                {
                    processMessages(res.messageList);
                    res.payload = processPayload(res.payload, res.entityList);
                    successCallback(params.processType === 'api' ? res.payload : res);
                }
            }
            else if (params.processType === 'raw')
            {
                finishCallback = function() { successCallback(res); };
            }

            if (params.indicator)
            {
                params.indicator.finish(finishCallback);
            }
            else
            {
                finishCallback();
            }
        };

    this.setParam = function(name, value)
    {
        if (params[name] !== undefined)
        {
            params[name] = value;
        }
    };

    this.getParam = function(name)
    {
        return (params[name] !== undefined)
            ? params[name]
            : null;
    };

    this.doCall = function()
    {
        var
            request = 'request=' +
                JSON.stringify(requestObject.getData())
                    .replace(/\+/g, '%2b')
                    .replace(/&/g, '%26') +
                "&locale=" + Agit.locale,

            ajaxOpts = {
                type         : 'POST',
                url          : endpoint.getCallUrl(),
                data         : request,
                success      : combinedCallback,
                error        : combinedCallback,
                dataType     : params.dataType,
                cache        : false
            };

        if (params.dataType === 'jsonp')
        {
            ajaxOpts.type = 'GET';
            ajaxOpts.url += '.jsonp';
        }

        if (Agit.csrfToken)
        {
            ajaxOpts.headers = { 'X-Token' : Agit.csrfToken };
        }

        $.ajax(ajaxOpts);

        if (params.indicator)
        {
            params.indicator.start();
        }
    };
};

// shortcut
Agit.apiCall = function(endpoint, requestObject, successCallback, params)
{
    return new Agit.ApiCall(endpoint, requestObject, successCallback, params).doCall();
};
