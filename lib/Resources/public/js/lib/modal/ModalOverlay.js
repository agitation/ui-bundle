ag.ns("ag.ui.modal");

(function()
{
var ModalOverlay = function()
{
    this.extend(this, $("<div class='modal-overlay'>")).appendTo($("body"));

    this.click(function(ev){
        ev.stopPropagation();
    });
};

ModalOverlay.prototype = Object.create(jQuery.prototype);

ModalOverlay.prototype.appear = function()
{
    ++this.instCount;
    this.instCount === 1 && this.show();
};

ModalOverlay.prototype.disappear = function()
{
    --this.instCount;
    this.instCount <= 0 && this.hide();
};

ModalOverlay.prototype.instCount = 0;

ag.ui.modal.ModalOverlay = ModalOverlay;

})();
