ag.ns("ag.ui.field");

(function(){
var
    passwordField = function()
    {
        this.extend(this, ag.ui.tool.tpl("agitui-form", ".password"));

        this.inputField = new ag.ui.field.Text(this.find("input"));

        var
            self = this,
            buttons = this.find(".buttons"),
            showBtn = this.find(".show-pass").click(function(){
                hideBtn.appendTo(buttons);
                showBtn.detach();
                self.inputField.attr("type", "text");
            }),

            hideBtn = this.find(".hide-pass").click(function(){
                hideBtn.detach();
                showBtn.appendTo(buttons);
                self.inputField.attr("type", "password");
            }).detach();
    };

passwordField.prototype = Object.create(ag.ui.field.ComplexField.prototype);

passwordField.prototype.setValue = function(value)
{
    this.inputField.setValue(value);
    this.triggerHandler("ag.field.set");
    return this;
};

passwordField.prototype.getValue = function()
{
    return this.inputField.getValue();
};

passwordField.prototype.disable = function()
{
    this.inputField.disable();
    return this;
};

passwordField.prototype.enable = function()
{
    this.inputField.enable();
    return this;
};

ag.ui.field.Password = passwordField;

})();
