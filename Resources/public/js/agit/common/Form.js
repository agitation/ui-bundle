agit.ns("agit.common");

agit.common.Form =
{
    stopEvent : function(ev)
    {
        if (ev.preventDefault)
            ev.preventDefault();
        else
            ev.returnValue = false;
    }
};
