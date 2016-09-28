ag.ns("ag.ui.tool");

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
        decimals = decimals !== undefined ? decimals : 2;
        trim = trim !== undefined ? trim : true;  // if trim is true: use decimals for rounding, then trim trailing zeros

        var
            floatVal = parseFloat(val),
            intpart = Math.floor(floatVal),
            factor = Math.pow(10, decimals),
            fractpart = floatVal * factor - intpart * factor,
            value;

        fractpart = formatTool.numpad(Math.round(fractpart), decimals);
        value = intpart + ag.intl.x("decimal separator", ".") + fractpart;

        if (trim)
            while (value.match(/[0\.,]$/) && value.match(/[\.,]/))
                value = value.substr(0, value.length - 1);

        return value;
    };

    formatTool.currency = function(val, symbol)
    {
        var string = formatTool.numberFormat(val, 2, false);

        if (symbol)
            string += "\u2009" + symbol;

        return string;
    };

    formatTool.duration = function(minutes)
    {
        var hours = Math.floor(minutes / 60);
        return formatTool.sprintf(ag.intl.t("%sh %smin"), hours, minutes - hours * 60);
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

    // this function returns strings that come from an "untrusted" source and
    // makes them ready for being inserted in the HTML. This is done via filters.
    formatTool.out = function(string)
    {
        ag.ui.tool.fmt.filters.forEach(function(filter){
            string = filter(string);
        });

        return string;
    };

    ag.ui.tool.fmt = formatTool;

    ag.ui.tool.fmt.filters = [
        formatTool.esc
    ];
})();
