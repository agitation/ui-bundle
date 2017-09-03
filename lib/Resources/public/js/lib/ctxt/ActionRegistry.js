ag.ns("ag.ui.ctxt");

(function(){

var ActionRegistry = function()
{
    this.actions = {};
    ag.srv("broker").pub("ag.state.action", this.register.bind(this));
};

ActionRegistry.prototype.getActions = function()
{
    return this.actions;
};

ActionRegistry.prototype.register = function(element, callback)
{
    if (element instanceof ag.ui.ctxt.Element && element.getName())
    {
        var viewProto = ag.ui.ctxt.View,
            view = element instanceof viewProto ? element : element.findAncestor(viewProto);

        if (view)
            this.actions[view.getName()] = callback;
    }
};

ag.ui.ctxt.ActionRegistry = ActionRegistry;

})();
