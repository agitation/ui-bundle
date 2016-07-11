ag.ns("ag.ui.ctxt");

(function(){
    var view = function(blocks)
    {
        var self = this;

        this.extend(this, $("<div class='view'>"));
        this.blocks = blocks;

        Object.keys(blocks).forEach(function(key){
            self.append(blocks[key]);
            blocks[key].setView && blocks[key].setView(self);
        });
    };

    view.prototype = Object.create(jQuery.prototype);

    view.prototype.setPage = function(page)
    {
        this.page = page;
    };

    view.prototype.getPage = function()
    {
        return this.page;
    };

    ag.ui.ctxt.View = view;
})();
