$(document).ready(function() {

var links = $("[rel=canonical], [rel=alternate]");

ag.srv("broker").sub("ag.state.init ag.state.change ag.state.update", function(state, hash){
    links.each(function(){
        var
            link = $(this),
            href = link.attr("href").split("#")[0];

        link.attr("href", href + hash);
    });
});

});
