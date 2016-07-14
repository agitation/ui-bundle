ag.ns("ag.ui.elem");

(function(){
    var
        textModal = function(content)
        {
            ag.ui.elem.Modal.call(this);

            var
                self = this,
                container = ag.ui.tool.tpl("agitui-modal", ".textmodal-content").html(content),
                closeBtn = ag.ui.tool.tpl("agitui-modal", ".textmodal-close").click(function(){
                    self.elements.main.scrollTop(self);
                    self.disappear();
                });

            this.elements.header.replaceWith(closeBtn);
            this.elements.main.replaceWith(container);
            this.elements.header = closeBtn;
            this.elements.main = container;

            this.elements.footer.remove();

            this.addClass("textmodal");
            this.elements.main.scrollTop(this);
        };



    textModal.prototype = Object.create(ag.ui.elem.Modal.prototype);

    ag.ui.elem.TextModal = textModal;
})();
