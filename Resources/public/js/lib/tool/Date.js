ag.ns("ag.ui.tool");

(function(){
    var
        dateTool = {},
        intl = ag.intl,
        numToString = function(num) { return num.toString(); },
        pad = function(num) { return ag.ui.tool.fmt.numpad(num, 2); },

        dateFn = {
                j : function(dateObj) { return numToString(dateObj.getUTCDate()); }, // Day of the month without leading zeros, 1 to 31
                d : function(dateObj) { return pad(dateObj.getUTCDate()); }, // Day of the month, 2 digits with leading zeros, 01 to 31

                w : function(dateObj) { return numToString(dateObj.getUTCDay()); }, // Numeric representation of the day of the week, 0 (for Sunday) through 6 (for Saturday)
                D : function(dateObj) { return dateTool.getWeekdayNamesShort()[dateObj.getUTCDay()]; }, // A textual representation of a day, three letters, Mon through Sun
                l : function(dateObj) { return dateTool.getWeekdayNames()[dateObj.getUTCDay()]; }, // A full textual representation of the day of the week Sunday through Saturday

                F : function(dateObj) { return dateTool.getMonthNames()[dateObj.getUTCMonth()]; }, // A full textual representation of a month, January through December
                M : function(dateObj) { return dateTool.getMonthNamesShort()[dateObj.getUTCMonth()]; }, // A short textual representation of a month, three letters, Jan through Dec
                n : function(dateObj) { return numToString(dateObj.getUTCMonth() + 1); }, // Numeric representation of a month, without leading zeros, 1 through 12
                m : function(dateObj) { return pad(dateObj.getUTCMonth() + 1); }, // Numeric representation of a month, with leading zeros, 01 through 12

                Y : function(dateObj) { return numToString(dateObj.getUTCFullYear()); }, // A full numeric representation of a year, 1999 or 2003
                y : function(dateObj) { return numToString(dateObj.getUTCFullYear()).substr(2); }, // A two digit representation of a year, 99 or 03

                H : function(dateObj) { return pad(dateObj.getUTCHours()); }, // 24-hour format of an hour with leading zeros, 00 through 23
                i : function(dateObj) { return pad(dateObj.getUTCMinutes()); }, // Minutes with leading zeros, 00 to 59
                s : function(dateObj) { return pad(dateObj.getUTCSeconds()); }, // Seconds, with leading zeros, 00 through 59
        };

    dateTool.getMonthNames = function()
    {
        return [ intl.t("January"), intl.t("February"), intl.t("March"),
                intl.t("April"), intl.t("May"), intl.t("June"),
                intl.t("July"), intl.t("August"), intl.t("September"),
                intl.t("October"), intl.t("November"), intl.t("December") ];
    };

    dateTool.getMonthNamesShort = function()
    {
        return [ intl.t("Jan"), intl.t("Feb"), intl.t("Mar"), intl.t("Apr"),
                intl.t("May"), intl.t("Jun"), intl.t("Jul"), intl.t("Aug"),
                intl.t("Sep"), intl.t("Oct"), intl.t("Nov"), intl.t("Dec") ];
    };

    dateTool.getWeekdayNames = function()
    {
        return [ intl.t("Sunday"), intl.t("Monday"), intl.t("Tuesday"),
                intl.t("Wednesday"), intl.t("Thursday"),
                intl.t("Friday"), intl.t("Saturday") ];
    };

    dateTool.getWeekdayNamesShort = function()
    {
        return [ intl.t("Sun"), intl.t("Mon"), intl.t("Tue"), intl.t("Wed"),
                intl.t("Thu"), intl.t("Fri"), intl.t("Sat") ];
    };

    dateTool.getFirstDayOfWeek = function()
    {
        return parseInt(intl.tc("0|first day of week; 0: Sunday, 1: Monday"));
    };

    dateTool.format = function(dateObj, string)
    {
        return string.split("").map(function(char){
            return dateFn[char] ? dateFn[char](dateObj) : char;
        }).join("");
    };

    ag.ui.tool.date = dateTool;
})();
