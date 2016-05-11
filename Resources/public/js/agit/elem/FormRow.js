agit.ns("agit.elem");

(function(){
    var formRow = function(key, label, $field, options)
    {
        this.extend(this, agit.tool.tpl("agitui-form", ".api-form tbody tr"));

        options = options || {};
        options.optional || this.find("th .optional").remove();

        this.$field = $field;
        this.key = key;

        this.find("th label").text(label);
        this.find("td").html($field);
    };

    formRow.prototype = Object.create(jQuery.prototype);

    formRow.prototype.setValue = function(value)
    {
        this.$field.setValue(value);
        return this;
    };

    formRow.prototype.getValue = function()
    {
        return this.$field.getValue();
    };



    formRow.prototype.getName = function()
    {
        return this.key;
    };

    agit.elem.FormRow = formRow;
})();
