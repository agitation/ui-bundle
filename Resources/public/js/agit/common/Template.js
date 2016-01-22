agit.ns("agit.common");


agit.common.Template = function()
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

agit.common.Template.get = function(selector)
{
    if (agit.common.Template._instance === undefined)
    {
        agit.common.Template._instance = new agit.common.Template();
    }

    return agit.common.Template._instance.get(selector);
};
