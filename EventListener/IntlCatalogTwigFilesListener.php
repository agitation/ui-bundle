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

class IntlCatalogTwigFilesListener extends AbstractIntlCatalogListener
{
    protected $cachePath = "/tmp/agit.ui.cache.intl.templates";

    protected $bundleTemplatesPath = 'Resources/views';

    private $FileCollector;

    private $Twig;

    public function __construct(FileCollector $FileCollector,\Twig_Environment $Twig)
    {
        $this->FileCollector = $FileCollector;
        $this->Twig = $Twig;
    }

    public function onRegistration(TranslationFilesRegistrationEvent $RegistrationEvent)
    {
        $bundleAlias = $RegistrationEvent->getBundleAlias();
        $tplDir = $this->FileCollector->resolve($bundleAlias);
        $fileList = [];

        // storing the old values to reset them when we're done
        $actualCachePath = $this->Twig->getCache();
        $actualAutoReload = $this->Twig->isAutoReload();

        // setting temporary values
        $this->Twig->enableAutoReload();
        $this->Twig->setCache($this->getCachePath($bundleAlias));

        foreach ($this->FileCollector->collect($tplDir, 'html.twig') as $file)
        {
            // converting path to twig template ID
            $tplName = str_replace($tplDir, '', $file);
            $tplName = str_replace("{$this->bundleTemplatesPath}/", '', $tplName);
            $tplName = str_replace('/', ':', $tplName);
            $tplName = "$bundleAlias:$tplName";

            $ret = $this->Twig->loadTemplate($tplName);
            $cacheFilePath = $this->Twig->getCacheFilename($tplName);

            $fileList[$tplName] = $cacheFilePath;
        }

        // resetting original values
        $this->Twig->setCache($actualCachePath);
        call_user_func([$this->Twig, $actualAutoReload ? 'enableAutoReload' :  'disableAutoReload']);

        $RegistrationEvent->registerCatalogFiles('php', $fileList);
    }
}
