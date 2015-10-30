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

class PageContentExtension extends \Twig_Extension
{
    private $pageService;

    private $localeService;

    private $languageRepository;

    public function __construct(PageService $pageService, LocaleService $localeService, LanguageRepository $languageRepository = null)
    {
        $this->pageService = $pageService;
        $this->localeService = $localeService;
        $this->languageRepository = $languageRepository;
    }

    public function getName()
    {
        return 'agit.ui.pagecontent';
    }

    public function getFunctions()
    {
        return [
            'createUrl' => new \Twig_Function_Method($this, 'createUrl', ['needs_context' => true, 'is_safe' => ['all']]),
            'getPageLocaleUrls' => new \Twig_Function_Method($this, 'getPageLocaleUrls', ['needs_context' => true, 'is_safe' => ['all']])
        ];
    }

    // returns the canonical path of the given path
    public function createUrl($context, $vPath)
    {
        return $this->pageService->createUrl($vPath, $context['locale']);
    }

    public function getPageLocaleUrls($context)
    {
        $list = [];

        if (isset($context['localeUrls']))
        {
            if (is_null($this->languageRepository))
                throw new InternalErrorException(sprintf("The %s function needs the LanguageRepository.", __METHOD__));

            $localeList = $this->localeService->getActiveLocales();
            $languageCountryMap = [];

            foreach ($localeList as $localeCode)
            {
                if (strlen($localeCode) !== 5 || $localeCode[2] !== '_') continue;

                $langCode = substr($localeCode, 0, 2);
                $countryCode = substr($localeCode, 3);

                if (!isset($languageCountryMap[$langCode]))
                    $languageCountryMap[$langCode] = [];

                $languageCountryMap[$langCode][] = $countryCode;
            }

            foreach ($context['localeUrls'] as $locale => $url)
            {
                $lang = substr($locale, 0, 2);
                $country = substr($locale, 3);
                $language = $this->languageRepository->find($lang);

                if ($language)
                {
                    $name = $language->getLocalName();

                    if (count($languageCountryMap[$lang]) > 1)
                        $name .= " ($country)";

                    $list[$locale] = [
                        'url' => $url,
                        'name' => $name,
                        'isCurrent' => $locale === $this->localeService->getLocale()
                    ];
                }
            }
        }

        if (class_exists('Collator'))
        {
            $collator = new \Collator($this->localeService->getLocale());
            usort($list, function($elem1, $elem2) use ($collator) {
                return $collator->compare($elem1['name'], $elem2['name']);
            });
        }

        return $list;
    }

    private function sortList($list)
    {
        if (class_exists('Collator'))
        {
            $collator = new \Collator($this->localeService->getLocale());
            $collator->asort($list);
        }
        else
        {
            asort($list);
        }

        return $list;
    }
}
