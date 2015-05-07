<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\Service;

/**
 * May be implemented by a bundle to provide a service for selecting UI languages.
 * The service must have the tag `agit.ui.lang.provider` and implement this interface.
 *
 * NB: The *active* locales are not the *available* locales, and the *primary* locale
 * is not the *default* locale – i.e. we cannot use the Intl/LocaleService here.
 */
interface UiLocaleProviderInterface
{
    public function getActiveLocales();

    public function getPrimaryLocales();
}