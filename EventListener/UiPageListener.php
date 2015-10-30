<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\EventListener;

use Agit\CoreBundle\Pluggable\Strategy\Cache\CacheRegistrationEvent;
use Agit\CoreBundle\Exception\InternalErrorException;
use Agit\CoreBundle\Service\FileCollector;
use Agit\UiBundle\TwigMeta\PageConfigNode;

class UiPageListener
{
    private $fileCollector;

    private $twigService;

    private $searchPath;

    private $priority;

    private $availableTypes = ['page' => 'Page', 'special' => 'Special'];

    public function __construct(
        FileCollector $fileCollector,
        \Twig_Environment $twigService,
        $searchPath,
        $priority)
    {
        $this->fileCollector = $fileCollector;
        $this->twigService = $twigService;
        $this->searchPath = $searchPath;
        $this->priority = $priority;
    }

    /**
     * the event listener to be used in the service configuration
     */
    public function onRegistration(CacheRegistrationEvent $registrationEvent)
    {
        // actually, we only have two cache entries, "page" and "special"
        // we collect all pages and sort them into the both of them.

        foreach ($this->availableTypes as $type => $subdir)
        {
            $extension = "html.twig";
            $basePath = $this->fileCollector->resolve("{$this->searchPath}:$subdir");

            foreach ($this->fileCollector->collect($basePath, $extension) as $pagePath)
            {
                $data = $this->getData($type, $subdir, $basePath, $pagePath, $extension);
                $cacheData = $registrationEvent->createContainer();
                $cacheData->setId($data['vPath']);
                $cacheData->setData($data);
                $registrationEvent->register($cacheData, $this->priority);
            }
        }
    }

    protected function getData($type, $subdir, $basePath, $pagePath, $extension)
    {
        $page = str_replace(["$basePath/", ".$extension"], '', $pagePath);

        $data = [
            'type'      => $type,
            'vPath'     => ($type === 'page') ? $this->pageToVirtualPath($page) : '_' . basename($page),
            'template'  => $this->pathToTemplateName($page, $subdir, $extension),
            'order'     => $this->getOrderPosition($page)
        ];

        $config = $this->getConfigFromTemplate($pagePath);

        if (!isset($config['capability']))
            throw new InternalErrorException("Template {$data['template']} does not define capabilities.");

        $data['caps'] = (string)$config['capability'];

        $data['pageId'] = $this->makePageId($data['vPath']); // NOTE: The page ID is unique only within its page set.
        $data['status'] = isset($config['status']) ? (int)$config['status'] : 200;

        $twigTemplate = $this->twigService->loadTemplate($data['template']);
        $hasParent = (bool)$twigTemplate->getParent([]);
        $data['isVirtual'] = !$hasParent; // a rather simple convention, but should be ok for our scenarios
        $data['name'] = $twigTemplate->renderBlock('title', []);

        if ($data['isVirtual'])
            unset($data['template'], $data['pageId']);

        return $data;
    }

    protected function pageToVirtualPath($page)
    {
        $parts = preg_split('|/+|', $page, null, PREG_SPLIT_NO_EMPTY);

        $parts = array_map(function($part) {
            // if the first part is numeric, it is for ordering and must be chopped off
            return preg_replace('|^\d{1,3}\.|', '', $part);
        }, $parts);

        $parts = array_filter($parts, function($part) {
            return ($part !== 'index' && $part !== '');
        });

        return '/' . implode('/', $parts);
    }

    protected function pathToTemplateName($page, $subdir, $extension)
    {
        $nsPath = strstr($this->searchPath, ':', true);
        return "$nsPath:$subdir:$page.$extension";
    }

    protected function getOrderPosition($page)
    {
        $pos = null;
        $parts = preg_split('|/+|', $page, null, PREG_SPLIT_NO_EMPTY);

        if (count($parts))
        {
            $last = array_pop($parts);

            // when it's an index page, then the order must be determined via the parent directory.
            if ($last === 'index' && count($parts))
                $last = array_pop($parts);

            if (preg_match('|^(\d{1,3})\.|', $last, $matches) && is_array($matches) && isset($matches[1]))
                $pos = (int)$matches[1];
        }

        return $pos;
    }

    private function makePageId($vPath)
    {
        $pageFilename = '';
        $pathParts = explode('/', trim($vPath, '/_'));
        $pageFilename .= array_shift($pathParts);
        $pathParts = array_map('ucfirst', $pathParts);
        $pageFilename .= implode('', $pathParts);

        if ($pageFilename === '')
            $pageFilename = 'index';

        return $pageFilename;
    }

    private function getConfigFromTemplate($pagePath)
    {
        $tokenStream = $this->twigService->tokenize(file_get_contents($pagePath));
        $rootNode = $this->twigService->parse($tokenStream);

        return $this->findConfigInNode($rootNode);
    }

    private function findConfigInNode($node)
    {
        $config = [];

        foreach ($node->getIterator() as $childNode)
        {
            if ($childNode instanceof \Twig_Node)
            {
                if ($childNode instanceof PageConfigNode)
                    $config += $childNode->getConfigValues();

                $config += $this->findConfigInNode($childNode);
            }
        }

        return $config;
    }
}
