ag.ns("ag.ui.elem");

(function(){

var
    confirmModal = function(message, yesCallback, noCallback)
    {
        var self = this;

        ag.ui.elem.Modal.call(this);

        this.addClass("confirm-modal");

        this.elements.header.hide();
        this.elements.visual.html(ag.ui.tool.tpl("agitui-modal", ".confirm-modal i"));
        this.elements.message.html(message);

        this.okBtn = ag.ui.tool.tpl("agitui-modal", ".confirm-modal button.ok");
        this.cancelBtn = ag.ui.tool.tpl("agitui-modal", ".confirm-modal button.cancel");

        this.okBtn.click(function(){
            self.destroy();
            yesCallback && yesCallback();
        });

        this.cancelBtn.click(function(){
            self.destroy();
            noCallback && noCallback();
        });

        this.elements.footer.append([this.cancelBtn, this.okBtn]);
    };

confirmModal.prototype = Object.create(ag.ui.elem.Modal.prototype);

ag.ui.elem.ConfirmModal = confirmModal;

})();
