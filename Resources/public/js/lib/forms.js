/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

if (window.jQuery)
{
    (function($) {
        $.fn.setFieldValue = function(value)
        {
            var $field = $(this);

            if (value !== undefined)
            {
                if ($field.is('input[type=radio]'))
                {
                    // NB: we expect the complete set of radio inputs in this case
                    $field.filter('[value='+value+']').attr('checked', 'checked');
                }
                else if ($field.is('input[type=checkbox]'))
                {
                    $field.attr('checked', (!value || value === '0') ? false : true);
                }
                else if ($field.is('input, textarea'))
                {
                    if ($field.is('input[data-type=float]') && $field.hasClass('currency') && value !== '')
                    {
                        value = Agit.currencyFormat(value);
                    }
                    else if ($field.is('*[data-type=bool]'))
                    {
                        value = (value === "true" || Agit.toBool(value)) ? '1' : '0';
                    }

                    $field.val(value);
                }
                else if ($field.is('select[multiple=multiple]'))
                {
                    $field.val($.isArray(value) ? value : [value]);
                }
                else if ($field.is('select'))
                {
                    $field.val(value);
                }

                $field.trigger('setFieldValue', value);
            }

            return this;
        };

        $.fn.disable = function()
        {
            return $(this).attr('disabled', 'disabled');
        };

        $.fn.enable = function()
        {
            return $(this).attr('disabled', false);
        };

        $.fn.clear = function()
        {
            return $(this).filter('input[type=text], input[type=password], input[type=number], textarea').setFieldValue('');
        };

        $.fn.getFieldValue = function()
        {
            var value = null, $field = $(this);

            // getting the value ...

            if ($field.is('input[data-callback=true]'))
            {
                value = $field.getValue();
            }
            else if ($field.is('input[type=radio]'))
            {
                value = $('input[name='+$field.attr('name')+']:checked').val();
            }
            else if ($field.is('input[type=checkbox]'))
            {
                value = $field.is(':checked');
            }
            else if ($field.is('input, textarea, select'))
            {
                value = $field.val();
            }

            // typecasting ...

            if ($field.is('*[data-type=int]'))
            {
                if ($field.is('select[multiple=multiple]') && value === null)
                {
                    value = [];
                }
                else
                {
                    value = ($.isArray(value)) ? Agit.arrayMap(Agit.toInt, value) : Agit.toInt(value);
                }
            }
            else if ($field.is('*[data-type=float]'))
            {
                value = ($.isArray(value)) ? Agit.arrayMap(Agit.toFloat, value) : Agit.toFloat(value);
            }
            else if ($field.is('*[data-type=bool]'))
            {
                value = ($.isArray(value)) ? Agit.arrayMap(Agit.toBool, value) : Agit.toBool(value);
            }

            if (((value === 0 || value === '0') && $field.is('*[data-zero-is-null=true]')) || ((value === '') && $field.is('*[data-empty-is-null=true]')))
            {
                value = null;
            }

            return value;
        };
    }(jQuery));
}
