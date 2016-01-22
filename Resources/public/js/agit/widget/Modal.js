agit.ns("agit.widget");


agit.widget.Modal = function()
{
    var $modal = agit.common.Template.get('div.modal');

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
        agit.widget.Overlay.show();

        // the BS's own backdrop is disabled; better use agit.widget.Overlay in the caller
        return $modal.modal({ backdrop: false }).on('hidden.bs.modal', agit.widget.Overlay.hide);
    };

    return $modal;
};

agit.widget.Modal.getButton = function(type, text, callback)
{
    return agit.common.Template
        .get('.modal-btn.' + type)
        .text(text)
        .click(callback || function(){})
        .button();
};
