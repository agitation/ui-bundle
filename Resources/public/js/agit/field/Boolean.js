agit.ns("agit.field");

(function(){
    var boolField = function(labelText)
    {
        this.extend(this, agit.tool.tpl("agitui-form", ".boolean"));
        this.find("span").text(labelText);
        this.$input = new agit.field.Checkbox(this.find("input"));
    };

    boolField.prototype = Object.create(agit.field.Field.prototype);

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

    agit.field.Boolean = boolField;
})();
