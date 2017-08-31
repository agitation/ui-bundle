ag.ns("ag.ui.ctxt");

ag.ui.ctxt.Container = function(elements) {
    var self = this;
    this.extend(this, $("<div class='container'>"));
    Object.keys(elements).forEach(function(key){ self.append(elements[key]); });
};

ag.ui.ctxt.Container.prototype = Object.create(jQuery.prototype);
