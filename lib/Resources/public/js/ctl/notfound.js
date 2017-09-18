$(document).ready(function(){
    var
        page = new ag.ui.ctxt.Page({
            reset : new ag.ui.ctxt.View({
                h : new ag.ui.elem.Title(ag.intl.t("Page not found")),
                main : new ag.ui.ctxt.Container({
                    msg : new ag.ui.elem.Callout(ag.intl.t("The requested page could not be found. Please check the spelling of the address, or notify the owner of the referring web page."), "warning")
                })
            })
        });

    page.initialize();
});
