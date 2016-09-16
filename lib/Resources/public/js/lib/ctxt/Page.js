ag.ns("ag.ui.ctxt");

(function(){
    var
        registerViews = function(stateManager, views)
        {
            // the first action of the first view is by definition the default one
            var defaultAction;

            Object.keys(views).forEach(function(vName){

                var
                    view = views[vName],
                    actions = view.getActions(),
                    actionNames = Object.keys(actions),
                    path = "/" + vName;

                stateManager.registerView(vName, view);

                actionNames.forEach(function(aName){
                    // if there is only one action for this view, we use the
                    // view’s name as path. otherwise we must add the block name.
                    var aPath = actionNames.length === 1 ? path : path + "/" + aName;

                    stateManager.registerAction(aPath, view, actions[aName], !defaultAction);

                    defaultAction = true;
                });
            });
        },

        page = function(views)
        {
            this.cache = new ag.ui.ctxt.Cache();
            this.views = views || {};
            this.container = "main"; // can be changed before initialize()
        };

    page.prototype = Object.create(ag.ui.ctxt.Element.prototype);

    page.prototype.nodify = function()
    {
        this.extend(this, $(this.container));
    };

    page.prototype.getCache = function()
    {
        return this.cache;
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
        var
            self = this,
            stateManager = ag.srv("state"),
            preloader = ag.srv("preloader"),
            indicator = ag.srv("indicator");

        this.nodify();

        stateManager.registerPageController(this);
        registerViews(stateManager, this.views);

        Object.keys(this.views).forEach(function(key) {
            self.append(self.views[key].hide());
            self.views[key].setPage && self.views[key].setPage(self);
        });

        if (preloader)
        {
            indicator.start();

            preloader.run(function() {
                indicator.finish();
                stateManager.init();
            });
        }
        else
        {
            stateManager.init();
        }

        return this;
    };

    ag.ui.ctxt.Page = page;
})();
