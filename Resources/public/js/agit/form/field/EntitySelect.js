agit.ns("agit.form.field");

agit.form.field.EntitySelect = function(eName)
{
    var
        $select = new agit.form.field.EntitySelect(null, eName),
        origValFunc = $select.val;

    $select.val = function(value)
    {
        var ret = origValFunc.call($select, value);

        // if .val() is used as getter and the result is an object, we return the ID instead
        value === undefined &&
            ret instanceof Object &&
            ret.id &&
            (ret = ret.id);

        return ret;
    };

    $select.getSelectedEntity = function()
    {
        return origValFunc.call($select);
    };

    $select.setTargetId = function(id)
    {
        $select.attr("id", id);
    };

    return $select;
};
