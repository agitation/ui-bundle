ag.ns("ag.ui.ctxt");

(function(){
    var block = function()
    {
    };

    block.prototype = Object.create(jQuery.prototype);

    block.prototype.setView = function(view)
    {
        this.view = view;
    };

    block.prototype.getView = function()
    {
        return this.view;
    };

    ag.ui.ctxt.Block = block;
})();
