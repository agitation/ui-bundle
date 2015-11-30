/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $ */

Agit.Select = function(elementOrAttributes, options, selectCallback)
{
    var
        $select = $("<select class='form-control'>"),

        getSelectedOption = function()
        {
            var $this = $(this);
            selectCallback && selectCallback($this.attr("name"), $this.getFieldValue());
        };

    if ($(elementOrAttributes).is("select"))
    {
        $select = $(elementOrAttributes);
    }
    else if ($.isPlainObject(elementOrAttributes))
    {
        $select.attr(elementOrAttributes);
    }

    $select.setOptions = function(options)
    {
        var
            selected = [],
            html = [];

        $select
            .empty()
            .attr("disabled", options.length ? false : "disabled");

        options.forEach(function(option){
            option.selected && selected.push(option.value);

            html.push(Agit.sprintf("<option value='%s'%s>%s</option>",
                Agit.esc(option.value),
                option.selected ? " selected='selected'" : "",
                Agit.esc(option.text)
            ));
        });

        $select.html($(html.join("")));

        if (selected.length)
        {
            if (!$select.is("select[multiple=multiple]"))
            {
                selected = selected[0];
            }

            $select.setFieldValue(selected);
        }

        return $select;
    };

    options && options.length && $select.setOptions(options);

    $select.change(getSelectedOption);

    return $select;
};
