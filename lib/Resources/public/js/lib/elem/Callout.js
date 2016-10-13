ag.ns("ag.ui.elem");

(function(){

var callout = function(content, type)
{
    type = type || "info";

    this.extend(this, $("<p>").addClass("callout callout-" + type));
    this.html(content);
};

callout.prototype = Object.create(ag.ui.ctxt.Element.prototype);

ag.ui.elem.Callout = callout;
})();
