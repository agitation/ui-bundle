ag.ns("ag.ui.elem");

(function(){
    var
        mapModal = function(lat, lon, zoom)
        {
            zoom = zoom || 10;

            ag.ui.elem.Modal.call(this);

            var
                self = this,
                latlng = [lat, lon],
                closeBtn = ag.ui.tool.tpl("agitui-modal", ".textmodal-close").click(function(){
                    self.disappear();
                });

            this.map = new ag.ui.elem.Map();
            this.elements.header.replaceWith(closeBtn);
            this.elements.main.replaceWith(this.map);
            this.elements.header = closeBtn;
            this.elements.main = this.map;
            this.elements.footer.remove();

            this.addClass("map-modal");

            this.marker = this.map.createMarker();
            this.marker.setLatLng(latlng);
            this.map.lMap.setView(latlng, zoom);
        };

    mapModal.prototype = Object.create(ag.ui.elem.Modal.prototype);

    ag.ui.elem.MapModal = mapModal;
})();
