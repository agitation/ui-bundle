ag.ns("ag.ui.elem");

(function(){
    var
        spinner = function()
        {
            this.extend(this, $("<div class='spinner'>"));
        };

    spinner.prototype = Object.create(jQuery.prototype);

    ag.ui.elem.Spinner = spinner;
})();
