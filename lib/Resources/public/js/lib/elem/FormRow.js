ag.ns("ag.ui.elem");

(function(){
var
    formRow = function(label, field, description, optional)
    {
        this.nodify();

        this.field = field;

        this.find("th label").text(label);
        this.find("td .field").html(field);

        description && this.find("td .description").html(description);
        optional || this.find("th .optional").remove();
    };

formRow.prototype = Object.create(ag.ui.ctxt.Element.prototype);

formRow.prototype.nodify = function()
{
    this.extend(this, ag.ui.tool.tpl("agitui-form", ".api-form-row"));
};

formRow.prototype.getField = function()
{
    return this.field;
};

ag.ui.elem.FormRow = formRow;
})();
