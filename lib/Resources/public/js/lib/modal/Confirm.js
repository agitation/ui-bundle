ag.ns("ag.ui.modal");

(function(){

var
    confirm = function(message, yesCallback, noCallback)
    {
        ag.ui.modal.Dialog.call(this);
        this.addClass("confirm-modal");

        this.find(".visual").html(ag.ui.tool.tpl("agitui-modal", "i.question"));
        this.find(".message").html(message);

        this.find(".footer").append([
            this.createButton("cancel", noCallback),
            this.createButton("ok", yesCallback)
        ]);
    };

confirm.prototype = Object.create(ag.ui.modal.Dialog.prototype);

ag.ui.modal.Confirm = confirm;

})();
