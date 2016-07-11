ag.ns("ag.ui.ctxt");

(function(){
    var
        pathRegex = new RegExp("^(/[a-z]+)+"),

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
                requestString = decodeURIComponent(currentPath.substr(path.length + 1)), // length + 1 because of trailing slash
                request;

            try {
                request = JSON.parse(requestString);
            }
            catch(err) {
                request = requestString;
            }

            return {
                path : path,
                request : request
            };
        },

        run = function()
        {
            var
                state = getState(location.hash.substr(2)),
                action;

            if (!state.path || !this.actions[state.path])
                state = getState(this.defaultPath);

            if (state.path === this.defaultPath && !state.request)
                this.update(this.defaultPath, "");

            action = this.actions[state.path];

            if (action)
            {
                this.pageController.switchToView(action.view);
                action.callback(state.request);
                updateHreflangLinks.call(this, createHash(state.path, state.request));
                this.currentPath = state.path;
            }
        },

        state = function()
        {
            this.pageController = null;
            this.views = {};
            this.actions = {};
            this.defaultPath = "";
            this.currentPath = "";
            this.altLinks = $("[rel=alternate][hreflang]");
        };


    state.prototype.registerView = function(name, view)
    {
        this.views[name] = view;
    };

    state.prototype.registerAction = function(path, view, callback, isDefault)
    {
        path = removeTrailingSlash(path);

        if (!path.match(pathRegex))
            throw new SyntaxError("Path " + path + " doesn’t match the required pattern.");

        this.actions[path] = { view : view, callback : callback };
        isDefault && (this.defaultPath = path);
    };

    state.prototype.registerPageController = function(pageCtl)
    {
        this.pageController = pageCtl;
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

        if (!this.defaultPath)
        {
            var views = Object.keys(this.views);

            if (views.length)
                this.pageController.switchToView(this.views[views[0]])
        }
    };

    ag.ui.ctxt.State = state;
})();
