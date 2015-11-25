/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

Agit.Collection = function(list, options)
{
    var
        self = this,
        defaultOptions = { idCol : "id" },
        elements = {},
        opts = $.extend(true, defaultOptions, options || {});
        updateLength = function()
        {
            self.length = Object.keys(elements).length;
        };


    self.length = 0;

    self.get = function(id)
    {
        return elements[opts.idCol];
    };

    self.add = function(element)
    {
        elements[opts.idCol] = element;
        updateLength();
    };

    self.update = function(element)
    {
        elements[opts.idCol] = element;
        updateLength();
    };

    // accepts either the ID or the element itself
    self.remove = function(element)
    {
        if (element[opts.idCol])
            delete(elements[element[opts.idCol]]);
        else
            delete(elements[element]);

        updateLength();
    };

    self.truncate = function()
    {
        elements = {};
        updateLength();
    };


    self.forEach = function(callback)
    {
        Object.keys(elements).forEach(function(key){
            callback(elements[key], key);
        });
    };

    list && list.forEach(function(element){
        self.add(element);
    });
};
