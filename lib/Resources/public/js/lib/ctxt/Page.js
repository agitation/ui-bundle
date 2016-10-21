ag.ns("ag.ui.ctxt");

(function(){

var
    pageInitEvent = "ag.page.init",

    page = function(views)
    {
        var self = this;

        this.nodify();

        this.views = views;
        this.actions = {};
        this.defaultPath = "";
        this.stateMgr = ag.srv("state");

        Object.keys(views).forEach(function(vName){
            var
                view = views[vName],
                actions = view.getActions(),
                actionNames = Object.keys(actions),
                path = "/" + vName;

            actionNames.forEach(function(aName){
                // if there is only one action for this view, we use the
                // view’s name as path. otherwise we must add the block name.
                var aPath = actionNames.length === 1 ? path : path + "/" + aName;

                self.actions[aPath] = { view : view, callback : actions[aName] };
                self.defaultPath = self.defaultPath || aPath;
            });

            self.append(view.hide());
            view.setPage(self);
        });

        ag.srv("broker").sub("ag.state.change", this.stateChange.bind(this));
    };

page.prototype = Object.create(ag.ui.ctxt.Element.prototype);

page.prototype.nodify = function()
{
    this.extend(this, $("main")).empty();
};

page.prototype.stateChange = function(state)
{
    var action = this.actions[state.path || this.defaultPath];

    if (!action)
    {
        // invalid path
        this.stateMgr.switchTo("");
    }
    else if (state.path === this.defaultPath)
    {
        // default path was explicitely written instead of being empty
        this.stateMgr.switchTo("", state.request);
    }
    else
    {
        this.switchToView(action.view);
        action.callback(state.request);
    }
};

page.prototype.switchToView = function(view)
{
    var views = this.views;

    Object.keys(views).forEach(function(key) {
        var isSelected = (views[key] === view);
         views[key][isSelected ? "show" : "hide"]();
         views[key].setStatus(isSelected);
    });
};

// find views by a reference to their prototype
page.prototype.getViews = function(proto)
{
    var
        allViews = this.views,
        foundViews = {};

    Object.keys(allViews).forEach(function(name) {
        if (allViews[name] instanceof proto)
            foundViews[name] = allViews[name];
    });

    return foundViews;
};

// gets a single view by a reference to its prototype
page.prototype.getView = function(proto)
{
    var
        foundViews = this.getViews(proto),
        keys = Object.keys(foundViews);

    return keys.length ? foundViews[keys[0]] : undefined;
};

page.prototype.initialize = function()
{
    this.stateChange(this.stateMgr.getCurrentState());
};

ag.ui.ctxt.Page = page;

})();
