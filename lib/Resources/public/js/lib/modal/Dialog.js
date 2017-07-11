ag.ns("ag.ui.modal");

(function(){

var
    dialog = function()
    {
        ag.ui.modal.Modal.call(this);
        this.addClass("dialog-modal");
        this.html(ag.ui.tool.tpl("agitui-modal", ".dialog"));
    };

dialog.prototype = Object.create(ag.ui.modal.Modal.prototype);

dialog.prototype.createButton = function(type, callback)
{
    var self = this;

    return ag.ui.tool.tpl("agitui-modal", "button." + type)
        .click(function(ev) {
            ev.stopPropagation();
            self.destroy();
            callback && callback();
        });
};

ag.ui.modal.Dialog = dialog;

})();
