ag.ns("ag.ui.elem");

/*
    expects a list of objects describing a languange version, e.g.

    {
        url : "/en",
        name : "english",
        isCurrent : false
    }
 */

ag.ui.elem.LanguageMenuEntry = function(languages)
{
    this.extend(this, ag.ui.tool.tpl("agitui-page", ".languages"));

    var list = this.find("ul");

    Object.keys(languages).forEach(function(name){
        var
            lang = languages[name],
            li = ag.ui.tool.tpl("agitui-page", ".language");

        li.find("a").attr("href", lang.url).text(lang.name).addClass(lang.isCurrent ? "current" : "");
        list.append(li);
    });
};

ag.ui.elem.LanguageMenuEntry.prototype = Object.create(ag.ui.elem.MenuEntry.prototype);
