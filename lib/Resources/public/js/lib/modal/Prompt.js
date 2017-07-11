ag.ns("ag.ui.modal");

(function(){

var
    prompt = function(question, resultCallback)
    {
        ag.ui.modal.Dialog.call(this);
        this.addClass("prompt-modal");

        var
            self = this,
            body = ag.ui.tool.tpl("agitui-modal", ".prompt"),
            input = new ag.ui.field.Text(body.find("input"));

        body.find("p").text(question);

        body.find("form").submit(function(ev){
            ev.preventDefault();
            resultCallback(input.getValue());
            self.destroy();
        });

        this.find(".visual").html(ag.ui.tool.tpl("agitui-modal", "i.question"));
        this.find(".message").html(body);
    };

prompt.prototype = Object.create(ag.ui.modal.Dialog.prototype);

ag.ui.modal.Prompt = prompt;

})();
