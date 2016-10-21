ag.ns("ag.ui.ctxt");

(function(){
    var
        pathRegex = new RegExp("^(/[a-z]+)+"),

        state = function()
        {
            this.currentState = {};
            this.broker = ag.srv("broker");

            $(window).on("hashchange", run.bind(this, false));
            run.call(this, true);
        },

        removeTrailingSlash = function(path)
        {
            if (path.charAt(path.length - 1) === "/")
                path = path.substr(0, path.length - 1);

            return path;
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

        run = function(isInit)
        {
            var
                state = parseState(location.hash.substr(2)),
                eventName = "ag.state." + (isInit ? "init" : "change");

            if (!state.path)
                state = parseState("");

            if (state.path === "" && !state.request)
                this.update("", "");

            this.currentState = state;
            this.broker.pub(eventName, state, this.createHash(state.path, state.request));
        };

    state.prototype.createHash = function(path, request)
    {
        path = removeTrailingSlash(path);

        var
            isDefaultAndEmpty = (path === "" && !request),
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

    state.prototype.getCurrentState = function()
    {
        return this.currentState;
    };

    state.prototype.switchTo = function(path, request)
    {
        location.hash = this.createHash(path, request);
    };

    state.prototype.update = function(path, request)
    {
        path = path !== null ? removeTrailingSlash(path) : this.currentState.path;

        var
            hash = this.createHash(path, request),
            newState = hash || location.pathname;

        history.replaceState(null, "", newState);
        this.broker.pub("ag.state.update", { path : path, request : request }, hash);
    };

    ag.ui.ctxt.State = state;
})();
