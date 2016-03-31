agit.ns("agit.common");

(function(){
    var pad = function(num, len)
    {
        return agit.tool.fmt.numpad(num, len || 2);
    };

    agit.common.Day = function(day, month, year)
    {
        this.d = day;
        this.m = month; // NOTE: This is the natural month number, i.e. Jan => 1, ...
        this.y = year;
    };

    agit.common.Day.prototype.toString = function()
    {
        return pad(this.y, 4) + "-" + pad(this.m) + "-" + pad(this.d);
    };

    agit.common.Day.prototype.format = function(fmt)
    {
        var date = new Date(this.y, this.m - 1, this.d);
        return agit.tool.date.format(date, fmt);
    };
})();
