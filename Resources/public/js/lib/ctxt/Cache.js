ag.ns("ag.ui.ctxt");

(function(){
    var cache = function()
    {
        this.clear();
    };

    cache.prototype.set = function(key, value)
    {
        this.values[key] = value;
    };

    cache.prototype.get = function(key)
    {
        return this.values[key];
    };

    cache.prototype.clear = function()
    {
        this.values = {};
    };

    ag.ui.ctxt.Cache = cache;
})();
