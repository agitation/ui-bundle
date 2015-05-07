/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

Agit.vsprintf = function(string, values)
{
    var i = 0;

    if (!values || !values.length)
    {
        return string;
    }

    for (i; i<values.length; i++)
    {
        string = string.replace(/%s/, values[i]);
    }

    return string;
};

Agit.sprintf = function(string)
{
    var args = [];

    $.each(arguments, function(k, arg){
        if (k) { args.push(arg); }
    });

    return Agit.vsprintf(string, args);
};

Agit.numberFormat = function(val, _decimals, _trim)
{
    var
        decimals = _decimals || 2,
        trim = (_trim === true),  // if trim is true: use decimals for rounding, then trim trailing zeros
        floatVal = Agit.toFloat(val),
        intpart = Math.floor(floatVal),
        factor = Math.pow(10, decimals),
        fractpart = floatVal*factor - intpart*factor,
        value;

    fractpart = Agit.numpad(Math.round(fractpart), decimals);
    value = intpart + Agit.L10n.tc(".|decimal separator") + fractpart;

    if (trim)
    {
        while (value.match(/[0\.,]$/) && value.match(/[\.,]/))
        {
            value = value.substr(0, value.length - 1);
        }
    }

    return value;
};

// DEPRECATED; use L10n functions
Agit.currencyFormat = function(val) // format currency xxx.xx
{
    return Agit.numberFormat(val, 2);
};

Agit.varpad = function(_val, _cnt, _fill)
{
    var
        val = _val ? _val.toString() : '',
        cnt = _cnt || 2,
        fill = _fill ?  _fill.toString() : ' ';

    while (val.length < cnt)
    {
        val = fill + val;
    }

    return val;
};

Agit.numpad = function(val, _cnt)
{
    return Agit.varpad(val, _cnt, '0');
};
