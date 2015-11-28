/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

Agit.toInt = function(val)
{
    var newVal;

    if (typeof(val) === 'boolean')
    {
        newVal = val ? 1 : 0;
    }
    else
    {
        if (typeof(val) === 'string')
        {
            val = val.replace(',', '.');
        }

        newVal = parseInt(val, 10);
    }

    if (isNaN(newVal))
    {
        newVal = 0;
    }

    return newVal;
};

Agit.toFloat = function(val)
{
    if (typeof(val) === 'string')
    {
        val = val.replace(',', '.');
    }

    var newVal = parseFloat(val);

    if (isNaN(newVal))
    {
        newVal = 0;
    }

    return newVal;
};

Agit.toBool = function(val)
{
    return !!Agit.toInt(val);
};

Agit.stopEvent = function(ev)
{
    if (ev.preventDefault)
    {
        ev.preventDefault();
    }
    else
    {
        ev.returnValue = false;
    }
};

Agit.esc = function(string)
{
    var replacements = { '<' : '&lt;', '>' : '&gt;', '"' : '&quot;', "'" : '&#038;' };

    $.each(replacements, function(search, replace){
        if (typeof string === 'string')
        {
            string = string.replace(new RegExp(search, 'g'), replace);
        }
    });

    return string;
};


// this function returns strings that come from an untrusted source and
// makes them ready for being inserted in the HTML. This is done via filters.
// Filters are currently hardcoded, might become pluggable one day.
Agit.out = function(string)
{
    // filter: Agit.escape HTML special characters
    string = Agit.esc(string);

    // filter: translate multilang content
    if (window.Agit.L10n)
    {
        string = Agit.L10n.mlStringTranslate(string, Agit.locale);
    }

    return string;
};
