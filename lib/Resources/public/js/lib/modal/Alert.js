ag.ns("ag.ui.modal");

(function(){

var Alert = function(message, type, closeCallback)
{
    this.destroyOnSubmit = true;
    ag.ui.modal.Dialog.call(this);

    this.find(".body").html(ag.u.tpl("agitui-modal", ".emph"))
        .addClass("alert-modal");

    this.find(".visual").html(ag.u.tpl("agitui-modal", "i." + (type || "error")));
    this.find(".message").html(message);
    this.find(".footer").html(this.createButton("ok"));
    this.form.submit(closeCallback);
};

Alert.prototype = Object.create(ag.ui.modal.Dialog.prototype);

ag.ui.modal.Alert = Alert;

})();
