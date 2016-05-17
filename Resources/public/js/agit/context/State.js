agit.ns("agit.context");

(function(){
    var
        pathRegex = new RegExp("^/[a-z]+/[a-z]+"),

        removeTrailingSlash = function(path)
        {
            if (path.charAt(path.length - 1) === "/")
                path = path.substr(0, path.length - 1);

            return path;
        },

        createHash = function(path, request)
        {
            path = removeTrailingSlash(path);

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

        updateHreflangLinks = function(newState)
        {
            this.altLinks.each(function(){
                var
                    $link = $(this),
                    href = $link.attr("href").split("#")[0];

                $link.attr("href", href + newState);
            });
        },

        getState = function(currentPath)
        {
            var
                path = pathRegex.test(currentPath) ? currentPath.match(pathRegex)[0] : "",
                pathComponents = path.substr(1).split("/"),
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
            var state = getState(location.hash.substr(2));

            if (!state.path || !this.views[state.path])
                state = getState(this.defaultPath);

            if (state.path === this.defaultPath && !state.request)
                this.update(this.defaultPath, "");

            this.currentPath = state.path;

            if (this.views[state.path])
            {
                this.pageController.switchToView(state.view);
                this.views[state.path](state.request);
                updateHreflangLinks.call(this, createHash(state.path, state.request));
            }
        },

        state = function()
        {
            this.pageController = null;
            this.views = {};
            this.defaultPath = "";
            this.currentPath = "";
            this.altLinks = $("[rel=alternate][hreflang]");
        };

    state.prototype.registerViewElement = function(path, callback, isDefault)
    {
        path = removeTrailingSlash(path);

        if (!path.match(pathRegex))
            throw new SyntaxError("Path " + path + " doesn’t match the required pattern.");

        this.views[path] = callback;
        isDefault && (this.defaultPath = path);
    };

    state.prototype.registerPageController = function(pageCtl)
    {
        this.pageController = pageCtl;
    };

    state.prototype.getRequestedView = function()
    {
        return getState(this.currentPath).view;
    };

    state.prototype.switchTo = function(path, request)
    {
        location.hash = createHash(path, request);
    };

    state.prototype.update = function(path, request)
    {
        path = removeTrailingSlash(path);

        var
            isDefaultAndEmpty = (path === this.defaultPath && !request),
            hash = createHash(path, request),
            newState = isDefaultAndEmpty
                ? location.pathname
                : hash

        history.replaceState(null, "", newState);
        updateHreflangLinks.call(this, hash);
    };

    // to be called by the page controller after preparations (e.g. preloader calls).
    state.prototype.init = function()
    {
        run.call(this);
        $(window).on("hashchange", run.bind(this));
    };

    agit.context.State = state;
})();
