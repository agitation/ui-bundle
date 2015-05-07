/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Tx, $, jQuery, OpenLayers, JSON */

Agit.Endpoint = function(endpointName)
{
    var
        namespace = endpointName.split('/')[0];

    if (!Agit.ApiEndpoints[namespace] || !Agit.ApiEndpoints[namespace][endpointName])
    {
        throw new Agit.Exception('api.endpoint', Agit.sprintf("Invalid endpoint: %s", endpointName));
    }

    this.getCallUrl = function()
    {
        return Agit.sprintf('%s/%s', Agit.apiBaseUrl, endpointName);
    };

    this.getExpectedObjectName = function()
    {
        return Agit.ApiEndpoints[namespace][endpointName];
    };
};
