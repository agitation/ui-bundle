ag.ns("ag.ui.ctxt");

(function(){

var Page = function(navigation, views)
{
    var self = this;

    this.nav = navigation;
    this.views = views;

    this.nodify();
    this.addChildren({ nav : navigation, views : views });
};

Page.prototype = Object.create(ag.ui.ctxt.Element.prototype);

Page.prototype.nodify = function()
{
    this.extend(this, $("main")).empty();
};

Page.prototype.initialize = function()
{
    ag.srv("broker").pub("ag.page.init");
};

ag.ui.ctxt.Page = Page;

})();
