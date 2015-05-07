/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Tx, $, jQuery, OpenLayers, JSON */

Agit.Object = function(objectName, _defaultValues)
{
    var
        self = this,
        defaultValues = _defaultValues || {},
        values = {},
        namespace = objectName.split('/')[0];

        checkPropertyExists = function(key)
        {
            if (values[key] === undefined)
            {
                throw Agit.sprintf("Object %s does not have a property named %s.", name, key);
            }
        };

    if (!Agit.ApiObjects[namespace] || !Agit.ApiObjects[namespace][objectName])
    {
        throw new Agit.Exception('api.object', Agit.sprintf("Object does not exist: %s", objectName));
    }

    $.each(Agit.ApiObjects[namespace][objectName], function(key, value){
        values[key] = (defaultValues[key] === undefined) ? value : defaultValues[key];
    });

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
