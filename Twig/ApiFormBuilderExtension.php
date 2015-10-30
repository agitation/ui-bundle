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
    private $apiObjectService;

    private $twigTemplate;

    private $formTemplatePath = 'AgitUiBundle:Include:formbuilder.html.twig';

    private $knownFormTypes = ['text', 'integer', 'float', 'radio', 'checkbox', 'select', 'textarea'];

    private $idPrefix;

    private $idCounter = 0;

    public function __construct(\Twig_Environment $twig, ObjectService $apiObjectService)
    {
        $this->twig = $twig;
        $this->apiObjectService = $apiObjectService;
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
            $objectName = $this->apiObjectService->getObjectNameFromClass($objectName);

        $twigTemplate = $this->twig->loadTemplate($this->formTemplatePath);
        $object = $this->apiObjectService->createObject($objectName);
        $defaultValues = $object->getValues();
        $form = '';

        foreach ($defaultValues as $propName => $propValue)
        {
            $type = $object->getPropertyMeta($propName, 'Type');
            $renderData = ['id' => $this->createId(), 'name' => $propName];
            $element = '';

            if ($type->getType() === 'string')
            {
                if ($type->get('allowedValues'))
                {
                    $element = $twigTemplate->renderBlock('select', $renderData + [
                        'values' => array_map([$this, 'filterName'], $type->get('allowedValues')),
                        'default' => $propValue
                    ]);
                }
                else
                {
                    $element = $twigTemplate->renderBlock('textInput', $renderData + [
                        'default' => $propValue,
                        'maxLength' => $type->get('maxLength')
                    ]);
                }
            }
            elseif ($type->getType() === 'number')
            {
                $element = $twigTemplate->renderBlock('numberInput', $renderData + [
                    'default' => $propValue,
                    'minValue' => $type->get('minValue'),
                    'maxValue' => $type->get('maxValue'),
                    'allowFloat' => $type->get('allowFloat')
                ]);
            }
            elseif ($type->getType() === 'boolean')
            {
                $element = $twigTemplate->renderBlock('checkbox', $renderData + ['checked' => $propValue]);
            }
            elseif ($type->getType() === 'array' && $type->get('allowedValues'))
            {
                $element = $twigTemplate->renderBlock('multiSelect', $renderData + [
                    'values' => array_map([$this, 'filterName'], $type->get('allowedValues')),
                    'default' => $propValue
                ]);
            }
            // all other constellations are currently ignored

            if ($element)
            {
                $form .= $twigTemplate->renderBlock('formrow', [
                    'id' => $renderData['id'],
                    'label' => $object->getPropertyMeta($propName, 'Name')->getName(),
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
