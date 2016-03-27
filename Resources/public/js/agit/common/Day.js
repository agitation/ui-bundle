agit.ns("agit.common");

agit.common.Day = function(day, month, year)
{
    var
        pad = function(num, len)
        {
            return agit.tool.fmt.numpad(num, len || 2);
        };

    this.d = day;
    this.m = month; // NOTE: This is the natural month number, i.e. Jan => 1, ...
    this.y = year;

    this.toString = function()
    {
        return pad(this.y, 4) + "-" + pad(this.m) + "-" + pad(this.d);
    };
};