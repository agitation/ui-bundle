/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $ */

Agit.Select = function(elementOrAttributes, options, selectCallback)
{
    var
        $select = $("<select class='form-control'>"),
        hasIntro = false, // a "please select" pseudo-option

        createIntro = function()
        {
            return $("<option value='' disabled selected hidden>").text(Agit.L10n.t("– Please select –"));
        },

        getSelectedOption = function()
        {
            var $this = $(this);
            selectCallback && selectCallback($this.attr("name"), $this.val());
        };

    if ($(elementOrAttributes).is("select"))
    {
        $select = $(elementOrAttributes);
    }
    else if ($.isPlainObject(elementOrAttributes))
    {
        $select.attr(elementOrAttributes);
    }

    $select.entityToOption = function(entity, isSelected)
    {
        return {
            value: entity.id,
            text: Agit.out(entity.name),
            selected : isSelected
        };
    };

    $select.entitiesToOptions = function(entityList, selected)
    {
        var options = [];

        selected = selected || [];
        $.isArray(selected) || (selected = [selected]);

        entityList.forEach(function(entity){
            entity &&
            entity.id &&
            options.push($select.entityToOption(entity, selected.indexOf(entity.id) > -1));
        });

        return options;
    };

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

        hasIntro && $select.html(createIntro());
        $select.append($(html.join("")));

        if (selected.length)
        {
            if (!$select.is("select[multiple=multiple]"))
            {
                selected = selected[0];
            }

            $select.val(selected);
        }

        return $select;
    };

    $select.addIntro = function()
    {
        hasIntro = true;
        $select.prepend(createIntro());
    };

    options && options.length && $select.setOptions(options);

    $select.change(getSelectedOption);

    $select.val = function(value)
    {
        // setter
        if (value !== undefined)
        {
            $select._setValue(value);
            return $select;
        }

        // getter
        else
        {
            return $select._getValue();
        }
    };

    return $select;
};
