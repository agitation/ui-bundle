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
use Agit\IntlBundle\EventListener\AbstractTemporaryFilesListener;
use Agit\CoreBundle\Service\FileCollector;

class IntlCatalogTwigFilesListener extends AbstractTemporaryFilesListener
{
    protected $bundleTemplatesPath = 'Resources/views';

    private $fileCollector;

    private $twig;

    public function __construct(FileCollector $fileCollector,\Twig_Environment $twig)
    {
        $this->fileCollector = $fileCollector;
        $this->twig = $twig;
    }

    public function onRegistration(BundleFilesRegistrationEvent $registrationEvent)
    {
        $bundleAlias = $registrationEvent->getBundleAlias();
        $tplDir = $this->fileCollector->resolve($bundleAlias);

        // storing the old values to reset them when we're done
        $actualCachePath = $this->twig->getCache();
        $actualAutoReload = $this->twig->isAutoReload();

        // setting temporary values
        $this->twig->enableAutoReload();
        $this->twig->setCache($this->getCachePath($bundleAlias));

        foreach ($this->fileCollector->collect($tplDir, 'twig') as $file)
        {
            $this->twig->loadTemplate($file); // force rendering
            $cacheFilePath = $this->twig->getCacheFilename($file);
            $fileId = str_replace($tplDir, '', $file);
            $registrationEvent->registerSourceFile('php', $fileId, $cacheFilePath);
        }

        // resetting original values
        $this->twig->setCache($actualCachePath);
        call_user_func([$this->twig, $actualAutoReload ? 'enableAutoReload' :  'disableAutoReload']);

    }
}
