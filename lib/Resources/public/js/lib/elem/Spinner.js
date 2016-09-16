ag.ns("ag.ui.elem");

(function(){
    var
        spinner = function()
        {
            this.extend(this, $("<div class='spinner'>"));
        };

    spinner.prototype = Object.create(ag.ui.ctxt.Element.prototype);

    ag.ui.elem.Spinner = spinner;
})();
