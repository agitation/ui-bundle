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
    private $FileCollector;

    private $TwigService;

    public function __construct(FileCollector $FileCollector, \Twig_Environment $TwigService)
    {
        $this->FileCollector = $FileCollector;
        $this->TwigService = $TwigService;
    }

    public function create($searchPath, $priority = 100)
    {
        return new UiPageListener($this->FileCollector, $this->TwigService, $searchPath, $priority);
    }
}