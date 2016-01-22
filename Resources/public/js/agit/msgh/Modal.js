agit.ns("agit.msgh");


agit.msgh.Modal = function()
{
    var msgH = Object.create(agit.msgh.proto);

    msgH.showMessage = function(Message)
    {
        var
            Modal = new agit.widget.Modal();

        Modal
            .setTitle(null)
            .setFooter(agit.widget.Modal.getButton('confirm', Agit.L10n.t("Ok")))
            .setContent(Agit.sprintf("<p class='msg msg-%s'>%s</p>", Message.getType(), Message.getText()))
            .appear();
    };

    return msgH;
};
