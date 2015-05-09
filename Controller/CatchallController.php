<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Agit\CoreBundle\Exception\InternalErrorException;
use Agit\UiBundle\Exception\NotFoundException;
use Agit\UiBundle\Exception\UnauthorizedException;

class CatchallController extends Controller
{
    public function dispatcherAction($request)
    {
        $request = "/$request"; // for consistency
        $Response = null;

        $PageService = $this->get('agit.ui.page');
        $LocaleService = $this->get('agit.intl.locale');

        // we'll try to provide error messages in the UA's language until the real locale is set
        $LocaleService->setLocale($LocaleService->getUserLocale());

        $reqDetails = $PageService->parseRequest($request);

        // now set the real locale as requested via URL
        $LocaleService->setLocale($reqDetails['locale']);

        if (isset($reqDetails['canonical']) && $request !== $reqDetails['canonical'])
        {
            parse_str($this->getRequest()->getQueryString(), $query);
            $redirectUrl = $PageService->createUrl($reqDetails['canonical'], '', $query);
            $Response = $PageService->createRedirectResponse($redirectUrl, 301);
        }
        else
        {
            $pageDetails = $PageService->loadPage($reqDetails['vPath']);
            $Response = $this->createResponse($pageDetails, $reqDetails);
        }

        return $Response;
    }

    private function createResponse($pageDetails, $reqDetails)
    {
        $variables = [
            'pageId' => $pageDetails['pageId'],
            'locale' => $reqDetails['locale'],
            'vPath' => $reqDetails['vPath'],
            'summary' => $pageDetails['summary']
        ];

        if (isset($reqDetails['localeUrls']) && isset($reqDetails['localeUrls'][$reqDetails['locale']]))
        {
            $variables['localeUrls'] = $reqDetails['localeUrls'];
            $variables['canonicalUrl'] = $reqDetails['localeUrls'][$reqDetails['locale']];
        }

        $Response = $this->render($pageDetails['template'], $variables);

        $Response->headers->set("X-Frame-Options", "SAMEORIGIN");
        $Response->headers->set("Cache-Control", "no-cache, must-revalidate, max-age=0", true);
        $Response->headers->set("Pragma", "no-store", true);
        $Response->headers->set("X-Content-Type-Options", "nosniff", true);
        $Response->setStatusCode($pageDetails['status']);

        return $Response;
    }
}
