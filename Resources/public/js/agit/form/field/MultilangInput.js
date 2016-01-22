agit.ns("agit.form.field");

agit.form.field.MultilangInput = function(useTextarea)
{
    var
        $field = agit.common.Template.get(".multilang")
            .find(useTextarea ? "input" : "textarea").remove().end(),

        $input = $field.find("input, textarea"),
        $langTabs = $field.find(".langs a"),
        $currentTab,
        langValues = {},

        collectValues = function()
        {
            var
                lang = $currentTab.data("lang"),
                langText = $input.val().trim();

            if (langText)
                langValues[lang] = langText;
            else
                delete langValues[lang];

            $currentTab[langText ? "addClass" : "removeClass"]("hastext");
        };

    $langTabs.each(function(){
        var
            $tab = $(this),
            lang = $tab.attr("data-locale").substr(0, 2);

        $tab.data("lang", lang);

        $tab.find('span').text(lang);
        langValues[lang] = "";

        $currentTab || ($currentTab = $tab.addClass("current"));

        $tab.on("click", function(){
            $langTabs.removeClass("current");
            $tab.addClass("current");
            $currentTab = $tab;
            $input.val(langValues[lang]);
            $input.focus();
        });
    });

    $input.on("focus", function(){
        $langTabs.removeClass("current");
        $currentTab.addClass("current");
    });

    $input.on("keyup blur", function(ev){
        collectValues();
    });

    $field.val = function(value)
    {
        // setter
        if (value !== undefined)
        {
            var langObject = Agit.L10n.mlStringToObj(value);

            // NOTE: we cannot simply replace langValues with langObject, because
            // langObject may contain obsolete translations, which we would never get rid of.
            // So we play it safe and re-create langValues altogether.

            langValues = {};

            $langTabs.each(function(){
                var
                    $tab = $(this),
                    lang = $tab.data("lang");

                langObject[lang] && (langValues[lang] = langObject[lang]);
                $tab[langObject[lang] ? "addClass" : "removeClass"]("hastext");
            });

            // TODO: re-arrange fields according to the order in the translations object

            $langTabs.sort(function($tab1, $tab2){
                var
                    lang1 = $($tab1).data("lang"),
                    lang2 = $($tab2).data("lang"),
                    text1 = langValues[lang1],
                    text2 = langValues[lang2],
                    retval = 0;

                if (text1 && text2 || (!text1 && !text2))
                {
                    retval = lang1.localeCompare(lang2);
                }
                else if (text1 && !text2)
                {
                    retval = 1;
                }
                else if (!text1 && text2)
                {
                    retval = -1;
                }

                return retval;
            });

            $input.val(langValues[$currentTab.data("lang")]);

            return $field;
        }

        // getter
        else
        {
            collectValues();
            return Agit.L10n.mlObjToString(langValues);
        }
    };

    return $field;
};
