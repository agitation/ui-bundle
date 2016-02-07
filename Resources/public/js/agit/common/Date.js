agit.ns("agit.common");

(function(){
    var
        l10n = agit.intl.L10n,
        fmt = agit.srv("format"),

        str = function(num) { return num.toString(); },
        pad = function(num) { return fmt.numpad(num, 2); },

        dateFn = {
                j : function(dateObj) { return str(dateObj.getDate()); }, // Day of the month without leading zeros, 1 to 31
                d : function(dateObj) { return pad(dateObj.getDate()); }, // Day of the month, 2 digits with leading zeros, 01 to 31

                w : function(dateObj) { return str(dateObj.getDay()); }, // Numeric representation of the day of the week, 0 (for Sunday) through 6 (for Saturday)
                D : function(dateObj) { return dateService.getWeekdayNamesShort()[dateObj.getDay()]; }, // A textual representation of a day, three letters, Mon through Sun
                l : function(dateObj) { return dateService.getWeekdayNames()[dateObj.getDay()]; }, // A full textual representation of the day of the week Sunday through Saturday

                F : function(dateObj) { return dateService.getMonthNames()[dateObj.getMonth()]; }, // A full textual representation of a month, January through December
                M : function(dateObj) { return dateService.getMonthNamesShort()[dateObj.getMonth()]; }, // A short textual representation of a month, three letters, Jan through Dec
                n : function(dateObj) { return str(dateObj.getMonth() + 1); }, // Numeric representation of a month, without leading zeros, 1 through 12
                m : function(dateObj) { return pad(dateObj.getMonth() + 1); }, // Numeric representation of a month, with leading zeros, 01 through 12

                Y : function(dateObj) { return str(dateObj.getFullYear()); }, // A full numeric representation of a year, 1999 or 2003
                y : function(dateObj) { return str(dateObj.getFullYear()).substr(2); }, // A two digit representation of a year, 99 or 03

                H : function(dateObj) { return pad(dateObj.getHours()); }, // 24-hour format of an hour with leading zeros, 00 through 23
                i : function(dateObj) { return pad(dateObj.getMinutes()); }, // Minutes with leading zeros, 00 to 59
                s : function(dateObj) { return pad(dateObj.getSeconds()); }, // Seconds, with leading zeros, 00 through 59
        },

        dateService = {};

    dateService.getMonthNames = function()
    {
        return [ l10n.t("January"), l10n.t("February"), l10n.t("March"),
                l10n.t("April"), l10n.t("May"), l10n.t("June"),
                l10n.t("July"), l10n.t("August"), l10n.t("September"),
                l10n.t("October"), l10n.t("November"), l10n.t("December") ];
    };

    dateService.getMonthNamesShort = function()
    {
        return [ l10n.t("Jan"), l10n.t("Feb"), l10n.t("Mar"), l10n.t("Apr"),
                l10n.t("May"), l10n.t("Jun"), l10n.t("Jul"), l10n.t("Aug"),
                l10n.t("Sep"), l10n.t("Oct"), l10n.t("Nov"), l10n.t("Dec") ];
    };

    dateService.getWeekdayNames = function()
    {
        return [ l10n.t("Sunday"), l10n.t("Monday"), l10n.t("Tuesday"),
                l10n.t("Wednesday"), l10n.t("Thursday"),
                l10n.t("Friday"), l10n.t("Saturday") ];
    };

    dateService.getWeekdayNamesShort = function()
    {
        return [ l10n.t("Sun"), l10n.t("Mon"), l10n.t("Tue"), l10n.t("Wed"),
                l10n.t("Thu"), l10n.t("Fri"), l10n.t("Sat") ];
    };

    dateService.getFirstDayOfWeek = function()
    {
        return parseInt(l10n.tc("0|first day of week; 0: Sunday, 1: Monday"));
    };

    dateService.format = function(dateObj, string)
    {
        return string.split("").map(function(char){
            return dateFn[char] ? dateFn[char](dateObj) : char;
        }).join("");
    };

    agit.common.Date = dateService;
    agit.srv("date", dateService);
})();

