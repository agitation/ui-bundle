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
        $Loader = new \Twig_Loader_Filesystem($tplDir);
        $Twig = new \Twig_Environment($Loader, ['cache' => $this->getCachePath($bundleAlias), 'auto_reload' => true]);
        $fileList = [];

        foreach ($this->Twig->getExtensions() as $extension)
            $Twig->addExtension($extension);

        foreach ($this->FileCollector->collect($tplDir, 'html.twig') as $file)
        {
            $tplName = str_replace($tplDir, '', $file);
            $ret = $Twig->loadTemplate($tplName);
            $cacheFilePath = $Twig->getCacheFilename($tplName);

            $fileList[$tplName] = $cacheFilePath;
        }

        $RegistrationEvent->registerCatalogFiles('php', $fileList);
    }
}
