**Agitation** is an e-commerce framework, based on Symfony2, focussed on
extendability through plugged-in APIs, UIs, payment modules and other
components.

## AgitUiBundle

The main feature of this bundle is to provide pluggable frontend pages. Pages
can be registered as “plugins”. For that, the AgitUiBundle introduces a meta
notation for Twig templates, allowing self-describing pages.

Such a self describing page contains its position in the navigation tree and the
order among same-level nodes, as well as security information about the required
user capabilities to access the page.

Aside from that, the bundle currently ships Twitter bootstrap, jQuery and several
web fonts. Yes, they should probably be included from dedicated bundles.

### Canonical URLs

Agitation UI pages support canonical URLs. Users and search engines are automatically
redirected to the correct URL.

For example, if you have a page `/path/to/contactform`, but the user enters
`/path/to/contactform/` or  `/path/////to///contactform`, they will be
redirected to the correct canonical URL.

### Multi-language pages

If you have activated multiple locales through the
[AgitIntlBundle](https://github.com/agitation/AgitIntlBundle), there will be one
URL per language for each page.

For example: If you have activated the locales  `en_GB` and `de_DE`, with
`en_GB` as your primary locale the page `/path/to/contactform` would also allow
entering `/path/to/contactform/de` (i.e. with the language part of the locale
attached to the URL) into the browser to access the German page.

As a bonus, this feature also supports canonical URLs. If a user would enter
`/path/to/contactform/en`, they would be redirected to `/path/to/contactform` if
your primary locale is `en_GB`.


