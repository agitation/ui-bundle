<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\TwigMeta;

class PageConfigTokenExtension extends \Twig_Extension
{
    public function getTokenParsers()
    {
        return [new PageConfigTokenParser()];
    }

    public function getName()
    {
        return 'agit.ui.meta';
    }
}
