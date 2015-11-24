/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Tx, $, jQuery, OpenLayers, JSON */

Agit.Modal = function()
{
    var $modal = Agit.Template.get('div.modal');

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
        Agit.Overlay.show();

        // the BS's own backdrop is disabled; better use Agit.Overlay in the caller
        return $modal.modal({ backdrop: false }).on('hidden.bs.modal', Agit.Overlay.hide);
    };

    return $modal;
};

Agit.Modal.getButton = function(type, text, callback)
{
    return Agit.Template
        .get('.modal-btn.' + type)
        .text(text)
        .click(callback || function(){})
        .button();
};
