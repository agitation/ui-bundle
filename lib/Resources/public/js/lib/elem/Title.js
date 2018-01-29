ag.ns("ag.ui.elem");

ag.ui.elem.Title = function(text)
{
    this.extend(this, $("<h1>")).text(text);
};

ag.ui.elem.Title.prototype = Object.create(ag.ui.ctxt.Block.prototype);
