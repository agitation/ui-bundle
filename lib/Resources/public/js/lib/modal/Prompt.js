ag.ns("ag.ui.modal");

(function(){

var
    prompt = function(question, resultCallback)
    {
        this.destroyOnSubmit = true;
        ag.ui.modal.Dialog.call(this);

        this.find(".body").html(ag.ui.tool.tpl("agitui-modal", ".emph"))
            .addClass("prompt-modal");

        var
            self = this,
            form = ag.ui.tool.tpl("agitui-modal", ".prompt"),
            input = new ag.ui.field.Text(form.find("input"));

        form.find(".msg").text(question);

        this.form.submit(function(ev){
            ev.preventDefault();
            resultCallback(input.getValue());
            self.destroy();
        });

        this.find(".visual").html(ag.ui.tool.tpl("agitui-modal", "i.question"));
        this.find(".message").html(form);
    };

prompt.prototype = Object.create(ag.ui.modal.Dialog.prototype);

ag.ui.modal.Prompt = prompt;

})();
