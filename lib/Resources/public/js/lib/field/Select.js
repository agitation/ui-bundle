ag.ns("ag.ui.field");

(function(){

var Select = function(elem, attr, options, isInt)
    {
        this.extend(this, elem || $("<select class='form-control'>"));
        attr && this.attr(attr);
        this.isInt = isInt; // if true, getValue will cast to int

        if (this.attr("data-placeholder"))
            this.introText = this.attr("data-placeholder");

        if (this.find("option").length === 0)
            this.setOptions(options || []);
    },

    createIntro = function(text)
    {
        return $("<option value='' disabled selected hidden>").text(text);
    };

Select.prototype = Object.create(ag.ui.field.NativeField.prototype);

Select.prototype.addIntro = function(text)
{
    if (text)
        this.introText = text;

    this.hasIntro = true;
    this.prepend(createIntro(this.introText));
};

Select.prototype.introText = ag.intl.t("Please select");

Select.prototype.setOptions = function(options)
{
    var
        self = this,
        selected = [],
        html = [];

    this.empty().prop("disabled", !options.length);
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

    this.hasIntro && this.html(createIntro(this.introText));
    this.append($(html.join("")));

    if (selected.length)
    {
        if (!this.is("select[multiple=multiple]"))
            selected = selected[0];

        this.origVal(selected);
    }

    return this;
};

Select.prototype.setValue = function(value)
{
    if (this.is("[multiple=multiple]") && !$.isArray(value))
        value = [value];

    else if (value === null) // reset
        value = this.find(this.children("option[selected]").length ? "option[selected]" : "option:first-child").attr("value");

    this.origVal(value);

    this.triggerHandler("ag.field.set");
    return this;
};

Select.prototype.getValue = function()
{
    var value = this.origVal();

    if (this.is("[multiple=multiple]") && value === null)
        value = [];

    if (this.isInt)
        value = $.isArray(value) ? value.map(function(val){ return parseInt(val); }) : parseInt(value);

    return value;
};

Select.prototype.containsOption = function(value)
{
    return this.optionValues.indexOf(value) > -1;
};

ag.ui.field.Select = Select;

})();
