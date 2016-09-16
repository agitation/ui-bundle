ag.ns("ag.ui.elem");

(function()
{
    var
        overlay = function()
        {
            this.instCount = 0;
            this.extend(this, $("<div class='overlay'>")).appendTo($("body"));
        };

overlay.prototype = Object.create(ag.ui.ctxt.Element.prototype);

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

ag.ui.elem.Overlay = new overlay();

})();
