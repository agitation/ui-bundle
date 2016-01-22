agit.ns("agit.widget");


agit.widget.Overlay = new (function()
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
            $overlay.css('opacity', 0.4).show();
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
