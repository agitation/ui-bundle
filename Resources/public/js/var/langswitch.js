/* globals Cookies */

/*
  NOTE:
    - executes immediately
    - stops the loading of the page
    - Must be inserted AFTER the hreflang links
    - Depends on cookies.js
    - Does not depend on jQuery
*/

(function(){
    var
        cookieName = "agit.ui.lang.auto",
        autoLang = Cookies.get(cookieName),

        run = function()
        {
            var
                browserLocale = navigator.language.toLowerCase().replace("-", "_"),
                browserLang = browserLocale.substr(0, 2),
                $links = document.querySelectorAll("link[rel=alternate][hreflang][href]"),
                availableLanguages = {},
                i = 0,

                switchToLang = function(lang, url)
                {
                    Cookies.set(cookieName, lang, {path: "/"});
                    window.location.href = url;
                };

            for (i; i<$links.length; i++)
            {
                availableLanguages[$links[i].getAttribute("hreflang").toLowerCase()] = $links[i].getAttribute("href");
            }

            if (availableLanguages[browserLocale])
            {
                switchToLang(browserLocale, availableLanguages[browserLocale]);
            }
            else if (availableLanguages[browserLang])
            {
                switchToLang(browserLang, availableLanguages[browserLang]);
            }
        };

    // We will only switch once. If somebody really wants to see pages
    // in different languages than his preferred one, we won"t stop him.

    if (!autoLang) { run(); }
})();
