ag.ns("ag.ui.modal");

(function(){

var display = function()
{
    ag.ui.modal.Modal.call(this);
    this.addClass("display-modal").html("<div class='content'>");
};

display.prototype = Object.create(ag.ui.modal.Modal.prototype);

display.prototype.addCloseButton = function(callback)
{
    var self = this;

    this.prepend(ag.ui.tool.tpl("agitui-modal", ".modal-close").click(function(){
        self.disappear();
        callback && callback();
    }));
};

display.prototype.setContent = function(content)
{
    this.find(".content").html(content);
};

ag.ui.modal.Display = display;

})();
