ag.ns("ag.ui.modal");

(function(){

var
    alert = function(message, type, closeCallback)
    {
        ag.ui.modal.Dialog.call(this);
        this.addClass("alert-modal");
        type = type || "error";

        this.find(".visual").html(ag.ui.tool.tpl("agitui-modal", ".alert-modal i." + type));
        this.find(".message").html(message);
        this.find(".footer").html(this.createButton("ok", closeCallback));
    };

alert.prototype = Object.create(ag.ui.modal.Dialog.prototype);

ag.ui.modal.Alert = alert;

})();
