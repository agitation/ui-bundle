ag.ns("ag.ui.elem");

(function(){
    var
        modal = function()
        {
            this.extend(this, ag.ui.tool.tpl("agitui-modal", ".modal"));

            this.isVisible = false;
            this.overlay = ag.ui.elem.Overlay;

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

    modal.prototype = Object.create(jQuery.prototype);

    modal.prototype.appear = function()
    {
        if (!this.isVisible)
        {
            this.overlay.show();
            this.show();
            this.isVisible = true;
        }
    };

    modal.prototype.disappear = function()
    {
        if (this.isVisible)
        {
            this.overlay.hide();
            this.hide();
            this.isVisible = false;
        }
    };

    modal.prototype.getArea = function(area)
    {
            return this.elements[area];
    };

    ag.ui.elem.Modal = modal;
})();
