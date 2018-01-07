ag.ns("ag.ui.elem");

(function(){

var Navigation = function(items)
{
    var self = this;

    this.extend(this, ag.ui.tool.tpl("agitui-page", ".nav"));
    this.addChildren(items, false);

    var container = this.find(".items"),
        showNav = this.showNav.bind(this),
        hideNav = this.hideNav.bind(this);

    Object.keys(items).forEach(function(k){
        container.append(items[k]);
    });

    this.find(".caption").text($("title").text());

    this.find(".control a").click(showNav);
    this.find(".olay").click(hideNav);
    ag.srv("broker").sub("ag.state.change", hideNav);
};

Navigation.prototype = Object.create(ag.ui.ctxt.Header.prototype);

Navigation.prototype.showNav = function()
{
    this.addClass("open");
};

Navigation.prototype.hideNav = function()
{
    this.removeClass("open");
};

ag.ui.elem.Navigation = Navigation;

})();
