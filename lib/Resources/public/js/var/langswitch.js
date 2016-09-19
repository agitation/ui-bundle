/*
  NOTE:
    - executes immediately
    - stops the loading of the page
    - Must be inserted AFTER the hreflang links
    - Does not have any lib dependencies (jQuery etc.)
*/

(function(){
    var
        storage = sessionStorage,
        key = "agit.lang",
        autoLang = storage.getItem(key),

        run = function()
        {
            var
                browserLocale = navigator.language.toLowerCase().replace("-", "_"),
                browserLang = browserLocale.substr(0, 2),
                links = document.querySelectorAll("link[rel=alternate][hreflang][href]"),
                availableLanguages = {},
                i = 0,

                switchToLang = function(lang, url)
                {
                    storage.setItem(key, lang);
                    location.href = url;
                };

            for (i; i<links.length; i++)
                availableLanguages[links[i].getAttribute("hreflang").toLowerCase()] = links[i].getAttribute("href");

            if (availableLanguages[browserLocale])
                switchToLang(browserLocale, availableLanguages[browserLocale]);

            else if (availableLanguages[browserLang])
                switchToLang(browserLang, availableLanguages[browserLang]);
        };

    // We will only switch once. If somebody wants to see pages in another
    // language than their preferred one, we won’t stop them.
    autoLang || run();
})();
