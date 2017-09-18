$(document).ready(function(){
    var
        page = new ag.ui.ctxt.Page({
            reset : new ag.ui.ctxt.View({
                h : new ag.ui.elem.Title(ag.intl.t("Authorization required")),
                main : new ag.ui.ctxt.Container({
                    msg : new ag.ui.elem.Callout(ag.intl.t("Please log in to view this page."), "warning")
                })
            })
        });

    page.initialize();
});
