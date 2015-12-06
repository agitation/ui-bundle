/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

Agit.Endpoint = function(endpointName)
{
    var
        endpointMeta = Agit.Endpoint.list[endpointName],
        expectedRequest = endpointMeta[0],
        expectedResponse = endpointMeta[1];

    if (!endpointMeta)
    {
        throw new Agit.Exception('api.endpoint', Agit.sprintf("Invalid endpoint: %s", endpointName));
    }

    this.getCallUrl = function()
    {
        return Agit.sprintf('%s/%s', Agit.apiBaseUrl, endpointName);
    };

    this.getRequestObjectName = function()
    {
        return endpointMeta[0];
    };

    this.getResponseObjectName = function()
    {
        return endpointMeta[1];
    };

    this.createRequestObject = function(values)
    {
        return new Agit.Object(this.getRequestObjectName(), values);
    };
};

Agit.Endpoint.list = {};

Agit.Endpoint.register = function(endpointName, requestObjectName)
{
    Agit.Endpoint.list[endpointName] = requestObjectName;
};

Agit.Endpoint.registerList = function(list)
{
    Object.keys(list).map(function(key){
        Agit.Endpoint.register(key, list[key]);
    });
};
