agit.ns("agit.common");


agit.common.Service = (function(){
    var services = {};

    return {
        get : function(serviceName)
        {
            return services[serviceName] || null;
        },

        set : function(serviceName, instance)
        {
            services[serviceName] = instance;
        }
    };

})();
