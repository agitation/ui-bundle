ag.ns("ag.ui.ctxt");

(function(){

var View = function(blocks)
{
    this.nodify();
    this.addChildren(blocks, false);
    this.blocks = blocks;
};

View.prototype = Object.create(ag.ui.ctxt.Element.prototype);

View.prototype.nodify = function()
{
    this.extend(this, $("<div class='view'>"));
};

View.prototype.attachBlocks = function()
{
    var self = this;

    Object.keys(this.blocks).forEach(function(name){
        self.append(self.blocks[name]);
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
};

View.prototype.isActive = false;

ag.ui.ctxt.View = View;

})();
