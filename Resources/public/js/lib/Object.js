/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

Agit.Object = (function() {
    var
        factoryProto =
        {
            getName : function()
            {
                return this._name;
            },

            getMeta : function()
            {
                return this._meta;
            },

            getPropMeta : function(propName)
            {
                return this._meta[propName];
            }
        };

    return function(objectName, defaultValues)
    {
        var
            objectMeta = Agit.Object.list[objectName],
            values = {},
            object = Object.create(factoryProto);

        Object.keys(objectMeta).forEach(function(prop){
            values[prop] = (defaultValues[prop] !== undefined)
                ? defaultValues[prop]
                : objectMeta[prop].default || null;

            Object.defineProperty(object, prop, {
                get: function() { return values[prop]; },
                set: function(value) { values[prop] = value; },
                enumerable: true
            });
        });

        Object.defineProperty(object, "_name", { value: objectName });
        Object.defineProperty(object, "_meta", { value: objectMeta });

        return object;
    };
})();

Agit.Object.list = {};

Agit.Object.register = function(name, requestObject)
{
    Agit.Object.list[name] = requestObject;
};

Agit.Object.registerList = function(list)
{
    Object.keys(list).map(function(key){
        Agit.Object.register(key, list[key]);
    });
};
