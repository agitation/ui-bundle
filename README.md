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
