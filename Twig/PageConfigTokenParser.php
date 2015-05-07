<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\Twig;

class PageConfigTokenParser extends \Twig_TokenParser
{
    public function parse(\Twig_Token $Token)
    {
        $config = [];

        $TokenStream = $this->parser->getStream();
        $dot = $TokenStream->expect(\Twig_Token::PUNCTUATION_TYPE)->getValue();
        $field = $TokenStream->expect(\Twig_Token::NAME_TYPE)->getValue();
        $value = $TokenStream->expect(\Twig_Token::STRING_TYPE)->getValue();
        $TokenStream->expect(\Twig_Token::BLOCK_END_TYPE);

        $config[$field] = $value;

        return new PageConfigNode($config, $Token->getLine(), $this->getTag());
    }

    public function getTag()
    {
        return 'agit';
    }
}