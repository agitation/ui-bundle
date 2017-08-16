ag.ns("ag.ui.modal");

(function(){

var
    alert = function(message, type, closeCallback)
    {
        type = type || "error";
        ag.ui.modal.Dialog.call(this);

        this.find(".body").html(ag.ui.tool.tpl("agitui-modal", ".emph"))
            .addClass("alert-modal");

        this.find(".visual").html(ag.ui.tool.tpl("agitui-modal", "i." + type));
        this.find(".message").html(message);
        this.find(".footer").html(this.createButton("ok"));
        this.form.submit(closeCallback);
    };

alert.prototype = Object.create(ag.ui.modal.Dialog.prototype);

ag.ui.modal.Alert = alert;

})();
