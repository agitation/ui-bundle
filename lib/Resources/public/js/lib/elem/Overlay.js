ag.ns("ag.ui.elem");

(function()
{
    var
        overlay = function(zIndex, color)
        {
            this.extend(this, $("<div class='overlay'>")).appendTo($("body"));

            this.css({
                "z-index" : zIndex || 1000,
                "background" : color || "#000"
            });

            this.click(function(ev){
                ev.stopPropagation();
            });
        };

overlay.prototype = Object.create(jQuery.prototype);

overlay.prototype.appear = function()
{
    ++this.instCount;
    this.instCount === 1 && this.show();
};

overlay.prototype.disappear = function()
{
    --this.instCount;
    this.instCount <= 0 && this.hide();
};

overlay.prototype.instCount = 0;

ag.ui.elem.Overlay = overlay;

})();
