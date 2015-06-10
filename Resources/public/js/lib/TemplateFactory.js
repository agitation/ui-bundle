/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Tx, $, jQuery, OpenLayers, JSON */

Agit.TemplateFactory = function()
{
    var
        $body = $('body'),

        uaSupportsTemplateTag = ('content' in document.createElement('template')),

        $templateNodeList = (function(){
            var list = [];

            $body.find('template').each(function(){

                if (uaSupportsTemplateTag)
                {
                    list.push($(document.importNode(this.content, true)));
                }
                else
                {
                    list.push($(this));
                }
            });

            return list;
        })();

    this.get = function(selector)
    {
        var $elem;

        $.each($templateNodeList, function(k, $templateNode){
            $elem = $templateNode.find(selector);
            if ($elem && $elem.length) { return false; } // break on found element
        });

        return $elem ? $elem.clone() : null;
    };
};

Agit.TemplateFactory.get = function(selector)
{
    if (Agit.TemplateFactory._instance === undefined)
    {
        Agit.TemplateFactory._instance = new Agit.TemplateFactory();
    }

    return Agit.TemplateFactory._instance.get(selector);
};
