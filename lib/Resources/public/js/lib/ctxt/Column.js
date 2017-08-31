ag.ns("ag.ui.ctxt");

ag.ui.ctxt.Column = function(classes, elements) { // classes are bootstrap column classes, e.g. col-sm-4 or col-md-8
    var self = this;
    this.extend(this, $("<div class='" + classes + "'>"));
    Object.keys(elements).forEach(function(key){ self.append(elements[key]); });

};

ag.ui.ctxt.Column.prototype = Object.create(jQuery.prototype);
