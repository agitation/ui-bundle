agit.ns("agit.form.field");

agit.form.field.Multilang = function(useTextarea)
{
    var
        $field = new agit.form.field.MultilangInput(useTextarea);

    $field.setTargetId = function(id)
    {
        $field.find("input").attr("id", id);
    };

    return $field;
};
