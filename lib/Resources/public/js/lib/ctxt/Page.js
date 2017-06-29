ag.ns("ag.ui.ctxt");

(function(){

var
    page = function(views)
    {
        var self = this;

        this.nodify();

        this.views = views;
        this.actions = {};
        this.defaultPath = "";
        this.stateMgr = ag.srv("state");
        this.titleElem = $("title");
        this.baseTitle = this.titleElem.text();

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
    var action = this.actions[state.path === "" ? this.defaultPath : state.path];

    if (!action)
    {
        if (this.ignoreInvalidState)
        {
            action = this.actions[this.defaultPath];
            this.switchToView(action.view);
            action.callback();
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

        this.switchToView(action.view);
        action.callback(state.request);
    }
};

page.prototype.switchToView = function(view)
{
    var views = this.views, self = this;

    Object.keys(views).forEach(function(key) {
        var isSelected = (views[key] === view);

        if (isSelected)
        {
            view.appendTo(self);
            var title = view.getTitle();

            if (title)
            {
                self.titleElem.text(self.baseTitle + " › " + title);
            }
        }
        else
        {
            views[key].detach();
        }

         views[key].setState(isSelected);
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
    ag.srv("broker").pub("ag.ui.page.init");
};

// some pages don’t care about the state, while it must be left unaltered (e.g. login pages)
page.prototype.ignoreInvalidState = false;

ag.ui.ctxt.Page = page;

})();
