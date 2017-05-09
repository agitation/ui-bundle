ag.ns("ag.ui.ctxt");

(function(){
    var block = function(content, classes)
    {
        this.extend(this, content).addClass(classes);
    };

    block.prototype = Object.create(ag.ui.ctxt.Element.prototype);

    block.prototype.setView = function(view)
    {
        this.view = view;
    };

    block.prototype.getView = function()
    {
        return this.view;
    };

    /**
     * This method can be overriden and then return a callback. If a callback is
     * returned, the state manager will switch to this block's view and execute
     * the callback as soon as the path is requested.
     */
    block.prototype.getAction = function() {};

    ag.ui.ctxt.Block = block;
})();
