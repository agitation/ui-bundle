ag.ns("ag.ui.field");

(function(){
    var
        decimalField = function(elem, attr, formatter)
        {
            ag.ui.field.Text.call(this, elem, attr);
            this.formatter = formatter;
            this.addClass("decimal");
        };

    decimalField.prototype = Object.create(ag.ui.field.Text.prototype);

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
        else if (value !== null && this.formatter)
            value = this.formatter(value);

        this.origVal(value).triggerHandler("ag.field.set");

        return this;
    };

    ag.ui.field.Decimal = decimalField;
})();
