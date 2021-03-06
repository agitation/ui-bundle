ag.ns("ag.ui.field");

// A complex field is an arbitrary DOM element which acts as field and can be
// used in contexts where ag.ui.field.Field objects are expected.

(function(){
    var complexField = function(){};

    complexField.prototype = Object.create(ag.ui.field.Field.prototype);

    complexField.prototype.disable = function()
    {
        this.disabled = true;
        this.addClass("disabled");
    };

    complexField.prototype.enable = function()
    {
        this.disabled = false;
        this.removeClass("disabled");
    };

    ag.ui.field.ComplexField = complexField;
})();
