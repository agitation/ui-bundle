ag.ns("ag.ui.tool");

ag.u.vsprintf = function(string, values)
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

ag.u.sprintf = function(string)
{
    var args = [];

    $.each(arguments, function(k, arg){
        k && args.push(arg);
    });

    return ag.u.vsprintf(string, args);
};

ag.u.varpad = function(val, cnt, fill)
{
    val = val ? val.toString() : '';
    cnt = cnt || 2;
    fill = fill ? fill.toString() : ' ';

    while (val.length < cnt)
    {
        val = fill + val;
    }

    return val;
};

ag.u.numpad = function(val, cnt)
{
    return ag.u.varpad(val, cnt, '0');
};

ag.u.numberFormat = function(val, decimals, trim)
{
    decimals = decimals !== undefined ? decimals : 2;
    trim = trim !== undefined ? trim : true;  // if trim is true: use decimals for rounding, then trim trailing zeros

    var
        floatVal = parseFloat(val),
        intpart = Math.floor(floatVal),
        factor = Math.pow(10, decimals),
        fractpart = floatVal * factor - intpart * factor,
        value;

    fractpart = ag.u.numpad(Math.round(fractpart), decimals);
    value = intpart + ag.intl.x("decimal separator", ".") + fractpart;

    if (trim)
        while (value.match(/[0\.,]$/) && value.match(/[\.,]/))
            value = value.substr(0, value.length - 1);

    return value;
};

ag.u.currency = function(val, symbol)
{
    var string = ag.u.numberFormat(val, 2, false);

    if (symbol)
        string += "\u2009" + symbol;

    return string;
};

ag.u.duration = function(minutes)
{
    var hours = Math.floor(minutes / 60);
    return ag.u.sprintf(ag.intl.t("%sh %smin"), hours, minutes - hours * 60);
};

ag.u.labelConnect = function(label, field)
{
    var id = "lbl-" + ++ag.u.labelConnect.lId;
    label.attr("for", id);
    field.attr("id", id);
};

ag.u.labelConnect.lId = 0;

ag.u.esc = function(string)
{
    $.each(ag.u.esc.chars, function(search, replace){
        if (typeof string === "string")
        {
            string = string.replace(new RegExp(search, "g"), replace);
        }
    });

    return string;
};

// This function returns strings that come from an "untrusted" source and
// makes them ready for being inserted in the HTML. This is done via filters.
ag.u.out = function(string)
{
    ag.u.out.filters.forEach(function(filter){
        string = filter(string);
    });

    return string;
};

ag.u.esc.chars = { "<" : "&lt;", ">" : "&gt;", "\"" : "&quot;", "'" : "&#038;" };
ag.u.out.filters = [ ag.u.esc ];
