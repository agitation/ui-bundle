agit.ns("agit.form");

agit.form.Form =
{
    stopEvent : function(ev)
    {
        if (ev.preventDefault)
            ev.preventDefault();
        else
            ev.returnValue = false;
    }
};
