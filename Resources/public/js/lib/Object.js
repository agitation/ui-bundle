/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

Agit.Object = function(objectName, _defaultValues)
{
    var
        self = this,
        defaultValues = _defaultValues || {},
        objectMeta = Agit.Object.list[objectName],
        values = {};

        checkPropertyExists = function(key)
        {
            if (values[key] === undefined)
                throw Agit.sprintf("Object %s does not have a property named %s.", name, key);
        };

    Object.keys(objectMeta).forEach(function(key){
        values[key] = (defaultValues[key] !== undefined)
            ? defaultValues[key]
            : objectMeta[key].default || null;
    });

    this.getPropMeta = function(propName)
    {
        return objectMeta[propName];
    };

    this.set = function(key, value)
    {
        checkPropertyExists(key);
        values[key] = value;
    };

    this.get = function(key)
    {
        checkPropertyExists(key);
        return values[key];
    };

    this.getName = function()
    {
        return name;
    };

    this.setData = function(data)
    {
        $.each(data, function(key, value){
            self.set(key, value);
        });
    };

    this.getData = function()
    {
        return values;
    };
};

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
