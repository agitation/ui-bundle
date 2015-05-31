<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\Service;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpFoundation\Response;
use Agit\CoreBundle\Pluggable\Strategy\Cache\CacheLoader;
use Agit\CoreBundle\Exception\InternalErrorException;
use Agit\CoreBundle\Service\UrlService;
use Agit\UserBundle\Service\UserService;
use Agit\IntlBundle\Service\LocaleService;
class PageService
{
    private $CacheLoader;

    private $UrlService;

    private $UserService;

    private $pages = [];

    private $primaryLocale;

    private $activeLocales;

    public function __construct(CacheLoader $CacheLoader, UrlService $UrlService, LocaleService $LocaleService, UserService $UserService = null)
    {
        $this->CacheLoader = $CacheLoader;
        $this->UserService = $UserService;
        $this->UrlService = $UrlService;
        $this->primaryLocale = $LocaleService->getPrimaryLocale();
        $this->activeLocales = $LocaleService->getActiveLocales();
        $this->pages = $this->CacheLoader->loadPlugins();
    }

    public function parseRequest($request)
    {
        $reqParts = preg_split('|/+|', $request, null, PREG_SPLIT_NO_EMPTY);
        $lang = end($reqParts);
        $locale = $this->getLocaleFromLangId($lang);
        if ($locale) array_pop($reqParts);

        $vPath = '/' . implode('/', $reqParts);
        $pageType = 'page';

        if (!$this->isPage($vPath))
        {
            $pageType = 'special';
            $vPath = '_notfound';
        }

        if (!$locale || !in_array($locale, $this->activeLocales))
            $locale = $this->primaryLocale;

        $reqDetails = [
            'request' => $request,
            'vPath' => $vPath,
            'locale' => $locale
        ];

        if ($pageType !== 'special')
        {
            $reqDetails['localeUrls'] = [];
            foreach ($this->activeLocales as $activeLocale)
                $reqDetails['localeUrls'][$activeLocale] = $this->createUrl($vPath, $activeLocale);

            $reqDetails['canonical'] = parse_url($reqDetails['localeUrls'][$locale], PHP_URL_PATH);
        }

        return $reqDetails;
    }

    public function createUrl($vPath, $locale, array $params = [])
    {
        $parts = [];
        $vPath = trim($vPath, '/');

        if ($vPath)
            $parts[] = $vPath;

        if ($locale && $locale !== $this->primaryLocale && in_array($locale, $this->activeLocales))
            $parts[] = substr($locale, 0, 2);

        return $this->UrlService->createFrontendUrl(implode('/', $parts), $params);
    }

    public function createRedirectResponse($url, $status = 302)
    {
        $Response = new Response(sprintf("<a href='%s'>%s</a>", htmlentities($url), 'Click here to continue.'), $status);
        $Response->headers->set('Location', $url);
        $Response->headers->set("Cache-Control", "no-cache, must-revalidate, max-age=0", true);
        $Response->headers->set("Pragma", "no-store", true);

        return $Response;
    }

    public function loadPage($vPath)
    {

        if (!$this->isPage($vPath))
        {
            $page = $this->getPage('_notfound');
        }
        else
        {
            $page = $this->getPage($vPath);

            if ($page['isVirtual'])
                $page = $this->getPage('_notfound');

            elseif ($page['caps'] && (!$this->UserService || !$this->UserService->currentUserCan($page['caps'])))
                $page = $this->getPage('_unauthorized');
        }

        return $page;
    }

    public function isPage($vPath)
    {
        return isset($this->pages[$vPath]);
    }

    public function getPage($vPath)
    {
        if (!$this->isPage($vPath))
            throw new InternalErrorException("Page does not exist. Use 'isPage()' if you are unsure!");

        return $this->pages[$vPath];
    }

    // creates a hierachical representation
    public function getTree($prefix)
    {
        return $this->createTree($this->pages, $prefix);
    }

    private function getLocaleFromLangId($string)
    {
        $locale = null;

        if (is_string($string) && strlen($string) === 2)
        {
            foreach ($this->activeLocales as $activeLocale)
            {
                if (substr($activeLocale, 0, 2) === $string)
                {
                    $locale = $activeLocale;
                    break;
                }
            }
        }

        return $locale;
    }

    // NOTE: If the $prefix ends with a slash, the "root" page will be omitted, otherwise included.
    private function createTree($pages, $prefix = '/')
    {
        ksort($pages);
        $tree = array();

        foreach ($pages as $vPath => $details)
        {
            if ($vPath[0] === '_' || strpos($vPath, $prefix) !== 0) continue;

            $vPathParts = array_filter(explode('/', trim(substr($vPath, strlen($prefix)), '/')));
            $totalDepth = count($vPathParts);
            $curDepth = 0;

            // root index page
            if (count($vPathParts) === 0)
            {
                $tree[''] = ['data' => $details, 'children'=>[]];
            }
            else
            {
                $curBranch = &$tree;

                foreach ($vPathParts as $part)
                {
                    ++$curDepth;

                    if (!isset($curBranch[$part]))
                        $curBranch[$part] = [];

                    if ($curDepth === $totalDepth)
                    {
                        $curBranch[$part]['data'] = $details;
                    }
                    else
                    {
                        if (!isset($curBranch[$part]['children']))
                            $curBranch[$part]['children'] = [];

                        $curBranch = &$curBranch[$part]['children'];
                    }
                }
            }
        }

        return $tree;
    }
}
