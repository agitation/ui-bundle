ag.ns("ag.ui.elem");

(function(){
var
    form = function(rows)
    {
        this.nodify();

        this.rows = rows;
        this.fields = {};

        var self = this, table = this.find("table");

        Object.keys(rows).forEach(function(name){
            self.fields[name] = rows[name].getField();
            table.append(rows[name]);
        });
    };

form.prototype = Object.create(ag.ui.ctxt.Form.prototype);

form.prototype.nodify = function()
{
    this.extend(this, ag.u.tpl("agitui-form", ".form"));
};

ag.ui.elem.Form = form;

})();
