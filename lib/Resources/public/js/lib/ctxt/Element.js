ag.ns("ag.ui.ctxt");

(function(){
    var element = function() { };

    element.prototype = Object.create(jQuery.prototype);

    // makes the element a jQuery/DOM node, usually by extending an existing jQuery object.
    element.prototype.nodify = function() { };

    ag.ui.ctxt.Element = element;
})();
