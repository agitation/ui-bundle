<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\Twig;

use Agit\ApiBundle\Service\ObjectService;
use Agit\CoreBundle\Exception\InternalErrorException;
use Agit\CoreBundle\Helper\StringHelper;
use Agit\ApiBundle\Api\Meta\Property\Name;

class ApiFormBuilderExtension extends \Twig_Extension
{
    private $ApiObjectService;

    private $TwigTemplate;

    private $formTemplatePath = 'AgitUiBundle:Include:include.form.html.twig';

    private $knownFormTypes = ['text', 'integer', 'float', 'radio', 'checkbox', 'select', 'textarea'];

    private $idPrefix;

    private $idCounter = 0;

    public function __construct(\Twig_Environment $Twig, ObjectService $ApiObjectService)
    {
        $this->Twig = $Twig;
        $this->ApiObjectService = $ApiObjectService;
        $this->idPrefix = StringHelper::createRandomString(6);
    }

    public function getName()
    {
        return 'agit.ui.form.builder';
    }

    public function getFunctions()
    {
        return [
            'buildApiObjectForm' => new \Twig_Function_Method($this, 'buildApiObjectForm',  ['is_safe' => ['all']])
        ];
    }

    public function buildApiObjectForm($objectName)
    {
        if (strpos($objectName, '\\') !== false)
            $objectName = $this->ApiObjectService->getObjectNameFromClass($objectName);

        $TwigTemplate = $this->Twig->loadTemplate($this->formTemplatePath);
        $Object = $this->ApiObjectService->createObject($objectName);
        $defaultValues = $Object->getValues();
        $form = '';

        foreach ($defaultValues as $propName => $propValue)
        {
            $Type = $Object->getPropertyMeta($propName, 'Type');
            $renderData = ['id' => $this->createId(), 'name' => $propName];
            $element = '';

            if ($Type->getType() === 'string')
            {
                if ($Type->get('allowedValues'))
                {
                    $element = $TwigTemplate->renderBlock('select', $renderData + [
                        'values' => array_map([$this, 'filterName'], $Type->get('allowedValues')),
                        'default' => $propValue
                    ]);
                }
                else
                {
                    $element = $TwigTemplate->renderBlock('textInput', $renderData + [
                        'default' => $propValue,
                        'maxLength' => $Type->get('maxLength')
                    ]);
                }
            }
            elseif ($Type->getType() === 'number')
            {
                $element = $TwigTemplate->renderBlock('numberInput', $renderData + [
                    'default' => $propValue,
                    'minValue' => $Type->get('minValue'),
                    'maxValue' => $Type->get('maxValue'),
                    'allowFloat' => $Type->get('allowFloat')
                ]);
            }
            elseif ($Type->getType() === 'boolean')
            {
                $element = $TwigTemplate->renderBlock('checkbox', $renderData + ['checked' => $propValue]);
            }
            elseif ($Type->getType() === 'array' && $Type->get('allowedValues'))
            {
                $element = $TwigTemplate->renderBlock('multiSelect', $renderData + [
                    'values' => array_map([$this, 'filterName'], $Type->get('allowedValues')),
                    'default' => $propValue
                ]);
            }
            // all other constellations are currently ignored

            if ($element)
            {
                $form .= $TwigTemplate->renderBlock('formrow', [
                    'id' => $renderData['id'],
                    'label' => $Object->getPropertyMeta($propName, 'Name')->getName(),
                    'element' => $element
                ]);
            }
        }

        return $form;
    }

    private function createId()
    {
        return sprintf('%s%04d', $this->idPrefix, ++$this->idCounter);
    }

    private function filterName($value)
    {
        return (is_object($value) && $value instanceof Name)
            ? $value->getName()
            : $value;
    }
}
