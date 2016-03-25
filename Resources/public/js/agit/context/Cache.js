agit.ns("agit.context");

agit.context.Cache = function()
{
    var values = {};

    this.set = function(key, value)
    {
        values[key] = value;
    };

    this.get = function(key)
    {
        return values[key];
    };

    this.clear = function()
    {
        values = {};
    };
};
