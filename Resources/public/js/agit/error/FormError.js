agit.ns("agit.error");

(function(){
    var
        err = function(message)
        {
            this.name = "FormError";
            this.message = message;
        };

    err.prototype = Object.create(Error.prototype);
    err.prototype.constructor = err;

    agit.error.FormError = err;
})();
