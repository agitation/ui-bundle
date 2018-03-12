ag.ns("ag.ui.modal");

(function(){

var Confirm = function(message, yesCallback, noCallback)
{
    this.destroyOnSubmit = true;
    ag.ui.modal.Dialog.call(this);

    this.find(".body").html(ag.u.tpl("agitui-modal", ".emph"))
        .addClass("confirm-modal");

    this.find(".visual").html(ag.u.tpl("agitui-modal", "i.question"));
    this.find(".message").html(message);

    this.find(".footer").append([
        this.createButton("cancel").click(noCallback),
        this.createButton("ok")
    ]);

    this.form.submit(yesCallback);
};

Confirm.prototype = Object.create(ag.ui.modal.Dialog.prototype);

ag.ui.modal.Confirm = Confirm;

})();
