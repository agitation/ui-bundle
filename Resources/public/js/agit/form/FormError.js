agit.ns("agit.form");

(function(){
    var
        err = function(message)
        {
            this.name = "FormError";
            this.message = message;
        };

    err.prototype = Object.create(Error.prototype);
    err.prototype.constructor = err;

    agit.form.FormError = err;
})();
