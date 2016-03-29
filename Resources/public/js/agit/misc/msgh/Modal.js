agit.ns("agit.misc.msgh");

(function(){
    var msgH = function() {};

    msgH.prototype = Object.create(agit.common.MessageHandler.prototype);

    msgH.prototype.showMessage = function(message)
    {
        var modal = new agit.misc.Modal();

        modal
            .setTitle(null)
            .setFooter(agit.misc.Modal.getButton("confirm", agit.intl.t("Ok")))
            .setContent(agit.tool.fmt.sprintf("<p class='msg msg-%s'>%s</p>", message.getType(), message.getText()))
            .appear();
    };

    agit.misc.msgh.Modal = msgH;
})();
