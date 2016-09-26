ag.ns("ag.ui.elem");

(function(){

var apiForm = function(endpoint, $rows, $footer, callback)
{
    this.extend(this, ag.ui.tool.tpl("agitui-form", ".api-form"));

    var
        self = this,
        $table = this.find("table"),
        $tbody = this.find("tbody").empty(),
        apiService = ag.srv("api");

    $tbody.append($rows);

    $table.find("tfoot").remove();
    $table.append($footer);

    this.on("submit", function(ev){
        ev.preventDefault();

        var values = {};

        $rows.forEach(function($row){
            values[$row.getName()] = $row.getValue();
        });

        apiService.doCall(endpoint, values, callback);
    });
};

apiForm.prototype = Object.create(ag.ui.ctxt.Form.prototype);

ag.ui.elem.Form = apiForm;
})();
