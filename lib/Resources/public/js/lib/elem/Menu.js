ag.ns("ag.ui.elem");

(function(){

var
    menu = function(entries)
    {
        this.extend(this, ag.ui.tool.tpl("agitui-page", "nav"));

        var
            list = this.find(".menu"),
            disappear = this.disappear.bind(this);

        this.click(disappear);
        list.swipe("left", disappear);
        ag.srv("broker").sub("ag.state.change", disappear);

        Object.keys(entries).forEach(function(name){
            var entry = entries[name];

            if (entry.is(".primary"))
            {
                entry.children("h2").addClass("lg-hide");
                entry.find("> ul > li").addClass("lg-top");
            }
            else
            {
                entry.addClass("lg-top");
            }

            list.append(entry);
        });

        this.body = $("body").append(this);

        list.click(function(ev){
            ev.stopPropagation(); // don’t propagate clicks to parent, in order to avoid accidential closing
        });
    };

menu.prototype = Object.create(ag.ui.ctxt.Element.prototype);

menu.prototype.appear = function()
{
    this.body.addClass("nav-open");
};

menu.prototype.disappear = function()
{
    this.body.removeClass("nav-open");
};

ag.ui.elem.Menu = menu;

})();
