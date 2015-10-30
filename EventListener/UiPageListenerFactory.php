<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\EventListener;

use Agit\CoreBundle\Service\FileCollector;

class UiPageListenerFactory
{
    private $fileCollector;

    private $twigService;

    public function __construct(FileCollector $fileCollector, \Twig_Environment $twigService)
    {
        $this->fileCollector = $fileCollector;
        $this->twigService = $twigService;
    }

    public function create($searchPath, $priority = 100)
    {
        return new UiPageListener($this->fileCollector, $this->twigService, $searchPath, $priority);
    }
}