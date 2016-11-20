ag.ns("ag.ui.elem");

(function(){

var
    promptModal = function(question, resultCallback)
    {
        var
            self = this,
            body = ag.ui.tool.tpl("agitui-modal", ".prompt-modal div"),
            input = new ag.ui.field.Text(body.find("input"));

        ag.ui.elem.Modal.call(this);

        this.addClass("prompt-modal");

        body.find("p").text(question);
        body.find("form").submit(function(ev){
            ev.preventDefault();
            resultCallback(input.getValue());
            self.destroy();
        });

        this.elements.header.hide();
        this.elements.footer.hide();
        this.elements.visual.html(ag.ui.tool.tpl("agitui-modal", ".prompt-modal i"));
        this.elements.message.html(body);
    };

promptModal.prototype = Object.create(ag.ui.elem.Modal.prototype);

ag.ui.elem.PromptModal = promptModal;

})();