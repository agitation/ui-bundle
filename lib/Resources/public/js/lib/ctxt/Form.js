ag.ns("ag.ui.ctxt");

(function(){
var
    form = function(fields)
    {
        this.fields = fields;
    };

form.prototype = Object.create(ag.ui.ctxt.Block.prototype);

form.prototype.setValues = function(values)
{
    Object.keys(values).forEach(function(key) {
        this.fields[key].setValue(values[key]);
    });

    return this;
};

form.prototype.getValues = function()
{
    var values = {};

    Object.keys(this.fields).forEach(function(name) {
        values[name] = this.fields[name].getValue();
    });

    return values;
};

ag.ui.ctxt.Form = form;

})();
