ag.ns("ag.ui.modal");

(function(){

var
    dialog = function()
    {
        var self = this;

        ag.ui.modal.Modal.call(this);

        this.addClass("dialog-modal")
            .html(ag.ui.tool.tpl("agitui-modal", ".dialog"));

        this.form = this.find("form").submit(function(ev) {
            ev.preventDefault();
            setTimeout(self.destroy.bind(self), 0); // setTimeout is needed, otherwise the submit event wouldn’t be triggered
        });
    };

dialog.prototype = Object.create(ag.ui.modal.Modal.prototype);

dialog.prototype.createButton = function(type)
{
    var self = this;

    // attention: do not bind form submission related events to the buttons; use this.form.submit() instead

    return ag.ui.tool.tpl("agitui-modal", "button." + type)
        .click(function(ev) {
            ev.stopPropagation();
            setTimeout(self.destroy.bind(self), 0); // setTimeout is needed, otherwise the submit event wouldn’t be triggered
        });
};

ag.ui.modal.Dialog = dialog;

})();