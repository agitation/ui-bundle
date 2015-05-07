/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

Agit.L10n =
{
    t : function(_string)
    {
        return (window.messages && window.messages[_string])
            ? window.messages[_string]
            : _string;
    },

    tc : function(origString)
    {
        var
            string = Agit.L10n.t(origString),
            lastpipe = string.lastIndexOf('|');

        return (lastpipe === -1)
            ? string
            : string.slice(0, lastpipe);
    },

    tn : function(string, num) // works for most european languages
    {
        var
            tString = Agit.L10n.t(string),
            parts = tString.indexOf('|') > 0 ? tString.split('|') : [tString, tString];

        return Agit.sprintf((num === 1 ? parts[0] : parts[1]), num);
    },

    u : function(string) // just a shortcut
    {
        return Agit.L10n.mlStringTranslate(string, Agit.config.locale);
    },

    formatDay : function(Day, _short)
    {
        return _short
            ? Agit.sprintf('%s.%s.', Agit.numpad(Day.d), Agit.numpad(Day.m))
            : Agit.sprintf('%s.%s.%s', Agit.numpad(Day.d), Agit.numpad(Day.m), Day.y);
    },

    formatTimeofday : function(Timeofday)
    {
        return Agit.sprintf('%s:%s', Agit.numpad(Timeofday.h), Agit.numpad(Timeofday.m));
    },

    formatDuration : function(minutes)
    {
        var hours = Math.floor(minutes / 60);
        return Agit.sprintf("%sh %smin", hours, minutes - hours * 60);
    },


    mlStringToObj : function(string)
    {
        var
            regex = new RegExp('\\[:(?=[a-z]{2}\\])', 'g'),
            obj = {};

        if (typeof(string) === 'string')
        {
            $.each(string.split(regex), function(k, part){
                var
                    key = part.substr(0, 2),
                    string = part.substr(3);

                if (part.length >= 3 && part.substr(0,3).match(/[a-z]{2}\]/))
                {
                    obj[key] = string;
                }
            });
        }

        return obj;
    },

    mlStringTranslate : function(string, locale)
    {
        var
            lang = locale.substr(0, 2),
            fallbackLang = Agit.config.locale.substr(0, 2),
            obj,
            outString = string;

        if (typeof(string) === 'string' && string.match(/\[:[a-z]{2}\]/))
        {
            obj = Agit.L10n.mlStringToObj(string);

            if (typeof(obj[lang]) === 'string')
            {
                outString = obj[lang];
            }
            else if (typeof(obj[fallbackLang]) === 'string')
            {
                outString = obj[fallbackLang];
            }
            else if (typeof(obj.en) === 'string')
            {
                outString = obj.en;
            }
            else
            {
                outString = '';
            }
        }

        return outString;
    }
};

// console.log(Agit.L10n.mlStringTranslate('[:de]foo[:en]bar', 'de_AT')); // 'foo'
// console.log(Agit.L10n.mlStringTranslate('[:de]foo[:en]bar', 'it_IT')); // 'foo'
// console.log(Agit.L10n.mlStringTranslate('[:de][:en]bar', 'de_DE')); // ''
// console.log(Agit.L10n.mlStringTranslate('[de]foo[:en]bar', 'de_DE')); // 'bar'
// console.log(Agit.L10n.mlStringTranslate('[defoo[:en]bar', 'de_DE')); // 'bar'
// console.log(Agit.L10n.mlStringTranslate('[:defoo[:en]bar', 'de_DE')); // 'bar'
// console.log(Agit.L10n.mlStringTranslate('foobar', 'de_DE')); // 'foobar'
//
// console.log(Agit.L10n.mlStringToObj('[:de]foo[:en]bar')); // { de : "foo", en : "bar" }
// console.log(Agit.L10n.mlStringToObj('[:de]foo[:en]bar')); // { de : "foo", en : "bar" }
// console.log(Agit.L10n.mlStringToObj('[:de][:en]bar')); // { de : "", en : "bar" }
// console.log(Agit.L10n.mlStringToObj('[de]foo[:en]bar')); // { en : "bar" }
// console.log(Agit.L10n.mlStringToObj('[defoo[:en]bar')); // { en : "bar" }
// console.log(Agit.L10n.mlStringToObj('[:defoo[:en]bar')); // { en : "bar" }
// console.log(Agit.L10n.mlStringToObj('foobar')); // { }
