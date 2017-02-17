ag.ns("ag.ui.field");

(function(){
    var
        integerField = function(elem, attr)
        {
            this.extend(this, elem || $("<input class='form-control' type='number'>"));
            attr && this.attr(attr);
        };

    integerField.prototype = Object.create(ag.ui.field.NativeField.prototype);

    integerField.prototype.getValue = function()
    {
        var value = parseInt(this.origVal());

        if (isNaN(value))
            value = null;

        return value;
    };

    integerField.prototype.setValue = function(value)
    {
        value = parseInt(value);

        if (isNaN(value))
            value = "";

        this.origVal(value).triggerHandler("ag.field.set");

        return this;
    };

    ag.ui.field.Integer = integerField;
})();
