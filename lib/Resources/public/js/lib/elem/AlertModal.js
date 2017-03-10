ag.ns("ag.ui.elem");

(function(){

var
    alertModal = function(message, type, closeCallback)
    {
        var self = this;

        type = type || "error";

        ag.ui.elem.Modal.call(this);

        this.addClass("alert-modal");

        this.elements.header.hide();
        this.elements.visual.html(ag.ui.tool.tpl("agitui-modal", ".alert-modal i." + type));
        this.elements.message.html(message);

        this.okBtn = ag.ui.tool.tpl("agitui-modal", ".alert-modal button")
            .click(function(ev){
                ev.stopPropagation();
                self.destroy();
                closeCallback && closeCallback();
            });

        this.elements.footer.append(this.okBtn);
    };

alertModal.prototype = Object.create(ag.ui.elem.Modal.prototype);

ag.ui.elem.AlertModal = alertModal;

})();
