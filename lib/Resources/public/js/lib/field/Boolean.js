ag.ns("ag.ui.field");

(function(){
    var
        fieldCounter = 0,

        boolField = function(labelText)
        {
            var fieldId = "ag-ui-field-boolean-" + fieldCounter++;

            this.extend(this, ag.ui.tool.tpl("agitui-form", ".boolean"));
            this.find("label").text(labelText).attr("for", fieldId);
            this.input = new ag.ui.field.Checkbox(this.find("input").attr("id", fieldId));
        };

    boolField.prototype = Object.create(ag.ui.field.ComplexField.prototype);

    boolField.prototype.setTargetId = function(id)
    {
        this.input.attr("id", id);
    };

    boolField.prototype.setValue = function(value)
    {
        this.input.setValue(value);
        return this.triggerHandler("ag.field.set");
    };

    boolField.prototype.getValue = function()
    {
        return this.input.getValue();
    };

    boolField.prototype.disable = function()
    {
        ag.ui.field.ComplexField.prototype.disable.call(this);
        this.input.disable();
    };

    boolField.prototype.enable = function()
    {
        ag.ui.field.ComplexField.prototype.enable.call(this);
        this.input.enable();
    };

    ag.ui.field.Boolean = boolField;
})();
