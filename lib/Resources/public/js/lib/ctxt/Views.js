ag.ns("ag.ui.ctxt");

(function(){

var Views = function(views)
{
    var self = this;

    this.extend(this, ag.ui.tool.tpl("agitui-page", ".views"));
    this.addChildren(views, false);
    this.broker = ag.srv("broker");
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
        var view = views[key],
        isSelected = (key === viewName);

        if (isSelected)
        {
            view.appendTo(self);
            self.broker.pub("ag.view.activated", view);
        }
        else
        {
            view.detach();
            self.broker.pub("ag.view.deactivated", view);
        }

        view.setState(isSelected);
    });


};

ag.ui.ctxt.Views = Views;

})();
