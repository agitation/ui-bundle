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
use Agit\LocaleDataBundle\Entity\LocaleRepository;

class PageContentExtension extends \Twig_Extension
{
    private $LocaleService;

    private $LocaleRepository;

    public function __construct(LocaleService $LocaleService, LocaleRepository $LocaleRepository = null)
    {
        $this->LocaleService = $LocaleService;
        $this->LocaleRepository = $LocaleRepository;
    }

    public function getName()
    {
        return 'agit.ui.pagecontent';
    }

    public function getFunctions()
    {
        return [
            'getPageLocaleUrls' => new \Twig_Function_Method($this, 'getPageLocaleUrls',  ['needs_context' => true, 'is_safe' => ['all']])
        ];
    }

    public function getPageLocaleUrls($context)
    {
        $list = [];

        if (isset($context['localeUrls']))
        {
            if (is_null($this->LocaleRepository))
                throw new InternalErrorException(sprintf("The %s function needs the LocaleRepository.", __METHOD__));

            $LocaleList = $this->LocaleService->getActiveLocales();

            foreach ($context['localeUrls'] as $locale => $url)
                if (in_array($locale, $LocaleList))
                    $list[$locale] = [
                        'url' => $url,
                        'name' => $this->LocaleRepository->find($locale)->getLocalName(),
                        'isCurrent' => $locale === $this->LocaleService->getLocale()
                    ];
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
