ag.ns("ag.ui.ctxt");

(function(){

var Views = function(views)
{
    this.extend(this, ag.ui.tool.tpl("agitui-page", ".views"));
    this.addChildren(views, false);
    this.broker = ag.srv("broker");
    this.stateMgr = ag.srv("state");
    this.actions = {};

    var self = this,
        actionRegistry = new ag.ui.ctxt.ActionRegistry(),
        regActions = actionRegistry.getActions();

    Object.keys(views).forEach(function(viewName){
        var actionPath = "/" + viewName;

        self.actions[actionPath] = {
            view : viewName,
            callback : regActions[viewName] || null
        };

        self.defaultPath = self.defaultPath || actionPath;
    });

    this.broker.sub("ag.page.init", function(){
        stateChange.call(self, self.stateMgr.getCurrentState());
    });

    this.broker.sub("ag.state.change", stateChange.bind(this));
},

stateChange = function(state)
{
    var action = this.actions[state.path === "" ? this.defaultPath : state.path];

    if (!action)
    {
        if (this.ignoreInvalidState)
        {
            action = this.actions[this.defaultPath];
            this.switchTo(action.view);
            action.callback && action.callback();
        }
        else
        {
            this.stateMgr.switchTo("");
        }
    }
    else
    {
        if (state.path === this.defaultPath)
        {
            // default path was explicitely written instead of being empty. redirect to the canonical hash
            this.stateMgr.update("", state.request);
        }

        this.switchTo(action.view);
        action.callback && action.callback(state.request);
    }
};

Views.prototype = Object.create(ag.ui.ctxt.Element.prototype);

Views.prototype.getViews = function()
{
    return this._children;
};

Views.prototype.getView = function(name)
{
    return this._children[name];
};

Views.prototype.switchTo = function(viewName)
{
    var views = this._children, self = this;

    Object.keys(views).forEach(function(key) {
        var view = views[key],
        isSelected = (key === viewName);

        if (isSelected)
        {
            view.appendTo(self);
            self.broker.pub("ag.view.activated", view);
        }
        else
        {
            view.detach();
            self.broker.pub("ag.view.deactivated", view);
        }

        view.setState(isSelected);
    });


};

// some pages don’t care about the state, while it must be left unaltered (e.g. login pages)
Views.prototype.ignoreInvalidState = false;

ag.ui.ctxt.Views = Views;

})();
