ag.ns("ag.ui.elem");

ag.ui.elem.Heading = function(content, level)
{
    this.extend(this, $("<h" + (level || 1) + ">"));
    this.html(content);
};

ag.ui.elem.Heading.prototype = Object.create(ag.ui.ctxt.Element.prototype);
