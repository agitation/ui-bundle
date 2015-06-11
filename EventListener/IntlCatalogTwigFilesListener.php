<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\EventListener;

use Agit\IntlBundle\Event\BundleFilesRegistrationEvent;
use Agit\IntlBundle\EventListener\AbstractCatalogListener;
use Agit\CoreBundle\Service\FileCollector;

class IntlCatalogTwigFilesListener extends AbstractCatalogListener
{
    protected $bundleTemplatesPath = 'Resources/views';

    private $FileCollector;

    private $Twig;

    public function __construct(FileCollector $FileCollector,\Twig_Environment $Twig)
    {
        $this->FileCollector = $FileCollector;
        $this->Twig = $Twig;
    }

    public function onRegistration(BundleFilesRegistrationEvent $RegistrationEvent)
    {
        $bundleAlias = $RegistrationEvent->getBundleAlias();
        $tplDir = $this->FileCollector->resolve($bundleAlias);

        // storing the old values to reset them when we're done
        $actualCachePath = $this->Twig->getCache();
        $actualAutoReload = $this->Twig->isAutoReload();

        // setting temporary values
        $this->Twig->enableAutoReload();
        $this->Twig->setCache($this->getCachePath($bundleAlias));

        foreach ($this->FileCollector->collect($tplDir, 'html.twig') as $file)
        {
            $this->Twig->loadTemplate($file); // force rendering
            $cacheFilePath = $this->Twig->getCacheFilename($file);
            $fileId = str_replace($tplDir, '', $file);
            $RegistrationEvent->registerSourceFile('php', $fileId, $cacheFilePath);
        }

        // resetting original values
        $this->Twig->setCache($actualCachePath);
        call_user_func([$this->Twig, $actualAutoReload ? 'enableAutoReload' :  'disableAutoReload']);

    }
}
