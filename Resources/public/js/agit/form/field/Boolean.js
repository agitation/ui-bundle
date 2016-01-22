agit.ns("agit.form.field");

agit.form.field.Boolean = function(labelText)
{
    var
        $field = agit.common.Template.get(".boolean"),
        $input = $field.find("input");

    $field.val = function(value)
    {
        // setter
        if (value !== undefined)
        {
            $input._setValue(value);
            return $field;
        }

        // getter
        else
        {
            return $input._getValue(value);
        }
    };

    $field.find("span").text(labelText);

    $field.setTargetId = function(id)
    {
        $input.attr("id", id);
    };

    return $field;
};
