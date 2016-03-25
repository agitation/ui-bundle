agit.ns("agit.field");

(function(){
    var checkboxField = function($elem, attr)
    {
        this.extend(this, $elem || $("<input type='checkbox' class='form-control'>"));
        attr && this.attr(attr);
    };

    checkboxField.prototype = Object.create(agit.field.Field.prototype);

    checkboxField.prototype.setValue = function(value)
    {
        return this.prop("checked", (!value || value === "0") ? false : true);
    };

    checkboxField.prototype.getValue = function()
    {
        return this.is(":checked");
    };

    agit.field.Checkbox = checkboxField;
})();
