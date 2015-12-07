/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Tx, $, jQuery, OpenLayers, JSON */

Agit.MessageHandlerDialog = function()
{
    var msgH = Object.create(Agit.MessageHandler);

    msgH.showMessage = function(Message)
    {
        var
            Modal = new Agit.Modal();

        Modal
            .setTitle(null)
            .setFooter(Agit.Modal.getButton('confirm', Agit.L10n.t("Ok")))
            .setContent(Agit.sprintf("<p class='msg msg-%s'>%s</p>", Message.getType(), Message.getText()))
            .appear();
    };

    return msgH;
};
