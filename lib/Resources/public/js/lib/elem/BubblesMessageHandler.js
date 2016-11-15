ag.ns("ag.ui.elem");

(function(){
    var
        $container,
        $bubbles = {},
        removeBubble = function($msgBubble)
        {
            $msgBubble && $msgBubble.fadeOut(1500, $msgBubble.remove);
        },

        msgH = function()
        {
            if (!$container) $container = $("<div class='message-bubbles'>").appendTo($("body"));
        };

msgH.prototype = Object.create(ag.common.ModalMessageHandler.prototype);

msgH.prototype.clear = function(category)
{
    Object.keys($bubbles).forEach(function(cat){
        if (category === undefined || cat === category)
        {
            $bubbles[cat].forEach(function($msgBubble){
                removeBubble($msgBubble);
            });
        }
    });
};

msgH.prototype.alert = function(text, type, category)
{
    var
        $msgBubble = ag.ui.tool.tpl("agitui-msg-bubbles", ".message-bubble"),
        removeThisBubble = function() { removeBubble($msgBubble); };

    window.setTimeout(function(){
        $msgBubble
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

    if (!$bubbles[category])
    {
        $bubbles[category] = [];
    }

    $bubbles[category].push($msgBubble);
};

ag.ui.elem.BubblesMessageHandler = msgH;
})();
