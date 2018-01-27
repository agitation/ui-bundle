ag.ns("ag.ui.modal");

(function(){
var Modal = function()
{
    var self = this;

    this.extend(this, ag.ui.tool.tpl("agitui-modal", ".modal"));

    this.isVisible = false;
    this.appendTo($("body"));

    this.click(function(ev) {
        ev.stopPropagation();
    });

    this.keyup(function(ev) {
        if (ev.which === 27)
        self.disappear();
    });

    Modal.overlay.click(function(){
        if (Modal.stack[0] === self)
            self.disappear();
    });
};

Modal.prototype = Object.create(jQuery.prototype);

Modal.prototype.appear = function()
{
    if (!this.isVisible)
    {
        Modal.stack.unshift(this);
        Modal.overlay.appear();
        this.addClass("visible").focus();
        this.isVisible = true;
    }
};

Modal.prototype.disappear = function()
{
    if (this.isVisible)
    {
        Modal.stack.splice(Modal.stack.indexOf(this), 1);
        Modal.overlay.disappear();
        this.removeClass("visible");
        this.isVisible = false;
    }
};

Modal.prototype.destroy = function()
{
    this.disappear();
    this.remove();
};

Modal.overlay = new ag.ui.modal.ModalOverlay();
Modal.stack = [];

ag.ui.modal.Modal = Modal;

})();
