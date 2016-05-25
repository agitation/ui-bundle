ag.ns("ag.ui.elem");

ag.ui.elem.ApiForm = function(endpoint, $rows, $footer, callback)
{
    var
        $form = ag.ui.tool.tpl("agitui-form", ".api-form"),
        $table = $form.find("table"),
        $tbody = $form.find("tbody").empty(),
        apiService = ag.srv("api");

    $tbody.append($rows);

    $table.find("tfoot").remove();
    $table.append($footer);

    $form.on("submit", function(ev){
        ag.ui.ctxt.Form.stopEvent(ev);

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
