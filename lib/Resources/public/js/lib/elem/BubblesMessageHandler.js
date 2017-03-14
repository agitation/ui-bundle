ag.ns("ag.ui.elem");

(function(){
    var
        $container,
        bubbles = {},
        removeBubble = function(bubble)
        {
            bubble && bubble.fadeOut(1500, bubble.remove.bind(bubble));
        },

        msgH = function()
        {
            if (!$container) $container = $("<div class='message-bubbles'>").appendTo($("body"));
        };

msgH.prototype = Object.create(ag.ui.elem.ModalMessageHandler.prototype);

msgH.prototype.clear = function(category)
{
    Object.keys(bubbles).forEach(function(cat){
        if (category === undefined || cat === category)
        {
            bubbles[cat].forEach(function(bubble){
                removeBubble(bubble);
            });
        }
    });
};

msgH.prototype.alert = function(text, type, category, closeCallback)
{
    type = type || "error";

    var
        bubble = ag.ui.tool.tpl("agitui-msg-bubbles", ".message-bubble"),
        removeThisBubble = function()
        {
            removeBubble(bubble);
        };

    window.setTimeout(function(){
        bubble
            .addClass(type)
            .appendTo($container)
            .find(".icon i." + type).addClass("on").end()
            .find(".msg").text(text).end()
            .fadeIn(400)
            .click(removeThisBubble)
            .animate({ opacity:0.9 }, 1000);

        // start disappearing after 10 seconds
        window.setTimeout(removeThisBubble, 10000);
    }, 200);

    if (!bubbles[category])
    {
        bubbles[category] = [];
    }

    bubbles[category].push(bubble);
    closeCallback && closeCallback(); // no need to wait until something is closed
};

ag.ui.elem.BubblesMessageHandler = msgH;
})();
