ag.ns("ag.ui.elem");

(function(){

var
    navigationMenuEntry = function(pages)
    {
        this.extend(this, ag.ui.tool.tpl("agitui-page", ".navigation"));
        this.find("ul").html(createList(pages));
    },

    createList = function(pages)
    {
        return Object.keys(pages).map(function(vPath){
            var page = pages[vPath], elem;

            if (page.children)
            {
                elem = ag.ui.tool.tpl("agitui-page", ".page-branch");
                elem.find("h3 span").text(page.name);
                elem.find("ul").html(createList(page.children));
            }
            else
            {
                elem = ag.ui.tool.tpl("agitui-page", ".page");
                elem.find("a").attr("href", ag.tool.createUrl(vPath)).find("span").text(page.name);
            }

            return elem.addClass(page.attr || "");
        });
    };

navigationMenuEntry.prototype = Object.create(ag.ui.elem.MenuEntry.prototype);

ag.ui.elem.NavigationMenuEntry = navigationMenuEntry;

})();
