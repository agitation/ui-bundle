ag.ns("ag.ui.ctxt");

ag.ui.ctxt.Container = function(elements) {
    this.extend(this, $("<div class='container'>"));
    this.addChildren(elements);
};

ag.ui.ctxt.Container.prototype = Object.create(ag.ui.ctxt.Element.prototype);
