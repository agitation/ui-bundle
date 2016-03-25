agit.ns("agit.field");

agit.field.Password = function($elem, attr)
{
    this.extend(this, $elem || $("<input type='password' class='form-control'>"));
    attr && this.attr(attr);
};

agit.field.Password.prototype = Object.create(agit.field.Field.prototype);
