ag.ns("ag.ui.field");

(function(){
    var boolField = function(labelText)
    {
        this.extend(this, ag.ui.tool.tpl("agitui-form", ".boolean"));
        this.find("span").text(labelText);
        this.$input = new ag.ui.field.Checkbox(this.find("input"));
    };

    boolField.prototype = Object.create(ag.ui.field.Field.prototype);

    boolField.prototype.setTargetId = function(id)
    {
        this.$input.attr("id", id);
    };

    boolField.prototype.setValue = function(value)
    {
        this.$input.setValue(value);
        return this;
    };

    boolField.prototype.getValue = function()
    {
        return this.$input.getValue();
    };

    ag.ui.field.Boolean = boolField;
})();
