/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

Agit.trim = function(string)
{
    if (string === undefined || string === null)
    {
        string = '';
    }
    else if (string.replace === undefined)
    {
        string = string.toString();
    }

    string = string.replace(/^\s+/, '');
    string = string.replace(/\s+$/, '');

    return string;
};

Agit.ucfirst = function(string)
{
  return string.charAt(0).toUpperCase() + string.substr(1);
};

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

// jQ's inArray behaves stupid, we want a boolean value, so we use our own implementation
Agit.inArray = function(needle, haystack, _strict)
{
    var
        i = 0,
        strict = _strict || false,
        ret = false;

    if (haystack !== undefined && haystack !== null)
    {
        $.each(haystack, function(k, haystackElem){
            if ((strict && needle === haystackElem) || (!strict && needle == haystackElem))
            {
                ret = true;
                return false; // break
            }
        });
    }

    return ret;
};

Agit.collectFormValues = function($parent, _prefix)
{
    var values = {}, prefix = _prefix || '';

    $($parent).find('input[name], select[name], textarea[name]').each(function(){
        var
            val = null,
            $this = $(this),
            name = $this.attr('name'),
            isArrayName = (name && name.substr(-4, 4) === 'List');

        if ((prefix && name.indexOf(prefix) !== 0) || $this.attr('data-ignore') === 'true')
        {
            return;
        }

        name = name.substr(prefix.length);
        val = $this.getFieldValue();

        if (val !== null && val !== undefined && name !== null && name !== undefined)
        {
            if (isArrayName && !$.isArray(val))
            {
                if (!$.isArray(values[name]))
                {
                    values[name] = [];
                }

                values[name].push(val);
            }
            else
            {
                values[name] = val;
            }
        }
    });

    return values;
};

Agit.redirect = function(url)
{
    window.location.href = url;
};

// Can be used for empty callbacks
Agit.nullFunc = function() {};

Agit.appendParams = function(_url, _params, _enctype)
{
    var
        url      = _url || '',
        params   = _params || {},
        enctype  = _enctype || '',
        amp      = '&';

    if (enctype === 'html')
        { amp = '&amp;'; }
    else if (enctype === 'url')
        { amp = '%26'; }

    $.each(params, function(key, value){
        url += (url.indexOf('?') === -1 ? '?' : amp) + Agit.sprintf('%s=%s', key, value);
    });

    return url;
};

Agit.findObjectInList = function(list, keyValue, _keyName)
{
    var i = 0, result = null, keyName = _keyName || 'id';

    for (i; i<list.length; i++)
    {
        // ckeck for equality, not identity ... e.g. sometimes JSON is not correctly serialized
        if (list[i][keyName] == keyValue)
        {
            result = list[i];
            break;
        }
    }

    return result;
};

// remove element from hashmap object
Agit.removeEntryFromList = function(list, key)
{
    var newList = {};

    $.each(list, function(k, v){
        if (k.toString() !== key.toString())
        {
            newList[k] = v;
        }
    });

    return newList;
};

// remove element from entity array
Agit.removeObjectFromList = function(list, keyValue, _keyName)
{
    var i = 0, newList = [], keyName = _keyName || 'id';

    for (i; i<list.length; i++)
    {
        if (list[i][keyName].toString() !== keyValue.toString())
        {
            newList.push(list[i]);
        }
    }

    return newList;
};

Agit.findObjectsInList = function(list, keyValues, _keyName)
{
    var results = [], i=0, val, keyName = _keyName || 'id';

    for (i; i<keyValues.length; i++)
    {
        val = Agit.findObjectInList(list, keyValues[i], keyName);
        if (val && val[keyName])
        {
            results.push(val);
        }
    }
    return results;
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
    if (window.Agit.L10n !== undefined)
    {
        string = Agit.L10n.mlStringTranslate(string, Agit.locale);
    }

    return string;
};
