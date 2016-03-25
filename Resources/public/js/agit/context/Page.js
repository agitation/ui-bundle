agit.ns("agit.context");

agit.context.Page = function(title, views, options)
{
    var
        defaultOptions = {},
        opts = $.extend(true, defaultOptions, options || {}),
        cache = new agit.context.Cache(),
        $page = agit.tool.tpl(".page");

    // default container, may be overwritten before calling $page.init()
    $page.container = $("main");

    $page.load = function(entities, settings)
    {
        return $page;
    };

    $page.getCache = function()
    {
        return cache;
    };

    $page.switchToView = function(view)
    {
        Object.keys(views).forEach(function(key) {
             views[key][key === view ? "show" : "hide"]();
        });
    };

    $page.init = function()
    {
        var
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
        stateManager.registerPageController($page);

        $page.find("h1").text(title);

        Object.keys(views).forEach(function(key) {
            $page.find(".views").append(views[key]);

            views[key].setPage && views[key].setPage($page);

            if (key === reqView || (!reqView && !visibleView))
            {
                views[key].show();
                visibleView = key;
            }
        });

        if (preloader)
            preloader.run(finishCallback)
        else
            finishCallback();

        $page.container.html($page);

        return $page;
    };

    return $page;
};
