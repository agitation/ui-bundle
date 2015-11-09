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
use Agit\CommonBundle\Exception\InternalErrorException;
use Agit\UiBundle\Exception\NotFoundException;
use Agit\UiBundle\Exception\UnauthorizedException;

class CatchallController extends Controller
{
    public function dispatcherAction($request)
    {
        $request = "/$request"; // for consistency
        $response = null;

        $pageService = $this->get('agit.ui.page');
        $localeService = $this->get('agit.intl.locale');

        // we'll try to provide error messages in the UA's language until the real locale is set
        $localeService->setLocale($localeService->getUserLocale());

        $reqDetails = $pageService->parseRequest($request);

        // now set the real locale as requested via URL
        $localeService->setLocale($reqDetails['locale']);

        if (isset($reqDetails['canonical']) && $request !== $reqDetails['canonical'])
        {
            parse_str($this->getRequest()->getQueryString(), $query);
            $redirectUrl = $pageService->createUrl($reqDetails['canonical'], '', $query);
            $response = $pageService->createRedirectResponse($redirectUrl, 301);
        }
        else
        {
            $pageDetails = $pageService->loadPage($reqDetails['vPath']);
            $response = $this->createResponse($pageDetails, $reqDetails);
        }

        return $response;
    }

    private function createResponse($pageDetails, $reqDetails)
    {
        $variables = [
            'pageId' => $pageDetails['pageId'],
            'locale' => $reqDetails['locale'],
            'vPath' => $reqDetails['vPath']
        ];

        if (isset($reqDetails['localeUrls']) && isset($reqDetails['localeUrls'][$reqDetails['locale']]))
        {
            $variables['localeUrls'] = $reqDetails['localeUrls'];
            $variables['canonicalUrl'] = $reqDetails['localeUrls'][$reqDetails['locale']];
        }

        $response = $this->render($pageDetails['template'], $variables);

        $response->headers->set("X-Frame-Options", "SAMEORIGIN");
        $response->headers->set("Cache-Control", "no-cache, must-revalidate, max-age=0", true);
        $response->headers->set("Pragma", "no-store", true);
        $response->headers->set("X-Content-Type-Options", "nosniff", true);
        $response->setStatusCode($pageDetails['status']);

        return $response;
    }
}
