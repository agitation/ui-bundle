ag.ns("ag.ui.tool");

(function(){

var numToString = function(num) { return num.toString(); },
    pad = function(num) { return ag.u.numpad(num, 2); },

    dateFn =
    {
        j : function(dateObj) { return numToString(dateObj.getUTCDate()); }, // Day of the month without leading zeros, 1 to 31
        d : function(dateObj) { return pad(dateObj.getUTCDate()); }, // Day of the month, 2 digits with leading zeros, 01 to 31

        w : function(dateObj) { return numToString(dateObj.getUTCDay()); }, // Numeric representation of the day of the week, 0 (for Sunday) through 6 (for Saturday)
        D : function(dateObj) { return ag.u.date.getWeekdayNamesShort()[dateObj.getUTCDay()]; }, // A textual representation of a day, three letters, Mon through Sun
        l : function(dateObj) { return ag.u.date.getWeekdayNames()[dateObj.getUTCDay()]; }, // A full textual representation of the day of the week Sunday through Saturday

        F : function(dateObj) { return ag.u.date.getMonthNames()[dateObj.getUTCMonth()]; }, // A full textual representation of a month, January through December
        M : function(dateObj) { return ag.u.date.getMonthNamesShort()[dateObj.getUTCMonth()]; }, // A short textual representation of a month, three letters, Jan through Dec
        n : function(dateObj) { return numToString(dateObj.getUTCMonth() + 1); }, // Numeric representation of a month, without leading zeros, 1 through 12
        m : function(dateObj) { return pad(dateObj.getUTCMonth() + 1); }, // Numeric representation of a month, with leading zeros, 01 through 12

        Y : function(dateObj) { return numToString(dateObj.getUTCFullYear()); }, // A full numeric representation of a year, 1999 or 2003
        y : function(dateObj) { return numToString(dateObj.getUTCFullYear()).substr(2); }, // A two digit representation of a year, 99 or 03

        H : function(dateObj) { return pad(dateObj.getUTCHours()); }, // 24-hour format of an hour with leading zeros, 00 through 23
        i : function(dateObj) { return pad(dateObj.getUTCMinutes()); }, // Minutes with leading zeros, 00 to 59
        s : function(dateObj) { return pad(dateObj.getUTCSeconds()); }, // Seconds, with leading zeros, 00 through 59
    };

ag.u.date =
{
    format : function(dateObj, string)
    {
        return string.split("").map(function(char){
            return dateFn[char] ? dateFn[char](dateObj) : char;
        }).join("");
    },

    getMonthNames : function()
    {
        return [ ag.intl.t("January"), ag.intl.t("February"), ag.intl.t("March"),
                ag.intl.t("April"), ag.intl.t("May"), ag.intl.t("June"),
                ag.intl.t("July"), ag.intl.t("August"), ag.intl.t("September"),
                ag.intl.t("October"), ag.intl.t("November"), ag.intl.t("December") ];
    },

    getMonthNamesShort : function()
    {
        return [ ag.intl.t("Jan"), ag.intl.t("Feb"), ag.intl.t("Mar"), ag.intl.t("Apr"),
                ag.intl.t("May"), ag.intl.t("Jun"), ag.intl.t("Jul"), ag.intl.t("Aug"),
                ag.intl.t("Sep"), ag.intl.t("Oct"), ag.intl.t("Nov"), ag.intl.t("Dec") ];
    },

    getWeekdayNames : function()
    {
        return [ ag.intl.t("Sunday"), ag.intl.t("Monday"), ag.intl.t("Tuesday"),
                ag.intl.t("Wednesday"), ag.intl.t("Thursday"),
                ag.intl.t("Friday"), ag.intl.t("Saturday") ];
    },

    getWeekdayNamesShort : function()
    {
        return [ ag.intl.t("Sun"), ag.intl.t("Mon"), ag.intl.t("Tue"), ag.intl.t("Wed"),
                ag.intl.t("Thu"), ag.intl.t("Fri"), ag.intl.t("Sat") ];
    },

    getFirstDayOfWeek : function()
    {
        return parseInt(ag.intl.x("first day of week; 0: Sunday, 1: Monday", "0"));
    }
}

})();
