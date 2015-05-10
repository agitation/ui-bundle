/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Tx, $, jQuery, OpenLayers, JSON */

Agit.ApiForm = function($form, Endpoint, RequestObject, callback)
{
    var
        fieldHandlers = {},
        defaultValues,
        autoFields = null; // fields that will be automatically collected. null: collect all

    $form.registerFieldHandler = function(fieldName, handler)
    {
        fieldHandlers[fieldName] = handler;
    };

    $form.setAutoFields = function(fieldList)
    {
        autoFields = fieldList;
    };

    $form.setFieldByName = function(key, value)
    {
        $form.find('*[name='+key+']').setFieldValue(value);
    };

    $form.getFieldByName = function(key)
    {
        return $form.find('*[name='+key+']').getFieldValue();
    };

    $form.setFieldsByName = function(item)
    {
        if (!item) { return; }

        $.each(item, function(key, value){
            if (fieldHandlers[key])
            {
                fieldHandlers[key].setFieldValue(value);
            }
            else if (autoFields === null || Agit.inArray(key, autoFields))
            {
                $form.setFieldByName(key, value);
            }
        });
    };

    $form.getFieldsByName = function()
    {
        var
            preValues = Agit.collectFormValues($form),
            values = {};

        $.each(preValues, function(key, value){
            if (autoFields === null || Agit.inArray(key, autoFields))
            {
                values[key] = value;
            }
        });

        $.each(fieldHandlers, function(key, handler){
            values[key] = handler.getFieldValue();
        });

        return values;
    };

    $form.reset = function(_values)
    {
        if (typeof(_values) === 'object')
        {
            defaultValues = _values;
        }
        else // clear form
        {
            defaultValues = {};
            $.each($form.getFieldsByName(), function(key, value){
                defaultValues[key] = null;
            });
        }

        $form.setFieldsByName(defaultValues);
    };

    $form.submit(function(ev){
        Agit.stopEvent(ev);
        RequestObject.setData($form.getFieldsByName());
        new Agit.apiCall(Endpoint, RequestObject, callback, {processType : 'apicomplete'});
    });

    defaultValues = $form.getFieldsByName();
    $form.reset();

    return $form;
};
