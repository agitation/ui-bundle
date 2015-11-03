<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\Plugin;

use Agit\PluggableBundle\Strategy\Cache\CacheEntry;
use Agit\PluggableBundle\Strategy\Cache\CachePluginValidatorInterface;
use Agit\CoreBundle\Exception\InternalErrorException;

class UiPagePluginValidator implements CachePluginValidatorInterface
{
    private $properties = ["type", "vPath", "template", "order", "caps", "pageId", "status", "isVirtual", "name"];

    public function validateEntry(CacheEntry $cacheEntry)
    {
        $keys = array_keys($cacheEntry->getData());

        foreach ($keys as $key)
            if (!in_array($key, $this->properties))
                throw new InternalErrorException("The object is missing the mandatory $key property.");
    }
}
