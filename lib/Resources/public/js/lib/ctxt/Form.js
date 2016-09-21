ag.ns("ag.ui.ctxt");

(function(){
    var
        form = function($elem, attr)
        {
            this.extend(this, $elem || $("<form role='form' action='' method='' autocomplete='off'>"));
            this.attr(attr || {});
            this.fields = {};
        };

    form.prototype = Object.create(ag.ui.ctxt.Block.prototype);

    form.prototype.addField = function(key, field)
    {
        this.fields[key] = field;
    };

    form.prototype.getValues = function()
    {
        var
            self = this,
            values = {};

        Object.keys(this.fields).forEach(function(key){
            values[key] = self.fields[key].getValue();
        });

        return values;
    };

    form.prototype.setValues = function(values)
    {
        var self = this;

        Object.keys(values).forEach(function(key){
            self.fields[key].setValue(values[key]);
        });

        return this;
    };

    ag.ui.ctxt.Form = form;
})();
