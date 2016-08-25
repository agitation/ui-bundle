ag.ns("ag.ui.elem");

(function(){
    var msgH = function()
    {
    };

    msgH.prototype = Object.create(ag.common.MessageHandler.prototype);

    msgH.prototype.showMessage = function(message)
    {
        var modal = new ag.ui.elem.AlertModal(message.getText(), message.getType());
        modal.appear();
    };

    ag.ui.elem.ModalMessageHandler = msgH;
})();
