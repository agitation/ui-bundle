ag.ns("ag.ui.field");

(function(){
    var
        selectField = function(elem, attr, options, isInt)
        {
            this.extend(this, elem || $("<select class='form-control'>"));
            attr && this.attr(attr);
            this.isInt = isInt; // if true, getValue will cast to int
            this.setOptions(options || []);
        },

        createIntro = function()
        {
            return $("<option value='' disabled selected hidden>").text(ag.intl.t("– Please select –"));
        };

    selectField.prototype = Object.create(ag.ui.field.NativeField.prototype);

    selectField.prototype.addIntro = function()
    {
        this.hasIntro = true;
        this.prepend(createIntro());
    };

    selectField.prototype.setOptions = function(options)
    {
        var
            self = this,
            selected = [],
            html = [];

        this.empty().attr("disabled", options.length ? false : "disabled");
        this.optionValues = [];

        options.forEach(function(option){
            option.selected && selected.push(option.value);

            self.optionValues.push(option.value);

            html.push(ag.ui.tool.fmt.sprintf("<option value='%s'%s%s>%s</option>",
                ag.ui.tool.fmt.esc(option.value),
                option.selected ? " selected" : "",
                option.class ? " class='" + option.class + "'" : "",
                ag.ui.tool.fmt.esc(option.text)
            ));
        });

        this.hasIntro && this.html(createIntro());
        this.append($(html.join("")));

        if (selected.length)
        {
            if (!this.is("select[multiple=multiple]"))
                selected = selected[0];

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

        this.origVal(value);

        this.triggerHandler("ag.field.set");
        return this;
    };

    selectField.prototype.getValue = function()
    {
        var value = this.origVal();

        if (this.is("[multiple=multiple]") && value === null)
            value = [];

        if (this.isInt)
            value = $.isArray(value) ? value.map(function(val){ return parseInt(val); }) : parseInt(value);

        return value;
    };

    selectField.prototype.containsOption = function(value)
    {
        return this.optionValues.indexOf(value) > -1;
    };

    ag.ui.field.Select = selectField;
})();
