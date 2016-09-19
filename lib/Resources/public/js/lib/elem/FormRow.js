ag.ns("ag.ui.elem");

(function(){
    var formRow = function(key, label, $field, options)
    {
        this.extend(this, ag.ui.tool.tpl("agitui-form", ".api-form tbody tr"));

        options = options || {};
        options.optional || this.find("th .optional").remove();

        this.$field = $field;
        this.key = key;

        this.find("th label").text(label);
        this.find("td").html($field);
    };

    formRow.prototype = Object.create(ag.ui.ctxt.Element.prototype);

    formRow.prototype.setValue = function(value)
    {
        this.$field.setValue(value);
        return this.triggerHandler("ag.field.set");
    };

    formRow.prototype.getValue = function()
    {
        return this.$field.getValue();
    };



    formRow.prototype.getName = function()
    {
        return this.key;
    };

    ag.ui.elem.FormRow = formRow;
})();
