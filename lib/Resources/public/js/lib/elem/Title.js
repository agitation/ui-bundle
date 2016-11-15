ag.ns("ag.ui.elem");

(function(){

var title = function(text)
{
    this.nodify();
    this.setText(text);

    this.find(".show-nav").click(function(){
        ag.srv("menu").appear();
    });
};

title.prototype = Object.create(ag.ui.ctxt.Header.prototype);

title.prototype.nodify = function()
{
    this.extend(this, ag.ui.tool.tpl("agitui-page", ".title"));
};

title.prototype.setText = function(text)
{
    this.find("h1").text(text);
};

ag.ui.elem.Title = title;
})();
