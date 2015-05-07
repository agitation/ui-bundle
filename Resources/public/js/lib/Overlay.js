/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Tx, $, jQuery, OpenLayers, JSON */

Agit.Overlay = new (function()
{
    var $overlay, count = 0;

    this.show = function()
    {
        ++count;

        if (!$overlay)
        {
            $overlay = $("<div class='overlay'>").appendTo($('body'));
        }

        if (count === 1)
        {
            $overlay.css('opacity', 0.5).show();
        }
    };

    this.hide = function()
    {
        --count;

        if (count <= 0 && $overlay)
        {
            $overlay.hide();
        }
    }
})();
