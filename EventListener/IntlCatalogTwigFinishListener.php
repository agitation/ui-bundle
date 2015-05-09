<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\EventListener;

use Agit\IntlBundle\Event\CatalogFinishedEvent;
use Symfony\Component\Filesystem\Filesystem;

class IntlCatalogTwigFinishListener extends AbstractIntlCatalogListener
{
    private $Filesystem;

    public function __construct(Filesystem $Filesystem)
    {
        $this->Filesystem = $Filesystem;
    }

    public function onRegistration(CatalogFinishedEvent $RegistrationEvent)
    {
        $cachePath = $this->getCachePath($RegistrationEvent->getBundleAlias());

        if ($this->Filesystem->exists($cachePath))
            $this->Filesystem->remove($cachePath);
    }
}
