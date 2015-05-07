/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

Agit.MessageHandler = function()
{
    /**
     * If the handler shows multiple messages at once, this
     * method clears/removes the currently shown messages.
     *
     * If the category parameter is passed, only messages of that
     * category are cleared.
     */
    this.clear = function(category){};

    this.showMessage = function(){};
};
