ag.ns("ag.ui.layout.app");

(function(){
var
    header = function(title)
    {
        this.nodify();
        this.find("h1").text(title);
    };

header.prototype = Object.create(ag.ui.ctxt.Element.prototype);

header.prototype.nodify = function()
{
    this.extend(this, ag.ui.tool.tpl("agitui-layout-app", "header"));
};

ag.ui.layout.app.Header = header;

})();
