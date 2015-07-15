<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\Twig;

use Agit\CoreBundle\Exception\InternalErrorException;
use Agit\IntlBundle\Service\LocaleService;
use Agit\LocaleDataBundle\Entity\LanguageRepository;
use Agit\UiBundle\Service\PageService;

class PageNavigationExtension extends \Twig_Extension
{
    private $PageService;

    private $pages;

    private $cache = [];

    public function __construct(PageService $PageService)
    {
        $this->PageService = $PageService;
    }

    public function getName()
    {
        return 'agit.ui.pagenavigation';
    }

    public function getFunctions()
    {
        return [
            'hasPrev'   => new \Twig_Function_Method($this, 'hasPrev',  ['needs_context' => true]),
            'hasNext'   => new \Twig_Function_Method($this, 'hasNext',  ['needs_context' => true]),
            'getPrev'   => new \Twig_Function_Method($this, 'getPrev',  ['needs_context' => true]),
            'getNext'   => new \Twig_Function_Method($this, 'getNext',  ['needs_context' => true])
        ];
    }

    public function hasPrev($context)
    {
        return (bool)$this->getPrevNext($context['vPath'], -1);
    }

    public function getPrev($context)
    {
        return $this->getPrevNext($context['vPath'], -1);
    }

    public function hasNext($context)
    {
        return (bool)$this->getPrevNext($context['vPath'], 1);
    }

    public function getNext($context)
    {
        return $this->getPrevNext($context['vPath'], 1);
    }

    private function getPrevNext($vPath, $offset)
    {
        $return = null;

        if (isset($this->cache[$vPath]) && isset($this->cache[$vPath][$offset]))
        {
            $return = $this->cache[$vPath][$offset];
        }
        else
        {
            $dir = dirname($vPath) . '/';

            if (is_null($this->pages))
                $this->pages = $this->PageService->getPages();

            $pages = array_filter($this->pages, function($page) use ($dir){
                return (strpos($page['vPath'], $dir) === 0);
            });

            if (isset($pages[$vPath]))
            {
                uasort($pages, function($page1, $page2) {
                    return $page1['order'] - $page2['order'];
                });

                $pagesIdx = array_keys($pages);
                $idxPages = array_flip($pagesIdx);
                $myIdx = $idxPages[$vPath];
                $return = isset($pagesIdx[$myIdx + $offset]) ? $pages[$pagesIdx[$myIdx + $offset]] : null;
            }

            if (!isset($this->cache[$vPath]))
                $this->cache[$vPath] = [];

            $this->cache[$vPath][$offset] = $return;
        }

        return $return;
    }


}
