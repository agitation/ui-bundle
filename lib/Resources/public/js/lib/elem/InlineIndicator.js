ag.ns("ag.ui.elem");

// to be used with the agitation/api-bundle

(function(){

var inlineIndicator = function()
{
    this.iCount = 0;
    this.spinner = new ag.ui.elem.Spinner();
    this.spinner.hide();
    this.extend(this, $("<span class='indicator'>").append(this.spinner));
};

inlineIndicator.prototype = Object.create(ag.api.Indicator.prototype);

inlineIndicator.prototype.start = function()
{
    ++this.iCount === 1 && this.spinner.show();
};

inlineIndicator.prototype.halt = function(callback)
{
    --this.iCount || this.spinner.hide();
    callback && callback();
};

ag.ui.elem.InlineIndicator = inlineIndicator;
})();
