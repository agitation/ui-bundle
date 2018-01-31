$(document).ready(function() {

var links = $("[rel=canonical], [rel=alternate]"),
    updateLinks = function(state, hash){
        links.each(function(){
            var
                link = $(this),
                href = link.attr("href").split("#")[0];

            link.attr("href", href + hash);
        });
    };

ag.srv("broker").sub("ag.state.change ag.state.update", updateLinks);

updateLinks(null, ag.srv("state").getCurrentHash());

});
