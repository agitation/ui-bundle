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
        return Object.keys(pages).map(function(name){
            var
                page = pages[name],
                elem;

            if (typeof page === "string")
            {
                elem = ag.ui.tool.tpl("agitui-page", ".page");
                elem.find("a").attr("href", page).text(name);
            }
            else
            {
                elem = ag.ui.tool.tpl("agitui-page", ".page-branch");
                elem.find("h3").text(name);
                elem.find("ul").html(createList(page));
            }

            return elem;
        });
    };

navigationMenuEntry.prototype = Object.create(ag.ui.elem.MenuEntry.prototype);

ag.ui.elem.NavigationMenuEntry = navigationMenuEntry;

})();
