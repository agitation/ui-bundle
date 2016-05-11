agit.ns("agit.elem");

agit.elem.ApiForm = function(endpoint, $rows, $footer, callback)
{
    var
        $form = agit.tool.tpl("agitui-form", ".api-form"),
        $table = $form.find("table"),
        $tbody = $form.find("tbody").empty(),
        apiService = agit.srv("api");

    $tbody.append($rows);

    $table.find("tfoot").remove();
    $table.append($footer);

    $form.on("submit", function(ev){
        agit.common.Form.stopEvent(ev);

        var values = {};

        $rows.forEach(function($row){
            values[$row.getName()] = $row.getValue();
        });

        apiService.doCall(
            endpoint,
            values,
            callback
        );
    });

    return $form;
};
