agit.ns("agit.common");

(function(){
    var
        today,

        pad = function(num, len)
        {
            return agit.tool.fmt.numpad(num, len || 2);
        };

    agit.common.Day = function(year, month, day)
    {
        today = today || new Date();

        this.d = day || today.getDate();
        this.m = month || today.getMonth() + 1;
        this.y = year || today.getFullYear();
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
