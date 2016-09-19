ag.ns("ag.ui.field");

(function(){
    var checkboxField = function(elem, attr)
    {
        this.extend(this, elem || $("<input type='checkbox' class='form-control'>"));
        attr && this.attr(attr);
    };

    checkboxField.prototype = Object.create(ag.ui.field.NativeField.prototype);

    checkboxField.prototype.setValue = function(value)
    {
        this.prop("checked", (!value || value === "0") ? false : true);
        return this.triggerHandler("ag.field.set");
    };

    checkboxField.prototype.getValue = function()
    {
        return this.is(":checked");
    };

    ag.ui.field.Checkbox = checkboxField;
})();
