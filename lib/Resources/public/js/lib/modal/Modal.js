ag.ns("ag.ui.modal");

(function(){
    var
        // share one overlay among all modals
        overlay = new ag.ui.elem.Overlay(),

        modal = function()
        {
            this.extend(this, ag.ui.tool.tpl("agitui-modal", ".modal"));

            this.isVisible = false;
            this.overlay = overlay;

            this.click(function(ev) {
                ev.stopPropagation();
            });

            this.appendTo($("body"));
        };

    modal.prototype = Object.create(jQuery.prototype);

    modal.prototype.appear = function()
    {
        if (!this.isVisible)
        {
            this.overlay.appear();
            this.addClass("visible").focus();
            this.isVisible = true;
        }
    };

    modal.prototype.disappear = function()
    {
        if (this.isVisible)
        {
            this.overlay.disappear();
            this.removeClass("visible");
            this.isVisible = false;
        }
    };

    modal.prototype.destroy = function()
    {
        this.disappear();
        this.remove();
    };

    ag.ui.modal.Modal = modal;
})();
