agit.ns("agit.common");

// DEPRECATED: use agit.context.Form
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
