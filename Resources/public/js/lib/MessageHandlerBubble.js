/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

Agit.MessageHandlerBubble = function($parent)
{
    var
        self = new Agit.MessageHandler(),
        $bubbles = {},
        removeBubble = function($msgBubble)
        {
            if ($msgBubble)
            {
                $msgBubble.fadeOut(1500, $msgBubble.remove);
            }
        };

    self.clear = function(category)
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

    self.showMessage = function(Message)
    {
        var
            $msgBubble = (new Agit.TemplateFactory()).get('.message-bubble'),
            removeThisBubble = function(){ removeBubble($msgBubble) };

        window.setTimeout(function(){
            $msgBubble
                .addClass(Message.getType())
                .appendTo($parent)
                .find('.icon i.' + Message.getType()).addClass('on').end()
                .find('.msg').text(Message.getText()).end()
                .fadeIn(400)
                .click(removeThisBubble)
                .animate({ opacity:0.9 }, 1000);

            // start disappearing after 10 seconds
            window.setTimeout(removeThisBubble, 10000);
        }, 200);

        if (!$bubbles[Message.getCategory()])
        {
            $bubbles[Message.getCategory()] = [];
        }

        $bubbles[Message.getCategory()].push($msgBubble);
    };


    return self;
};
