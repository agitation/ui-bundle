ag.ns("ag.ui.elem");

(function(){
    var
        // share overlay among all modals
        overlay = new ag.ui.elem.Overlay(),

        modal = function()
        {
            this.extend(this, ag.ui.tool.tpl("agitui-modal", ".modal"));

            this.isVisible = false;
            this.overlay = overlay;

            this.elements = {
                header : this.find(".header"),

                // keep in mind that .main is "display: table"
                // if you don't need it as such, hide/remove/replace it
                main : this.find(".main"),
                visual : this.find(".main .visual"),
                message : this.find(".main .message"),
                footer : this.find(".footer")
            };

            this.appendTo($("body"));
        };

    modal.prototype = Object.create(ag.ui.ctxt.Element.prototype);

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

    modal.prototype.getArea = function(area)
    {
            return this.elements[area];
    };

    ag.ui.elem.Modal = modal;
})();
