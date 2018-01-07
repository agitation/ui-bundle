ag.ns("ag.ui.ctxt");

(function(){

var Page = function(navigation, views)
{
    var self = this;

    this.nav = navigation;
    this.views = views;

    this.nodify();
    this.addChildren({ nav : navigation, views : views });

    this.stateMgr = ag.srv("state");
    this.broker = ag.srv("broker");
    this.titleElem = $("title");
    this.baseTitle = this.titleElem.text();

    var actionRegistry = new ag.ui.ctxt.ActionRegistry(),
        regActions = actionRegistry.getActions();

    this.actions = {};

    Object.keys(views.getViews()).forEach(function(viewName){
        var actionPath = "/" + viewName;

        self.actions[actionPath] = {
            view : viewName,
            callback : regActions[viewName] || null
        };

        self.defaultPath = self.defaultPath || actionPath;
    });

    this.broker.sub("ag.state.change", this.stateChange.bind(this));
};

Page.prototype = Object.create(ag.ui.ctxt.Element.prototype);

Page.prototype.nodify = function()
{
    this.extend(this, $("main")).empty();
};

Page.prototype.stateChange = function(state)
{
    var action = this.actions[state.path === "" ? this.defaultPath : state.path];

    if (!action)
    {
        if (this.ignoreInvalidState)
        {
            action = this.actions[this.defaultPath];
            this.views.switchTo(action.view);
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

        this.views.switchTo(action.view);
        action.callback && action.callback(state.request);
    }

    action &&
        action.view &&
        this.titleElem.text(this.baseTitle + " › " + this.views.getView(action.view).getTitle());
};

Page.prototype.initialize = function()
{
    this.stateChange(this.stateMgr.getCurrentState());
    this.broker.pub("ag.ui.page.init");
};

// some pages don’t care about the state, while it must be left unaltered (e.g. login pages)
Page.prototype.ignoreInvalidState = false;

ag.ui.ctxt.Page = Page;

})();
