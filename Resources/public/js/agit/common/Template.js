agit.ns("agit.tool");

(function(){
    var
        $body = $("body"),

        uaSupportsTemplateTag = ("content" in document.createElement("template")),

        $templateNodeList,

        createNodeList = function()
        {
            $templateNodeList = [];

            $body.find("template").each(function(){
                if (uaSupportsTemplateTag)
                    $templateNodeList.push($(document.importNode(this.content, true)));
                else
                    $templateNodeList.push($(this));
            });
        };

        // caching already found elements by selector
        foundElements = {};

    agit.tool.tpl = function(selector)
    {
        var $tplElem;

        // extract template nodes on first run
        if (!($templateNodeList instanceof Array))
            createNodeList();

        if (foundElements[selector])
        {
            $tplElem = foundElements[selector];
        }
        else
        {
            $.each($templateNodeList, function(k, $templateNode){
                $tplElem = $templateNode.find(selector);
                if ($tplElem && $tplElem.length) return false; // break on found element
            });

            if (!$tplElem)
                throw new Error("Element not found!");

            foundElements[selector] = $tplElem;
        }

        return $tplElem.clone();
    };
})()
