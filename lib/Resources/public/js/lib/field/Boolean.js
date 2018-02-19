ag.ns("ag.ui.field");

(function(){

var fieldCounter = 0,

    BooleanField = function(labelText)
    {
        var fieldId = "ag-ui-field-boolean-" + fieldCounter++;

        this.extend(this, ag.ui.tool.tpl("agitui-form", ".boolean"));
        this.find("label").text(labelText).attr("for", fieldId);
        this.input = new ag.ui.field.Checkbox(this.find("input").attr("id", fieldId));
    };

BooleanField.prototype = Object.create(ag.ui.field.ComplexField.prototype);

BooleanField.prototype.setTargetId = function(id)
{
    this.input.attr("id", id);
    return this;
};

BooleanField.prototype.getTargetId = function()
{
    return this.input.attr("id");
};

BooleanField.prototype.setValue = function(value)
{
    this.input.setValue(value);
    this.triggerHandler("ag.field.set");
    return this;
};

BooleanField.prototype.getValue = function()
{
    return this.input.getValue();
};

BooleanField.prototype.disable = function()
{
    ag.ui.field.ComplexField.prototype.disable.call(this);
    this.input.disable();
};

BooleanField.prototype.enable = function()
{
    ag.ui.field.ComplexField.prototype.enable.call(this);
    this.input.enable();
};

ag.ui.field.Boolean = BooleanField;

})();
