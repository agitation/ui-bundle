$.fn.swipe = function(direction, callback)
{
    var
        elem = $(this),
        minLength = 60, // minimum distance into the desired direction
        maxDeviation = 40, // maximum distance into the diametral direction
        isPressed, origPos,

        haveMatch = function(ev)
        {
            var
                pos = ev.touches[0] || ev.changedTouches[0],
                diffX = pos ? pos.screenX - origPos.screenX : 0,
                diffY = pos ? pos.screenY - origPos.screenY : 0;

            return (
                (direction === "left" && diffX < minLength * -1 && Math.abs(diffY) < maxDeviation) ||
                (direction === "right" && diffX > minLength && Math.abs(diffY) < maxDeviation) ||
                (direction === "up" && diffY < minLength * -1 && Math.abs(diffX) < maxDeviation) ||
                (direction === "down" && diffY > minLength && Math.abs(diffX) < maxDeviation)
            );
        };

    elem.on("touchstart", function(ev) {
        isPressed = true;
        origPos = ev.originalEvent.touches[0];
    });

    elem.on("touchend", function(ev) {
        if (isPressed && haveMatch(ev.originalEvent))
        {
            isPressed = false;
            callback(ev);
        }
    });

    return true;
};
