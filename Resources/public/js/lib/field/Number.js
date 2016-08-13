ag.ns("ag.ui.field");

(function(){
    var
        numberField = function(elem, attr)
        {
            this.extend(this, elem || $("<input class='form-control' data-type='int' type='number'>"));
            attr && this.attr(attr);
        };

    numberField.prototype = Object.create(ag.ui.field.NativeField.prototype);

    numberField.prototype.getValue = function()
    {
        var value = this.origVal();

        if (this.is("[data-type=float]"))
        {
            value = value.replace(",", ".");
            value = parseFloat(value);
        }
        else
        {
            value = parseInt(value);
        }

        if (isNaN(value))
         value = null;

        return value;
    };

    numberField.prototype.setValue = function(value)
    {
        if (isNaN(value))
         value = "";

        return this.origVal(value);
    };

    ag.ui.field.Number = numberField;
})();
