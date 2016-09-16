ag.ns("ag.ui.ctxt");

(function(){
    var view = function(blocks)
    {
        var self = this;

        this.nodify();
        this.blocks = {};

        Object.keys(blocks).forEach(function(name){
            self.addBlock(name, blocks[name]);
        });
    };

    view.prototype = Object.create(ag.ui.ctxt.Element.prototype);

    view.prototype.nodify = function()
    {
        this.extend(this, $("<div class='view'>"));
    };

    view.prototype.addBlock = function(name, elem, target)
    {
        target = target || this;

        this.blocks[name] = elem;
        target.append(elem);
        elem.setView && elem.setView(this);
    };

    view.prototype.setPage = function(page)
    {
        this.page = page;
    };

    view.prototype.getPage = function()
    {
        return this.page;
    };

    // find blocks by a reference to their prototype
    view.prototype.getBlocks = function(proto)
    {
        var
            allBlocks = this.blocks,
            foundBlocks = {};

        Object.keys(allBlocks).forEach(function(name) {
            if (allBlocks[name] instanceof proto)
                foundBlocks[name] = allBlocks[name];
        });

        return foundBlocks;
    };

    // gets a single block by a reference to its prototype
    view.prototype.getBlock = function(proto)
    {
        var
            foundBlocks = this.getBlocks(proto),
            keys = Object.keys(foundBlocks);

        return keys.length ? foundBlocks[keys[0]] : undefined;
    };

    /**
     * NOTE: the view may (still) be visible/invisible to the user
     * but this flag means that this is the now active view.
     */
    view.prototype.setStatus = function(status)
    {
        this.isActive = status;
    };

    /**
     * A block can define an "action" which is actually a callback. the callback
     * will be executed if the block's path is called through the URL hash. The
     * block's path is composed of the view's name and the block's name, as
     * defined in the page controller.
     */
    view.prototype.getActions = function()
    {
        var
            blocks = this.blocks,
            actions = {};

        Object.keys(blocks).forEach(function(name){
            var action = blocks[name].getAction ? blocks[name].getAction() : null;

            if (action)
                actions[name] = action;
        });

        return actions;
    };

    view.prototype.isActive = false;

    ag.ui.ctxt.View = view;
})();
