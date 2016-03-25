agit.ns("agit.field");

(function(){
    var
        numberField = function($elem, attr)
        {
            this.extend(this, $elem || $("<input class='form-control' data-type='int' type='number'>"));
            attr && this.attr(attr);
        };

    numberField.prototype = Object.create(agit.field.Field.prototype);

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

        return value;
    };

    agit.field.Number = numberField;
})();
