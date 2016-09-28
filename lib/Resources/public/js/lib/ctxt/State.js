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

        updateHreflangLinks = function(newState)
        {
            this.altLinks.each(function(){
                var
                    $link = $(this),
                    href = $link.attr("href").split("#")[0];

                $link.attr("href", href + newState);
            });
        },

        parseState = function(reqPath)
        {
            var
                path = pathRegex.test(reqPath) ? reqPath.match(pathRegex)[0] : "",
                requestString = decodeURIComponent(reqPath.substr(path.length + 1)), // length + 1 because of question mark
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
                state = parseState(location.hash.substr(2)),
                action;

            if (!state.path || !this.actions[state.path])
                state = parseState(this.defaultPath);

            if (state.path === this.defaultPath && !state.request)
                this.update(this.defaultPath, "");


            action = this.actions[state.path];
            this.currentState = { path: this.defaultPath, request: null };

            if (action)
            {
                this.pageController.switchToView(action.view);
                action.callback(state.request);
                updateHreflangLinks.call(this, this.createHash(state.path, state.request));
                this.currentState = state;
            }
        },

        state = function()
        {
            this.pageController = null;
            this.views = {};
            this.actions = {};
            this.currentState = {};
            this.defaultPath = "";
            this.altLinks = $("[rel=alternate][hreflang]");
        };

    state.prototype.createHash = function(path, request)
    {
        path = removeTrailingSlash(path);

        var
            isDefaultAndEmpty = (path === this.defaultPath && !request),
            locPath = "#!" + path,
            requestString,
            hash = "";

        if (!isDefaultAndEmpty)
        {
            if (request instanceof Array || request instanceof Object)
            {
                requestString = JSON.stringify(request);
            }
            else if (request !== undefined)
            {
                requestString = String(request);
            }

            hash = locPath + (requestString !== undefined ? "?" + requestString : "");
        }

        return hash;
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
        location.hash = this.createHash(path, request);
    };

    state.prototype.getCurrentState = function()
    {
        return this.currentState;
    };

    state.prototype.update = function(path, request)
    {
        path = path !== null ? removeTrailingSlash(path) : this.currentState.path;

        var
            hash = this.createHash(path, request),
            newState = hash || location.pathname;

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
                this.pageController.switchToView(this.views[views[0]]);
        }
    };

    ag.ui.ctxt.State = state;
})();
