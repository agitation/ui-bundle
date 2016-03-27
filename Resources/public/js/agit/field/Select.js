agit.ns("agit.field");

(function(){
    var
        createIntro = function()
        {
            return $("<option value='' disabled selected hidden>").text(agit.intl.L10n.t("– Please select –"));
        },

        selectField = function(elementOrAttributes, options, onChangeCallback)
        {
            if ($(elementOrAttributes).is("select"))
            {
                this.extend(this, $(elementOrAttributes));
            }
            else
            {
                this.extend(this, $("<select class='form-control'>"));

                if (elementOrAttributes instanceof Object)
                    this.attr(elementOrAttributes);
            }

            options && options.length && this.setOptions(options);

            this.change(onChangeCallback);
        };

    selectField.prototype = Object.create(agit.field.Field.prototype);

    selectField.prototype.addIntro = function()
    {
        this.hasIntro = true;
        this.prepend(createIntro());
    };

    selectField.prototype.setOptions = function(options)
    {
        var
            selected = [],
            html = [];

        this
            .empty()
            .attr("disabled", options.length ? false : "disabled");

        options.forEach(function(option){
            option.selected && selected.push(option.value);

            html.push(agit.tool.fmt.sprintf("<option value='%s'%s>%s</option>",
                agit.tool.fmt.esc(option.value),
                option.selected ? " selected='selected'" : "",
                agit.tool.fmt.esc(option.text)
            ));
        });

        this.hasIntro && this.html(createIntro());
        this.append($(html.join("")));

        if (selected.length)
        {
            if (!this.is("select[multiple=multiple]"))
            {
                selected = selected[0];
            }

            this.origVal(selected);
        }

        return this;
    };

    selectField.prototype.setValue = function(value)
    {
        if (this.is("[multiple=multiple]") && !$.isArray(value))
            value = [value];

        else if (value === null) // reset
                value = this.find(this.children("option[selected]").length ? "option[selected]" : "option:first-child").attr("value");

        return this.origVal(value);
    };

    selectField.prototype.getValue = function()
    {
            var value = this.origVal();


            if (this.is("[multiple=multiple]") && value === null)
            {
                value = [];
            }

            if (this.is("[data-type=int]"))
            {
                value = $.isArray(value) ? value.map(function(val){ return parseInt(val); }) : parseInt(value);
            }

            return value;
    };

    agit.field.Select = selectField;
})();
