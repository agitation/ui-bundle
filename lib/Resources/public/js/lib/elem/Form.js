ag.ns("ag.ui.elem");

(function(){
var
    form = function(rows, endpoint, callback)
    {
        this.nodify();
        this.rows = rows;
        this.endpoint = endpoint;
        this.callback = callback;

        var tfoot = this.find("tfoot");

        Object.keys(rows).forEach(function(key) { tfoot.before(rows[key]); });

        this.on("submit", this.onSubmitHandler.bind(this));
    };

form.prototype = Object.create(ag.ui.ctxt.Form.prototype);

form.prototype.nodify = function()
{
    this.extend(this, ag.ui.tool.tpl("agitui-form", ".api-form"));
};

form.prototype.onSubmitHandler = function(ev)
{
    var values = {}, self = this;

    Object.keys(self.rows).forEach(function(key) {
        values[key] = self.rows[key].getField().getValue();
    });

    // If this.callback is defined, we assume that this.endpoint is the endpoint
    // name and this.callback is the result callback. Otherwise, we will use
    // this.endpoint as callback to do the API request itself.

    if (this.callback === undefined)
        this.endpoint(values);
    else
        ag.srv("api").doCall(this.endpoint, values, this.callback);

    ev.preventDefault();
};

ag.ui.elem.Form = form;

})();
