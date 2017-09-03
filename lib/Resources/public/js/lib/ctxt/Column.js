ag.ns("ag.ui.ctxt");

ag.ui.ctxt.Column = function(classes, elements) { // classes are bootstrap column classes, e.g. col-sm-4 or col-md-8
    this.extend(this, $("<div class='" + classes + "'>"));
    this.addChildren(elements);
};

ag.ui.ctxt.Column.prototype = Object.create(ag.ui.ctxt.Element.prototype);
