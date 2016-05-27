ag.ns("ag.ui.ctxt");

(function(){
    var
        form = function($elem, attr)
        {
            this.extend(this, $elem || $("<form role='form' action='' method='' autocomplete='off'>"));
            this.attr(attr || {});
            this.fields = {};

            this.on("submit", this.stopEvent);
        };

    form.prototype = Object.create(jQuery.prototype);

    form.prototype.addField = function(key, field)
    {
        this.fields[key] = field;
    };

    form.prototype.stopEvent = function(ev)
    {
            if (ev.preventDefault)
                ev.preventDefault();
            else
                ev.returnValue = false;
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
