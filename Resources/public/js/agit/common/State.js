agit.ns("agit.common");

agit.common.State = function()
{
    // The state manager is a simple implementation for state-aware single-page
    // applications. It allows view elements to register and have a callback
    // executed when the URL hash changes to a certain value.

    var
        pageController,
        elements = {},
        pathRegex = new RegExp("^/[a-z]+/[a-z]+"),
        defaultPath = "",
        currentPath = "",

        createHash = function(path, request)
        {
            var
                locPath = "#!" + path,
                requestString;

            if (request instanceof Array || request instanceof Object)
            {
                requestString = JSON.stringify(request);
            }
            else if (request !== undefined)
            {
                requestString = new String(request);
            }

            return locPath + (requestString !== undefined ? "/" + requestString : "");
        },

        getState = function()
        {
            var
                path = pathRegex.test(currentPath) ? currentPath.match(pathRegex)[0] : "",
                pathComponents = path.substr(1).split('/'),
                requestString = decodeURIComponent(currentPath.substr(path.length + 1)), // length + 1 because of trailing slash
                request,
                state =
                {
                    path : null,
                    view : null,
                    module : null,
                    request : null
                };

            if (pathComponents.length === 2)
            {
                state.path = path,
                state.view = pathComponents[0],
                state.module = pathComponents[1]
            };

            try
            {
                state.request = JSON.parse(requestString);
            }
            catch(err)
            {
                state.request = requestString;
            }

            return state;
        },

        run = function()
        {
            currentPath = location.hash.substr(0, 2) === "#!" ? location.hash.substr(2) : defaultPath;

            var state = getState();

            if (state.path && elements[state.path])
            {
                pageController.switchToView(state.view);
                elements[state.path](state.request);
            }
        };

    this.registerViewElement = function(path, callback, isDefault)
    {
        if (!path.match(pathRegex))
            throw new SyntaxError("path doesn’t match the required pattern.");

        elements[path] = callback;
        isDefault && (defaultPath = path);
    };

    this.registerPageController = function(pageCtl)
    {
        pageController = pageCtl;
    };

    this.getRequestedView = function()
    {
        return getState().view;
    };

    this.switchTo = function(path, request)
    {
        location.hash = createHash(path, request)
    };

    this.update = function(path, request)
    {
        history.replaceState(null, "", createHash(path, request));
    };

    // should be called by the page controller after all preparations
    // (e.g. preloader calls) are finished.
    this.init = function()
    {
        run();
        $(window).on('hashchange', run);
    };

};
