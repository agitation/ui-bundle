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
 * @ExceptionCode("7.1")
 *
 * A page or form was requested which the current user is not allowed to access.
 */
class UnauthorizedException extends AgitException { }