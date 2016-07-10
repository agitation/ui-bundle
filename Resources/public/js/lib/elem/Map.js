/*globals ol */

ag.ns("ag.ui.elem");

ag.ui.elem.Map = function()
{
    var
        $map = ag.ui.tool.tpl("agitui-map", ".map"),

        olMap = new ol.Map({
            layers : [
                new ol.layer.Tile({
                    source: new ol.source.OSM({ layer: "osm" })
                })
            ],
            controls : ol.control.defaults({ attribution: false }),
            view : new ol.View({
                center : ol.proj.fromLonLat([ 9.58, 51.027 ]),
                zoom : 3
            })
        }),

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
