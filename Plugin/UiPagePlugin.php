<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\Plugin;

use Agit\PluggableBundle\Strategy\Cache\CachePlugin;

/**
 * @CachePlugin(tag="agit.ui.pages")
 */
class UiPagePlugin extends AbstractUiPagePlugin
{
    protected function getSearchPath()
    {
        return "AgitUiBundle:Resources:views";
    }
}
