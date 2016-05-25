ag.ns("ag.ui.elem");

(function(){
    var msgH = function() {};

    msgH.prototype = Object.create(ag.common.MessageHandler.prototype);

    msgH.prototype.showMessage = function(message)
    {
        var modal = new ag.ui.elem.ModalMessageHandler();

        modal
            .setTitle(null)
            .setFooter(ag.ui.elem.ModalMessageHandler.getButton("confirm", agit.intl.t("Ok")))
            .setContent(ag.ui.tool.fmt.sprintf("<p class='msg msg-%s'>%s</p>", message.getType(), message.getText()))
            .appear();
    };

    ag.ui.elem.Modal = msgH;
})();
