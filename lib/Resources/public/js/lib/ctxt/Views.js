ag.ns("ag.ui.ctxt");

(function(){

var Views = function(views)
{
    var self = this;

    this.extend(this, ag.ui.tool.tpl("agitui-page", ".views"));
    this.addChildren(views, false);
};

Views.prototype = Object.create(ag.ui.ctxt.Element.prototype);

Views.prototype.getViews = function()
{
    return this._children;
};

Views.prototype.getView = function(name)
{
    return this._children[name];
};

Views.prototype.switchTo = function(viewName)
{
    var views = this._children, self = this;

    Object.keys(views).forEach(function(key) {
        var isSelected = (key === viewName);

        if (isSelected)
        {
            views[key].appendTo(self);
        }
        else
        {
            views[key].detach();
        }

        views[key].setState(isSelected);
    });
};

ag.ui.ctxt.Views = Views;

})();
