ag.ns("ag.ui.elem");

(function(){
    var msgH = function() { };

    msgH.prototype = Object.create(ag.common.MessageHandler.prototype);

    msgH.prototype.alert = function(text, type, category, closeCallback)
    {
        var modal = new ag.ui.modal.Alert(text, type, closeCallback);
        modal.appear();
    };

    msgH.prototype.confirm = function(question, yesCallback, noCallback)
    {
        var modal = new ag.ui.modal.Confirm(question, yesCallback, noCallback);
        modal.appear();
    };

    msgH.prototype.prompt = function(question, resultCallback)
    {
        var modal = new ag.ui.modal.Prompt(question, resultCallback);
        modal.appear();
    };

    ag.ui.elem.ModalMessageHandler = msgH;
})();
