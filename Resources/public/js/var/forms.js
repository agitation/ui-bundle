/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Agit, $, jQuery */

if (window.jQuery)
{
    (function($) {

        // NOTE: _setValue and _getValue should only be used by a form field
        // instance itself, usually overwriting its own val() method.

        // copying .val() to a different key, because it’s likely to be overridden
        // when we call it in _setValue and _getValue
        $.fn._origVal = $.fn.val;

        $.fn._setValue = function(origValue)
        {
            var
                $field = $(this),
                value = origValue;

            if (value !== undefined)
            {
                if ($field.is("input[type=radio]"))
                {
                    // NB: we expect the complete set of radio inputs in this case
                    $field.filter("[value="+value+"]").attr("checked", "checked");
                }
                else if ($field.is("input[type=checkbox]"))
                {
                    $field.attr("checked", (!value || value === "0") ? false : true);
                }
                else if ($field.is("select[multiple=multiple]"))
                {
                    $field._origVal($.isArray(value) ? value : [value]);
                }
                else
                {
                    if ($field.is("select") && value === null)
                    {
                        value = $field.find($field.children("option[selected]").length ? "option[selected]" : "option:first-child").attr("value");
                    }

                    $field._origVal(value);
                }
            }

            return this;
        };

        $.fn._getValue = function()
        {
            var value = null, $field = $(this);

            // getting the value ...

            if ($field.is("input[data-callback=true]"))
            {
                value = $field.getValue();
            }
            else if ($field.is("input[type=radio]"))
            {
                value = $("input[name="+$field.attr("name")+"]:checked")._origVal();
            }
            else if ($field.is("input[type=checkbox]"))
            {
                value = $field.is(":checked");
            }
            else if ($field.is("input, textarea, select"))
            {
                value = $field._origVal();
            }

            // typecasting ...

            if ($field.is("*[data-type=int]"))
            {
                if ($field.is("select[multiple=multiple]") && value === null)
                {
                    value = [];
                }
                else
                {
                    value = ($.isArray(value)) ? value.map(Agit.toInt) : Agit.toInt(value);
                }
            }
            else if ($field.is("*[data-type=float]"))
            {
                value = ($.isArray(value)) ? value.map(Agit.toFloat) : Agit.toFloat(value);
            }
            else if ($field.is("*[data-type=bool]"))
            {
                value = ($.isArray(value)) ? value.map(Agit.toBool) : Agit.toBool(value);
            }

            if (((value === 0 || value === "0") && $field.is("*[data-zero-is-null=true]")) || ((value === "") && $field.is("*[data-empty-is-null=true]")))
            {
                value = null;
            }

            return value;
        };

        $.fn.disable = function()
        {
            return $(this).attr("disabled", "disabled");
        };

        $.fn.enable = function()
        {
            return $(this).attr("disabled", false);
        };

        $.fn.clear = function()
        {
            return $(this).filter("input[type=text], input[type=password], input[type=number], textarea").setValue("");
        };


        // collects all form field values within a container element
        $.fn.getValues = function()
        {
            var values = {};

            $(this).find("input[name], select[name], textarea[name]").each(function(){
                var
                    $field = $(this),
                    name = $field.attr("name");

                if ($field.attr("data-ignore") !== "true" && name)
                    values[name] = $field._getValue();
            });

            return values;
        };

        // collects all form field values within a container element
        $.fn.setValues = function(values)
        {
            var $form = $(this);

            if (values instanceof Object)
            {
                Object.keys(values).forEach(function(key){
                    var $field = $form.find("[name=" + key + "]");

                    if ($field.length && $field.attr("data-ignore") !== "true")
                        $field._setValue(values[key]);
                });
            }

            return $form;
        };

    }(jQuery));
}
