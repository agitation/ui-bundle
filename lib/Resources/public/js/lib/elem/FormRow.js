ag.ns("ag.ui.elem");

(function(){
var
    formRow = function(label, field)
    {
        this.nodify();
        this.field = field;
        this.find("th label").text(label);
        this.find("td").html(field);
    };

formRow.prototype = Object.create(jQuery.prototype);

formRow.prototype.nodify = function()
{
    this.extend(this, ag.u.tpl("agitui-form", ".form-row"));
};

formRow.prototype.getField = function()
{
    return this.field;
};

ag.ui.elem.FormRow = formRow;
})();
