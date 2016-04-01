agit.ns("agit.context");

(function(){
    var
        defaultOptions = {},

        page = function(title, views, options)
        {
            this.extend(this, agit.tool.tpl(".page"));

            this.find("h1").text(title);

            this.opts = $.extend(true, defaultOptions, options || {}),
            this.cache = new agit.context.Cache(),
            this.views = views;
            this.container = $("main");
        };

    page.prototype = Object.create(jQuery.prototype);

    page.prototype.getCache = function()
    {
        return this.cache;
    };

    page.prototype.switchToView = function(view)
    {
        var self = this;

        Object.keys(this.views).forEach(function(key) {
             self.views[key][key === view ? "show" : "hide"]();
        });
    };

    page.prototype.initialize = function()
    {
        var
            self = this,
            visibleView,
            stateManager = agit.srv("state"),
            preloader = agit.srv("preloader"),
            indicator = agit.srv("indicator"),
            reqView = stateManager.getRequestedView(),

            finishCallback = function()
            {
                indicator.finish();
                stateManager.init();
            };

        indicator.start();
        stateManager.registerPageController(this);

        Object.keys(this.views).forEach(function(key) {
            self.find(".views").append(self.views[key]);

            self.views[key].setPage && self.views[key].setPage(self);

            if (key === reqView || (!reqView && !visibleView))
            {
                self.views[key].show();
                visibleView = key;
            }
        });

        if (preloader)
            preloader.run(finishCallback)
        else
            finishCallback();

        this.container.html(this);

        return this;
    };

    agit.context.Page = page;
})();
