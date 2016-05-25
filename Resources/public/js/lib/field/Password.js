ag.ns("ag.ui.field");

ag.ui.field.Password = function($elem, attr)
{
    this.extend(this, $elem || $("<input type='password' class='form-control'>"));
    attr && this.attr(attr);
};

ag.ui.field.Password.prototype = Object.create(ag.ui.field.Field.prototype);
