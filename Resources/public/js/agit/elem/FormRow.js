agit.ns("agit.elem");

agit.elem.FormRow = function(key, label, $field, options)
{
    options = options || {};

    var $row = agit.common.Template.get(".api-form tbody tr");

    $row.find("th label").text(label);
    $row.find("td").html($field);

    options.optional || $row.find("th .optional").remove();

    $row.getName = function()
    {
        return key;
    };

    $row.setValue = function(value)
    {
        $field.val(value);
        return $row;
    };

    $row.getValue = function()
    {
        return $field.val();
    };

    return $row;
};
