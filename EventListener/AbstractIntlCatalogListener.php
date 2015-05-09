<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\EventListener;

use Agit\IntlBundle\Event\TranslationFilesRegistrationEvent;
use Agit\CoreBundle\Service\FileCollector;

class AbstractIntlCatalogListener
{
    protected $relCachePath = "agit.ui.cache.intl.templates";

    protected function getCachePath($bundleAlias)
    {
        return sprintf("%s/%s/%s", sys_get_temp_dir(), $this->relCachePath, $bundleAlias);
    }
}
