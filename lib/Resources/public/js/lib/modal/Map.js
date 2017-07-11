ag.ns("ag.ui.modal");

(function(){
    var
        map = function(lat, lon, zoom)
        {
            ag.ui.modal.Modal.call(this);
            this.addClass("map-modal");

            var self = this,
                latlng = [lat, lon],
                closeBtn = ag.ui.tool.tpl("agitui-modal", ".modal-close").click(function(){
                    self.disappear();
                });

            this.map = new ag.ui.elem.Map();
            this.marker = this.map.createMarker();
            this.marker.setLatLng(latlng);
            this.map.lMap.setView(latlng, zoom || 10);

            this.html([closeBtn, this.map]);
        };

    map.prototype = Object.create(ag.ui.modal.Modal.prototype);

    ag.ui.modal.Map = map;
})();
