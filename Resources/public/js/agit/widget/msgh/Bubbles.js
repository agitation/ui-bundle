agit.ns("agit.widget.msgh");

agit.widget.msgh.Bubbles = function($parent)
{
    var
        msgH = Object.create(agit.api.MessageHandler),
        $bubbles = {},
        removeBubble = function($msgBubble)
        {
            $msgBubble && $msgBubble.fadeOut(1500, $msgBubble.remove);
        };

    msgH.clear = function(category)
    {
        $.each($bubbles, function(cat, $bubbleList){
            if (category === undefined || cat === category)
            {
                $.each($bubbleList, function(k, $msgBubble){
                    removeBubble($msgBubble);
                });
            }
        });
    };

    msgH.showMessage = function(message)
    {
        var
            $msgBubble = agit.common.Template.get('.message-bubble'),
            removeThisBubble = function(){ removeBubble($msgBubble) };

        window.setTimeout(function(){
            $msgBubble
                .addClass(message.getType())
                .appendTo($parent)
                .find('.icon i.' + message.getType()).addClass('on').end()
                .find('.msg').text(message.getText()).end()
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


    return msgH;
};
