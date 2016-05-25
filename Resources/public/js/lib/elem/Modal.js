ag.ns("ag.ui.elem");


ag.ui.elem.ModalMessageHandler = function()
{
    var $modal = ag.ui.tool.tpl("agitui-modal", "div.modal");

    $modal.setTitle = function($elem)
    {
        var $header = $modal.find(".modal-header");

        if ($elem)  { $header.find("h4").html($elem); }
        else        { $header.hide(); }

        return $modal;
    };

    $modal.setContent = function($elem)
    {
        $modal.find(".modal-body").html($elem);
        return $modal;
    };

    $modal.setFooter = function($elem)
    {
        var $footer = $modal.find(".modal-footer");

        if ($elem)  { $footer.html($elem); }
        else        { $footer.hide(); }

        return $modal;
    };

    $modal.appear = function()
    {
        ag.ui.elem.Overlay.show();

        // the BS"s own backdrop is disabled; better use ag.ui.elem.Overlay in the caller
        return $modal.modal({ backdrop: false }).on("hidden.bs.modal", ag.ui.elem.Overlay.hide);
    };

    return $modal;
};

ag.ui.elem.ModalMessageHandler.getButton = function(type, text, callback)
{
    return ag.ui.tool.tpl("agitui-modal", ".modal-btn." + type)
        .text(text)
        .click(callback || function(){})
        .button();
};
