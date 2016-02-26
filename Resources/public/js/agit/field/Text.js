agit.ns("agit.field");

agit.field.Text = function()
{
    var $field = $("<input class='form-control'>");

    $field.setTargetId = function(id)
    {
        $field.attr("id", id);
    };

    return $field;
};
