ag.ns("ag.ui.field");

// A native field is a field which corresponds to a HTML form element, such as
// input, textarea, select.
//
// Important: Native fields must be able to "take over" an existing
// form element. The first parameter of a native field’s constructor must
// accept a reference to a DOM object. If the parameter is fals-y, the native
// field shall create an element on the fly.

(function(){
    var nativeField = function() { };

    nativeField.prototype = Object.create(ag.ui.field.Field.prototype);

    nativeField.prototype.origVal = nativeField.prototype.val;

    // ATTENTION: When overriding .setValue() or .getValue(), don’t use jQuery’s
    // .val() method inside them, but use .origVal() instead. Otherwise you will
    // create circular dependencies.

    nativeField.prototype.setValue = function(value)
    {
        this.origVal(value);
        return this.triggerHandler("ag.field.set");
    };

    nativeField.prototype.getValue = function()
    {
        return this.origVal();
    };

    // overriding .val() for consistency with jQuery
    nativeField.prototype.val = function(value)
    {
        return (value === undefined) ? this.getValue() : this.setValue(value);
    };

    nativeField.prototype.setTargetId = function(id)
    {
        return this.attr("id", id);
    };

    nativeField.prototype.disable = function()
    {
        return this.attr("disabled", "disabled");
    };

    nativeField.prototype.enable = function()
    {
        return this.attr("disabled", false);
    };

    nativeField.prototype.clear = function()
    {
        return this.filter("input[type=text], input[type=password], input[type=number], textarea").setValue("");
    };

    ag.ui.field.NativeField = nativeField;
})();
