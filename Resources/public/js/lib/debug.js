/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global a, p */

var _getValueSource = function(val)
{
    var ret = '';

    if (val === undefined)
        { ret = 'undefined'; }
    else if (val === null)
        { ret = 'null'; }
    else if (val.toSource !== undefined)
        { ret =  val.toSource(); }
    else
        { ret = JSON.stringify(val); }

    return ret;
};

function a(val) { alert(_getValueSource(val)); }
function c(val) { console.log(_getValueSource(val)); }
function p(val) { $('body').append((_getValueSource(val))+'<br /><br />'); }
