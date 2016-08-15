ag.ns("ag.ui.field");

(function(){
    var field = function(){};

    field.prototype = Object.create(ag.ui.ctxt.Element.prototype);

    // set ID on a focusable element so it can be used as label target
    field.prototype.setTargetId = function(id) { };

    // set the value of the field programmatically
    field.prototype.setValue = function(value) { };

    // get the value of the field
    field.prototype.getValue = function() { };

    // make this field unavailable for input
    field.prototype.disable = function() { };

    // make this field available for input again
    field.prototype.enable = function() { };

    // reset the field to a neutral state
    field.prototype.clear = function() { };

    ag.ui.field.Field = field;
})();
