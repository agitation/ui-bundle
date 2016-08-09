ag.ns("ag.ui.field");

ag.ui.field.Password = function(elem, attr)
{
    ag.ui.field.Text.apply(this, arguments);
    this.attr("type", "password");
};

ag.ui.field.Password.prototype = Object.create(ag.ui.field.Text.prototype);
