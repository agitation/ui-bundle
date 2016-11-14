$(document).ready(function(){
    var
        page = new ag.ui.ctxt.Page({
            reset : new ag.ui.ctxt.View({
                h : new ag.ui.elem.Title(ag.intl.t("Authorization required")),
                msg : new ag.ui.elem.Callout(ag.intl.t("Please log in to view this page."), "warning")
            })
        });

    page.initialize();
});
