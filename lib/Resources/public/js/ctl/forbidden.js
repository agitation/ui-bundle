$(document).ready(function(){
    var
        page = new ag.ui.ctxt.Page({
            reset : new ag.ui.ctxt.View({
                h : new ag.ui.elem.Title(ag.intl.t("Forbidden")),
                main : new ag.ui.ctxt.Container({
                    msg : new ag.ui.elem.Callout(ag.intl.t("You are not allowed to access this page. Please contact an administrator to upgrade your privileges."), "warning")
                })
            })
        });

    page.initialize();
});
