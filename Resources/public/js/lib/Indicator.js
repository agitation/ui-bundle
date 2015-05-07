/*jslint bitwise: false, continue: false, debug: false, eqeq: true, es5: false, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: true, undef: false, unparam: true, sloppy: true, stupid: false, sub: false, todo: true, vars: false, white: true, css: false, on: false, fragment: false, passfail: false, browser: true, devel: true, node: false, rhino: false, windows: false, indent: 4, maxerr: 100 */
/*global Tx, $, jQuery, OpenLayers, JSON */

Agit.Indicator = function(_$parent, _isInline, _fixedSize)
{
    var
        parentIsWindow = (_$parent === window),
        $parent = _$parent ? $(_$parent) : null,
        isInline = Agit.toBool(_isInline),
        fixedSize = _fixedSize || false,
        maxSize = 50,

        $indicator = (new Agit.TemplateFactory()).get((isInline ? 'span' : 'div') + '.indicator'),
        $overlay = parentIsWindow ? Agit.Overlay : $indicator.find('.overlay'),

        instanceCount = 0,

        getParentParams = function()
        {
            var offset, params = null;

            if ($parent && $parent.width)
            {
                offset = $parent.offset();

                params =
                {
                    height: $parent.outerHeight(),
                    width: $parent.outerWidth(),
                    top:   (parentIsWindow || !offset) ? 0 : $parent.offset().top,
                    left:  (parentIsWindow || !offset) ? 0 : $parent.offset().left
                };
            }

            return params;
        },

        parentParams = getParentParams(),

        Animator = function()
        {
            var
                $anim = $indicator.find('.anim'),

                setSize = function()
                {
                    var
                        parentSize,
                        size = 0;

                    if (fixedSize)
                    {
                        size = fixedSize;
                    }
                    else if (parentParams)
                    {
                        parentSize = parentParams.height > parentParams.width ? parentParams.width : parentParams.height;
                        parentSize -= parentSize * (isInline ? 0 : 0.3); // 30% padding
                        size = parentSize > maxSize ? maxSize : parentSize;
                    }

                    $anim.css('font-size', size + 'px');

                    if (!isInline)
                    {
                        $anim.css({
                            top:   $indicator.outerHeight() / 2 - $anim.outerHeight() / 2,
                            left:  $indicator.outerWidth() / 2 - $anim.outerWidth() / 2
                        });
                    }
                };


            $anim.start = function()
            {
                setSize();
                return $anim.css('display', isInline ? 'inline-block' : 'block').addClass('on fa-spin');
            };

            $anim.stop = function(outFunc)
            {
                return $anim[outFunc](function(){ $anim.removeClass('on fa-spin'); });
            };

            $anim.resize = function()
            {
                setSize();
                return $anim;
            };

            return $anim;
        },

        $Animator = new Animator(),

        resize = function()
        {
            parentParams = getParentParams(); // reload parent values

            if (parentParams)
            {
                $indicator.css(parentParams); // ind container needs same dimenstions as parent
                $Animator.resize();
            }
        };

    $indicator.start = function()
    {
        ++instanceCount;

        if (parentParams && instanceCount === 1)
        {
            resize();
            $indicator.css('display', isInline ? 'inline-block' : 'block');
            $Animator.start();
            $overlay[isInline ? 'hide' : 'show']();
        }
    };

    $indicator.finish = function(callback)
    {
        var
            outFunc = isInline || parentIsWindow ? 'hide' : 'fadeOut',
            delay = 600; // a little delay to make it feel like "something happened", also to finish the rendering

        window.setTimeout(function() {
            --instanceCount;

            if (!instanceCount)
            {
                $Animator.stop(outFunc);
                $indicator[outFunc]();
                $overlay[outFunc]();
            }

            if (callback) { callback(); }

        }, delay);
    };

    if (parentIsWindow)
    {
        $indicator.addClass('window');
    }

    if ($parent && $parent.resize)
    {
        $parent.resize(function() {
            parentParams = getParentParams();
            resize();
        });

        $indicator.appendTo(isInline ? $parent : $('body'));
    }

    return $indicator;
};
