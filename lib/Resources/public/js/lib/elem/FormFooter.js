ag.ns("ag.ui.elem");

ag.ui.elem.FormFooter = function(elem)
{
    this.extend(this, elem || ag.ui.tool.tpl("agitui-form", ".api-form-footer"));
};

ag.ui.elem.FormFooter.prototype = Object.create(ag.ui.ctxt.Element.prototype);
