ag.ns("ag.ui.modal");

(function(){

var text = function(content)
{
    ag.ui.modal.Display.call(this);
    this.addClass("text-modal");

    var
        self = this,
        container = ag.ui.tool.tpl("agitui-modal", ".longtext").html(content).scrollTop(this);

    this.addCloseButton(function() { container.scrollTop(self); });
    this.setContent(container);
};

text.prototype = Object.create(ag.ui.modal.Display.prototype);

ag.ui.modal.Text = text;
})();
