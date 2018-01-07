ag.ns("ag.ui.ctxt");

(function(){

var View = function(blocks)
{
    this.nodify();
    this.addChildren(blocks, false);

    this.blocks = blocks;
    this.header = this.find("header");
    this.body = this.find("article");
    this.footer = this.find("footer");
};

View.prototype = Object.create(ag.ui.ctxt.Element.prototype);

View.prototype.nodify = function()
{
    this.extend(this, ag.ui.tool.tpl("agitui-page", ".view"));
};

View.prototype.getTitle = function()
{
    var titleBlock = this.getChild(ag.ui.elem.Title, true);
    return titleBlock ? titleBlock.getText() : undefined;
};

View.prototype.attachBlocks = function()
{
    var self = this;

    Object.keys(this.blocks).forEach(function(name){
        var
            block = self.blocks[name],
            target = self.body;

        if (block instanceof ag.ui.ctxt.Header)
            target = self.header;
        else if (block instanceof ag.ui.ctxt.Footer)
            target = self.footer;

        target.append(block);
    });
};

/**
 * NOTE: the view may (still) be visible/invisible to the user
 * but this flag means that this is the now active view.
 */
View.prototype.setState = function(state)
{
    this.isActive = state;
    state && this.attachBlocks(); // attach blocks again, in case some of them are shared with other views
    this.triggerHandler("ag.view.state", state);
};

View.prototype.isActive = false;

ag.ui.ctxt.View = View;

})();
