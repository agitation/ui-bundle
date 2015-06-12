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
    private $PageService;

    private $LocaleService;

    private $LanguageRepository;

    public function __construct(PageService $PageService, LocaleService $LocaleService, LanguageRepository $LanguageRepository = null)
    {
        $this->PageService = $PageService;
        $this->LocaleService = $LocaleService;
        $this->LanguageRepository = $LanguageRepository;
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
        return $this->PageService->createUrl($vPath, $context['locale']);
    }

    public function getPageLocaleUrls($context)
    {
        $list = [];

        if (isset($context['localeUrls']))
        {
            if (is_null($this->LanguageRepository))
                throw new InternalErrorException(sprintf("The %s function needs the LanguageRepository.", __METHOD__));

            $localeList = $this->LocaleService->getActiveLocales();
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
                $Language = $this->LanguageRepository->find($lang);

                if ($Language)
                {
                    $name = $Language->getLocalName();

                    if (count($languageCountryMap[$lang]) > 1)
                        $name .= " ($country)";

                    $list[$locale] = [
                        'url' => $url,
                        'name' => $name,
                        'isCurrent' => $locale === $this->LocaleService->getLocale()
                    ];
                }
            }
        }

        if (class_exists('Collator'))
        {
            $Collator = new \Collator($this->LocaleService->getLocale());
            usort($list, function($elem1, $elem2) use ($Collator) {
                return $Collator->compare($elem1['name'], $elem2['name']);
            });
        }

        return $list;
    }

    private function sortList($List)
    {
        if (class_exists('Collator'))
        {
            $Collator = new \Collator($this->LocaleService->getLocale());
            $Collator->asort($List);
        }
        else
        {
            asort($List);
        }

        return $List;
    }
}
