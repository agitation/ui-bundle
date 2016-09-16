/*globals L */

ag.ns("ag.ui.elem");

(function(){

var
    map = function()
    {
    this.extend(this, ag.ui.tool.tpl("agitui-map", ".map"));

    var
        self = this,
        lMap = L.map(this[0], {
            center: [ 51.027, 9.58 ],
            zoom: 3
        });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 17
    }).addTo(lMap);

    // TODO: Migrate to MutationObserver as soon as old IEs are extinct
    insertionListener = window.setInterval(function(){
        if (self.is(":visible"))
        {
            window.clearInterval(insertionListener);
            lMap.invalidateSize();
        }
    }, 250);

    this.on("map-container-resize", function(){
        lMap.invalidateSize();
    });

    this.lMap = lMap;
};

map.prototype = Object.create(jQuery.prototype);

map.prototype.createMarker = function()
{
    var icon = L.divIcon();

    icon.createIcon = function() {
        return ag.ui.tool.tpl("agitui-map", ".marker")[0];
    };

    return L.marker([51, 10], {icon : icon}).addTo(this.lMap);

};

ag.ui.elem.Map = map;

})();
