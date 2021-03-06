ag.ns("ag.ui.tool");

(function(){

var createNodeList = function()
    {
        var uaSupportsTemplateTag = ("content" in document.createElement("template"));

        templates = {};

        $("body").find("template").each(function(){
            var
                $tpl = $(this),
                id = $tpl.attr("id");

            if (uaSupportsTemplateTag)
                templates[id] = $(document.importNode(this.content, true));
            else
                templates[id] = $tpl;
        });
    },

    templates,

    // caching already found elements by selector
    foundElements = {};

ag.u.tpl = function(template, selector)
{
    var elem;

    // extract template nodes on first run
    templates || createNodeList();

    if (foundElements[template] && foundElements[template][selector])
    {
        elem = foundElements[template][selector];
    }
    else
    {
        if (!templates[template])
            throw new Error(ag.u.sprintf("Template `%s` not found!", template));

        elem = templates[template].find(selector);

        if (!elem || !elem.length)
            throw new Error(ag.u.sprintf("Element `%s` in template `%s` not found!", selector, template));

        foundElements[template] = foundElements[template] || {};
        foundElements[template][selector] = elem;
    }

    return elem.clone();
};

})();
