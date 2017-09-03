ag.ns("ag.ui.ctxt");

(function(){

var Block = function(content, classes)
{
    this.extend(this, content).addClass(classes);
};

Block.prototype = Object.create(ag.ui.ctxt.Element.prototype);

ag.ui.ctxt.Block = Block;

})();
