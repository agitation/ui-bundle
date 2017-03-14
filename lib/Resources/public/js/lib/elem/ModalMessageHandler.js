ag.ns("ag.ui.elem");

(function(){
    var msgH = function() { };

    msgH.prototype = Object.create(ag.common.MessageHandler.prototype);

    msgH.prototype.alert = function(text, type, category, closeCallback)
    {
        var modal = new ag.ui.elem.AlertModal(text, type, closeCallback);
        modal.appear();
    };

    msgH.prototype.confirm = function(question, yesCallback, noCallback)
    {
        var modal = new ag.ui.elem.ConfirmModal(question, yesCallback, noCallback);
        modal.appear();
    };

    msgH.prototype.prompt = function(question, resultCallback)
    {
        var modal = new ag.ui.elem.PromptModal(question, resultCallback);
        modal.appear();
    };

    ag.ui.elem.ModalMessageHandler = msgH;
})();
