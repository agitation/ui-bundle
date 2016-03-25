agit.ns("agit.misc");


agit.misc.Modal = function()
{
    var $modal = agit.tool.tpl('div.modal');

    $modal.setTitle = function($elem)
    {
        var $header = $modal.find('.modal-header');

        if ($elem)  { $header.find('h4').html($elem); }
        else        { $header.hide(); }

        return $modal;
    };

    $modal.setContent = function($elem)
    {
        $modal.find('.modal-body').html($elem);
        return $modal;
    };

    $modal.setFooter = function($elem)
    {
        var $footer = $modal.find('.modal-footer');

        if ($elem)  { $footer.html($elem); }
        else        { $footer.hide(); }

        return $modal;
    };

    $modal.appear = function()
    {
        agit.misc.Overlay.show();

        // the BS's own backdrop is disabled; better use agit.misc.Overlay in the caller
        return $modal.modal({ backdrop: false }).on('hidden.bs.modal', agit.misc.Overlay.hide);
    };

    return $modal;
};

agit.misc.Modal.getButton = function(type, text, callback)
{
    return agit.tool.tpl('.modal-btn.' + type)
        .text(text)
        .click(callback || function(){})
        .button();
};
