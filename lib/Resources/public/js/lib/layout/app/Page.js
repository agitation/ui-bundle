ag.ns("ag.ui.layout.app");

(function(){
    var
        page = function(views)
        {
            ag.ui.ctxt.Page.call(this, views);
        };

    page.prototype = Object.create(ag.ui.ctxt.Page.prototype);

    ag.ui.layout.app.Page = page;
})();
