ag.ns("ag.ui.ctxt");

(function(){
    var view = function()
    {
        this.extend(this, $("<div class='view'>"));
        this.append([].slice.call(arguments));
    };

    view.prototype = Object.create(jQuery.prototype);

    view.prototype.setPage = function(page)
    {
        this.page = page;
    };

    view.prototype.getPage = function()
    {
        return this.page;
    };

    ag.ui.ctxt.View = view;
})();
