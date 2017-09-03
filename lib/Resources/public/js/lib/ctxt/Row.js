ag.ns("ag.ui.ctxt");

ag.ui.ctxt.Row = function(elements) {
    this.extend(this, $("<div class='row'>"));
    this.addChildren(elements);
};

ag.ui.ctxt.Row.prototype = Object.create(ag.ui.ctxt.Element.prototype);
