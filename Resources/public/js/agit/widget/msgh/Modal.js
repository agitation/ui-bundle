agit.ns("agit.widget.msgh");

agit.widget.msgh.Modal = function()
{
    var msgH = Object.create(agit.api.MessageHandler);

    msgH.showMessage = function(Message)
    {
        var
            Modal = new agit.widget.Modal();

        Modal
            .setTitle(null)
            .setFooter(agit.widget.Modal.getButton('confirm', agit.intl.L10n.t("Ok")))
            .setContent(agit.srv("format").sprintf("<p class='msg msg-%s'>%s</p>", Message.getType(), Message.getText()))
            .appear();
    };

    return msgH;
};
