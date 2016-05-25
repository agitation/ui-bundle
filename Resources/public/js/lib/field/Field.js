ag.ns("ag.ui.field");

(function(){
    var field = function(){};

    field.prototype = Object.create(jQuery.prototype);

    field.prototype.origVal = field.prototype.val;

    // ATTENTION: When overriding .setValue() and .getValue(), make sure to use
    // .origVal() instead of .val(), or you will create circular dependencies!

    field.prototype.setValue = function(value)
    {
        return this.origVal(value);
    };

    field.prototype.getValue = function()
    {
        return this.origVal();
    };

    // overriding .val() for consistency with jQuery
    field.prototype.val = function(value)
    {
        return (value === undefined)
            ? this.getValue()
            : this.setValue(value);
    };

    field.prototype.setTargetId = function(id)
    {
        return this.attr("id", id);
    };

    field.prototype.disable = function()
    {
        return this.attr("disabled", "disabled");
    };

    field.prototype.enable = function()
    {
        return this.attr("disabled", false);
    };

    field.prototype.clear = function()
    {
        return this.filter("input[type=text], input[type=password], input[type=number], textarea").setValue("");
    };

    ag.ui.field.Field = field;
})();
