ag.ns("ag.ui.elem");

(function(){

var callout = function(content, type)
{
    type = type || "info";

    this
        .extend(this, ag.ui.tool.tpl("agitui-form", ".callout"))
        .addClass("callout-" + type)
        .find("p").html(content);
};

callout.prototype = Object.create(ag.ui.ctxt.Block.prototype);

ag.ui.elem.Callout = callout;
})();
