agit.ns("agit.misc.msgh");

(function(){
    var
        msgH = function() {},

        $bubbles = {},

        removeBubble = function($msgBubble)
        {
            $msgBubble && $msgBubble.fadeOut(1500, $msgBubble.remove);
        };

    msgH.prototype = Object.create(agit.common.MessageHandler.prototype);
    msgH.constructor = msgH;
    agit.misc.msgh.Bubbles = msgH;

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

    msgH.prototype.showMessage = function(message)
    {
        var
            $container = $("<div class='message-bubbles'>").appendTo($("body")),
            $msgBubble = agit.tool.tpl(".message-bubble"),
            removeThisBubble = function(){ removeBubble($msgBubble); };

        window.setTimeout(function(){
            $msgBubble
                .addClass(message.getType())
                .appendTo($container)
                .find(".icon i." + message.getType()).addClass("on").end()
                .find(".msg").text(message.getText()).end()
                .fadeIn(400)
                .click(removeThisBubble)
                .animate({ opacity:0.9 }, 1000);

            // start disappearing after 10 seconds
            window.setTimeout(removeThisBubble, 10000);
        }, 200);

        if (!$bubbles[message.getCategory()])
        {
            $bubbles[message.getCategory()] = [];
        }

        $bubbles[message.getCategory()].push($msgBubble);
    };


})();
