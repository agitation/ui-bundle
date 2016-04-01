agit.ns("agit.common");

(function(){
    var
        today,

        pad = function(num, len)
        {
            return agit.tool.fmt.numpad(num, len || 2);
        };

    agit.common.Day = function(yearOrString, month, day)
    {
        today = today || new Date();

        if (typeof(yearOrString) === "string")
        {
            this.fromString(yearOrString);
        }
        else
        {
            this.d = day || today.getDate();
            this.m = month || today.getMonth() + 1;
            this.y = yearOrString || today.getFullYear();
        }
    };

    agit.common.Day.prototype.toNumber = function()
    {
        return this.y * 10000 + this.m * 100 + this.d;
    };

    agit.common.Day.prototype.toString = function()
    {
        return pad(this.y, 4) + "-" + pad(this.m) + "-" + pad(this.d);
    };

    // expects a string such as "2020-12-30"
    agit.common.Day.prototype.fromString = function(value)
    {
        var parts = value.split("-").map(function(part){ return parseInt(part); });

        if (parts[0] >= 1900 && parts[0] <= 2100 && parts[1] >= 1 && parts[1] <= 12 && parts[2] >= 1 && parts[2] <= 31)
        {
            this.y = parts[0];
            this.m = parts[1];
            this.d = parts[2];
        }
    };

    agit.common.Day.prototype.format = function(fmt)
    {
        var date = new Date(this.y, this.m - 1, this.d);
        return agit.tool.date.format(date, fmt);
    };

    agit.common.Day.prototype.compare = function(day)
    {
        var
            d1 = this.toNumber(),
            d2 = day.toNumber(),
            ret = 0;

        if      (d1 > d2)   ret = 1;
        else if (d1 < d2)   ret = -1;

        return ret;
    };
})();
