ag.ns("ag.ui.layout.app");

(function(){
    var
        page = function(views)
        {
            ag.ui.ctxt.Page.call(this, views);
            this.container = "body";
        };

    page.prototype = Object.create(ag.ui.ctxt.Page.prototype);

    page.prototype.nodify = function()
    {
        this.extend(this, ag.ui.tool.tpl("agitui-layout-app", "main"));
    };

    ag.ui.layout.app.Page = page;
})();
