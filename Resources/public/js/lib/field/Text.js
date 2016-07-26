ag.ns("ag.ui.field");

ag.ui.field.Text = function($elem, attr)
{
    this.extend(this, $elem || $("<input type='text' class='form-control'>"));
    attr && this.attr(attr);
};

ag.ui.field.Text.prototype = Object.create(ag.ui.field.Field.prototype);
