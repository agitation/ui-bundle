/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Tx, $, jQuery, JSON */

Agit.Exception = function(code, message)
{
    // allows identifying our exceptions
    this.isAgit = true;

    this.getCode = function()
    {
        return code;
    };

    this.getMessage = function()
    {
        return message;
    };

    this.toString = function()
    {
        return Agit.sprintf("Error of type '%s': %s", code, message);
    };
};
