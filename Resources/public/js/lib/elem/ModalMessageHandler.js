ag.ns("ag.ui.elem");

(function(){
    var msgH = function()
    {
        var self = this;

        this.modal = new ag.ui.elem.Modal();
        this.modal.addClass("message-modal");
        this.modal.getArea("header").remove();

        var button = ag.ui.tool.tpl("agitui-msg-modal", "button")
            .click(function(){ self.modal.disappear(); });

        this.modal.getArea("footer").html(button);
    };

    msgH.prototype = Object.create(ag.common.MessageHandler.prototype);

    msgH.prototype.showMessage = function(message)
    {
        this.modal.getArea("visual").html(ag.ui.tool.tpl("agitui-msg-modal", "i." + message.getType()));
        this.modal.getArea("message").html(message.getText());
        this.modal.appear();
    };

    ag.ui.elem.ModalMessageHandler = msgH;
})();
