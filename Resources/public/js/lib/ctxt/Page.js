ag.ns("ag.ui.ctxt");

(function(){
    var
        defaultOptions = {},

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

        page = function(title, views)
        {
            this.extend(this, ag.ui.tool.tpl("agitui-page", ".page"));

            this.find("h1").text(title);

            this.cache = new ag.ui.ctxt.Cache(),
            this.views = views || {};
            this.container = $("main");
        };

    page.prototype = Object.create(ag.ui.ctxt.Element.prototype);

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

    page.prototype.initialize = function()
    {
        var
            self = this,
            stateManager = ag.srv("state"),
            preloader = ag.srv("preloader"),
            indicator = ag.srv("indicator");

        stateManager.registerPageController(this);
        registerViews(stateManager, this.views);

        Object.keys(this.views).forEach(function(key) {
            self.find(".views").append(self.views[key]);
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

        this.container.html(this);

        return this;
    };

    ag.ui.ctxt.Page = page;
})();
