Agit.Map = function()
{
    var
        $map = Agit.Template.get(".map"),

        olMap = new ol.Map({
            layers : [
                new ol.layer.Tile({
                    source: new ol.source.MapQuest({ layer: "osm" })
                })
            ],
            controls : ol.control.defaults({ attribution: false }),
            view : new ol.View({
                center : ol.proj.fromLonLat([ 9.58, 51.027 ]),
                zoom : 3
            })
        }),

        resize = function()
        {
            olMap.updateSize();
        },

        // TODO: Migrate to MutationObserver as soon as old IEs are extinct
        insertionListener = window.setInterval(function(){
            if ($map.is(":visible"))
            {
                window.clearInterval(insertionListener);
                olMap.setTarget($map[0]);
            }
        }, 250);

    $map.ol = olMap;

    return $map;
};
