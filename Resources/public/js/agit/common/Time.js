agit.ns("agit.common");

(function(){
    var

        pad = function(num)
        {
            return agit.tool.fmt.numpad(num, 2);
        };

    agit.common.Time = function(hourOrString, minute)
    {
        if (typeof(hourOrString) === "string")
        {
            this.fromString(hourOrString);
        }
        else
        {
            var now = minute === undefined ? null : new Date();

            this.h = hourOrString || now.getUTCHours();
            this.m = minute === undefined ? now.getUTCMinutes() : minute;
        }
    };

    agit.common.Time.prototype.toNumber = function()
    {
        return this.h * 1000 + this.m;
    };

    agit.common.Time.prototype.toString = function()
    {
        return pad(this.h) + ":" + pad(this.m);
    };

    // expects a string such as "15:24"
    agit.common.Time.prototype.fromString = function(value)
    {
        var parts = value.split(":").map(function(part){ return parseInt(part); });

        if (parts[0] >= 0 && parts[0] <= 23 && parts[1] >= 0 && parts[1] <= 59)
        {
            this.h = parts[0];
            this.m = parts[1];
        }
    };

    agit.common.Time.prototype.format = function(fmt)
    {
        var date = new Date(new Date(Date.UTC(1970, 0, 1, this.h, this.m, 0)));
        return agit.tool.date.format(date, fmt);
    };

    agit.common.Time.prototype.compare = function(time)
    {
        var
            t1 = this.toNumber(),
            t2 = time.toNumber(),
            ret = 0;

        if      (t1 > t2)   ret = 1;
        else if (t1 < t2)   ret = -1;

        return ret;
    };
})();
