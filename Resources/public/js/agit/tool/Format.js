agit.ns("agit.tool");

(function(){
    var formatTool = {};

    formatTool.vsprintf = function(string, values)
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

    formatTool.sprintf = function(string)
    {
        var args = [];

        $.each(arguments, function(k, arg){
            k && args.push(arg);
        });

        return formatTool.vsprintf(string, args);
    };

    formatTool.varpad = function(_val, _cnt, _fill)
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

    formatTool.numpad = function(val, _cnt)
    {
        return formatTool.varpad(val, _cnt, '0');
    };

    formatTool.numberFormat = function(val, decimals, trim)
    {
        decimals = decimals || 2;
        trim = trim || true;  // if trim is true: use decimals for rounding, then trim trailing zeros

        var
            floatVal = parseFloat(val),
            intpart = Math.floor(floatVal),
            factor = Math.pow(10, decimals),
            fractpart = floatVal * factor - intpart * factor,
            value;

        fractpart = formatTool.numpad(Math.round(fractpart), decimals);
        value = intpart + agit.intl.tc(".|decimal separator") + fractpart;

        if (trim)
            while (value.match(/[0\.,]$/) && value.match(/[\.,]/))
                value = value.substr(0, value.length - 1);

        return value;
    };

    // DEPRECATED; use L10n functions
    formatTool.currencyFormat = function(val) // format currency xxx.xx
    {
        return formatTool.numberFormat(val, 2);
    };

    formatTool.esc = function(string)
    {
        var replacements = { "<" : "&lt;", ">" : "&gt;", "\"" : "&quot;", "'" : "&#038;" };

        $.each(replacements, function(search, replace){
            if (typeof string === "string")
            {
                string = string.replace(new RegExp(search, "g"), replace);
            }
        });

        return string;
    };

    // this function returns strings that come from an untrusted source and
    // makes them ready for being inserted in the HTML. This is done via filters.
    // Filters are currently hardcoded, might become pluggable one day.
    formatTool.out = function(string)
    {
        // filter: convert "dangerous" characters
        string = formatTool.esc(string);

        // filter: translate multilang content
        string = agit.intl.mlStringTranslate(string, agit.cfg.locale);

        return string;
    };

    agit.tool.fmt = formatTool;
})();
