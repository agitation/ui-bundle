ag.ns("ag.ui.field");

(function(){
    var
        numberField = function(elem, attr, formatter)
        {
            this.extend(this, elem || $("<input class='form-control' data-type='int' type='number'>"));
            attr && this.attr(attr);
            this.formatter = formatter;
        };

    numberField.prototype = Object.create(ag.ui.field.NativeField.prototype);

    numberField.prototype.getValue = function()
    {
        var value = this.origVal();

        value = (this.is("[data-type=float]")) ?
            parseFloat(value.replace(",", ".")) : parseInt(value);

        if (isNaN(value))
            value = null;

        return value;
    };

    numberField.prototype.setValue = function(value)
    {
        if (isNaN(value)) value = "";

        if (value && this.formatter)
            value = this.formatter(value);

        this.origVal(value).triggerHandler("ag.field.set");

        return this;
    };

    ag.ui.field.Number = numberField;
})();
