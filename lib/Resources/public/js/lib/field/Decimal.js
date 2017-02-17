ag.ns("ag.ui.field");

(function(){
    var
        decimalField = function(elem, attr, formatter)
        {
            ag.ui.field.Integer.call(this, elem, attr);
            this.formatter = formatter;
        };

    decimalField.prototype = Object.create(ag.ui.field.Integer.prototype);

    decimalField.prototype.getValue = function()
    {
        var value = parseFloat(this.origVal().replace(",", "."));

        if (isNaN(value))
            value = null;

        return value;
    };

    decimalField.prototype.setValue = function(value)
    {
        value = parseFloat(value);

        if (isNaN(value))
            value = "";

        if (value && this.formatter)
            value = this.formatter(value);

        this.origVal(value).triggerHandler("ag.field.set");

        return this;
    };

    ag.ui.field.Decimal = decimalField;
})();
