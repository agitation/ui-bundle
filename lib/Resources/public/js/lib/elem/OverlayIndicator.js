ag.ns("ag.ui.elem");

// to be used with the agitation/api-bundle

(function(){
var instanceCount = 0,
    overlayIndicator = function()
    {
        this.overlay = ag.u.tpl("agitui-indicator", ".overlay-indicator");
        this.overlay.hide().appendTo($("body"));

        this.spinner = new ag.ui.elem.Spinner();
        this.spinner.appendTo(this.overlay.find(".anim"));
    };

overlayIndicator.prototype = Object.create(ag.api.Indicator.prototype);

overlayIndicator.prototype.start = function()
{
    ++instanceCount;

    if (instanceCount === 1)
    {
        this.spinner.show();
        this.overlay.show();
    }
};

overlayIndicator.prototype.halt = function(callback)
{
    --instanceCount;

    if (!instanceCount)
    {
        this.spinner.hide();
        this.overlay.hide();
    }

    callback && callback();
};

ag.ui.elem.OverlayIndicator = overlayIndicator;
})();
