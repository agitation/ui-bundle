agit.ns("agit.elem");

agit.elem.ApiForm = function(endpoint, fields, callback)
{
    var
        $form = agit.common.Template.get(".api-form"),
        $table = $form.find("table"),
        $tbody = $form.find("tbody").empty(),
        apiService = agit.srv("api");

    Object.keys(fields).forEach(function(key){
        var
            field = fields[key],
            $row = agit.common.Template.get(".api-form tbody tr");

        $row.find("th label").text(field.label);
        $row.find("td").html(field.element);

        field.optional || $row.find("th .optional").remove();
        $tbody.append($row);
    });

    $form.on("submit", function(ev){
        agit.form.Form.stopEvent(ev);

        var values = {};

        Object.keys(fields).forEach(function(key){
            values[key] = fields[key].element.val();
        });

        apiService.doCall(
            endpoint,
            values,
            callback,
            { fullResponse : true }
        );
    });

    return $form;
};
