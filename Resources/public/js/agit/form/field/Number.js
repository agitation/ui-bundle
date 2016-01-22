agit.ns("agit.form.field");

agit.form.field.Number = function(params)
{
    var
        defaultParams = { min : null, max : null, step : null },
        $field = $("<input class='form-control' data-type='int' type='number'>");

    $field.val = function(value)
    {
        // setter
        if (value !== undefined)
        {
            $field._setValue(value);
            return $field;
        }

        // getter
        else
        {
            return $field._getValue();
        }
    };

    $field.setTargetId = function(id)
    {
        $field.attr("id", id);
    };

    params = $.extend(params || {}, defaultParams);

    Object.keys(defaultParams).forEach(function(key){
        key !== null && $field.attr(key, params[key]);
    });

    return $field;
};
