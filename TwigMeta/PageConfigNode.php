<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\TwigMeta;

class PageConfigNode extends \Twig_Node
{
    private $config;

    public function __construct(array $config, $lineno = 0, $tag = null)
    {
        $this->config = $config;
        parent::__construct([], $config, $lineno, $tag);
    }

    public function getConfigValues()
    {
        return $this->config;
    }

    public function getNodeTag()
    {
        return 'agit';
    }
}
