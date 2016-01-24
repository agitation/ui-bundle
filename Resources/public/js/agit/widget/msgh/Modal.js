agit.ns("agit.widget.msgh");

(function(){
    var msgH = function() {};

    msgH.prototype = Object.create(agit.common.MessageHandler.prototype);

    msgH.prototype.showMessage = function(message)
    {
        var modal = new agit.widget.Modal();

        modal
            .setTitle(null)
            .setFooter(agit.widget.Modal.getButton('confirm', agit.intl.L10n.t("Ok")))
            .setContent(agit.srv("format").sprintf("<p class='msg msg-%s'>%s</p>", message.getType(), message.getText()))
            .appear();
    };

    agit.widget.msgh.Modal = msgH;
})();
