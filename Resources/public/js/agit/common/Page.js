agit.ns("agit.common");

agit.common.Page = function(title, $views, options)
{
    var
        $page = agit.common.Template.get(".page"),
        defaultOptions = {},
        opts = $.extend(true, defaultOptions, options || {});

    $page.load = function(entities, settings)
    {
        return $page;
    };

    $page.switchToView = function(view)
    {
        Object.keys($views).forEach(function(key) {
             $views[key][key === view ? "show" : "hide"]();
        });
    };

    $page.init = function()
    {
        var
            visibleView,
            stateManager = agit.srv("state"),
            reqView = stateManager.getRequestedView();

        agit.srv("indicator").start();
        stateManager.registerPageController($page);

        $page.find("h1").text(title);

        Object.keys($views).forEach(function(key) {
            $page.find(".views").append($views[key]);

            if (key === reqView || (!reqView && !visibleView))
            {
                $views[key].show();
                visibleView = key;
            }
        });

        agit.srv("preloader").run(function(){
            agit.srv("indicator").finish();
            stateManager.init();
        });

        return $page;
    };

    return $page;
};