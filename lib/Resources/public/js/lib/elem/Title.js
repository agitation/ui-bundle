ag.ns("ag.ui.elem");

(function(){

var title = function(text)
{
    this.nodify();
    text !== undefined && this.setText(text);
};

title.prototype = Object.create(ag.ui.ctxt.Header.prototype);

title.prototype.nodify = function()
{
    this.extend(this, ag.ui.tool.tpl("agitui-page", ".title"));
    this.textTarget = this.find("h1");
};

title.prototype.setText = function(text)
{
    this.titleText = text;
    this.textTarget.text(text);
};

title.prototype.getText = function()
{
    return this.titleText;
};

ag.ui.elem.Title = title;
})();
