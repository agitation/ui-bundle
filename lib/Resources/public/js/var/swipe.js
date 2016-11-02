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
                pos = ev.originalEvent.touches[0],
                diffX = pos.screenX - origPos.screenX,
                diffY = pos.screenY - origPos.screenY;

            return (
                (direction === "left" && diffX < minLength * -1 && Math.abs(diffY) < maxDeviation) ||
                (direction === "right" && diffX > minLength && Math.abs(diffY) < maxDeviation) ||
                (direction === "up" && diffY < minLength * -1 && Math.abs(diffX) < maxDeviation) ||
                (direction === "down" && diffY > minLength && Math.abs(diffX) < maxDeviation)
            );
        };

    elem.on("touchstart", function(ev) {
        isPressed = true;
        ev.preventDefault();
        origPos = ev.originalEvent.touches[0];
    });

    elem.on("touchend", function(ev) {
        if (isPressed && haveMatch(ev))
        {
            isPressed = false;
            callback(ev);
        }
    });

    return true;
};
