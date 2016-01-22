agit.ns("agit.widget");

agit.widget.Indicator = function()
{
    this.start = function() {};

    this.finish = function(callback)
    {
        callback && callback();
    };
};
