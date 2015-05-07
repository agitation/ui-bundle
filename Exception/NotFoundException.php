<?php
/**
 * @package    agitation/ui
 * @link       http://github.com/agitation/AgitUiBundle
 * @author     Alex Günsche <http://www.agitsol.com/>
 * @copyright  2012-2015 AGITsol GmbH
 * @license    http://opensource.org/licenses/MIT
 */

namespace Agit\UiBundle\Exception;

use Agit\CoreBundle\Exception\AgitException;
use Agit\CoreBundle\Exception\ExceptionCode;

/**
 * @ExceptionCode("7.0")
 *
 * A page or form was requested which does not exist.
 */
class NotFoundException extends AgitException { }