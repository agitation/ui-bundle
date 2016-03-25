agit.ns("agit.field");

agit.field.Text = function($elem, attr)
{
    this.extend(this, $elem || $("<input class='form-control'>"));
    attr && this.attr(attr);
};

agit.field.Text.prototype = Object.create(agit.field.Field.prototype);
