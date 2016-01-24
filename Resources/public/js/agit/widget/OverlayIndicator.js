agit.ns("agit.widget");



agit.widget.OverlayIndicator = (function(){
    var
        Animator = function(parentParams)
        {
            var
                $anim = $("<div class='anim'>"),
                maxSize = 50,

                setSize = function()
                {
                    var
                        parentSize,
                        size = 0;

                    if (parentParams)
                    {
                        parentSize = parentParams.height > parentParams.width ? parentParams.width : parentParams.height;
                        parentSize -= parentSize * 0.1; // 10% padding
                        size = parentSize > maxSize ? maxSize : parentSize;
                    }

                    $anim.css({ height: size + 'px', width : size + 'px' });
                };

            $anim.start = function()
            {
                setSize();
                return $anim.show().addClass('on');
            };

            $anim.stop = function()
            {
                return $anim.fadeOut(function(){ $anim.removeClass('on'); });
            };

            $anim.resize = function()
            {
                setSize();
                return $anim;
            };

            return $anim;
        },

        createIndicator = function(parent)
        {
            var
                indicator = Object.create(agit.api.Indicator),
                parentIsWindow = (parent === window),
                $parent = $(parent),
                $indicator = $('<div class="indicator">'),

                instanceCount = 0, // counts how often *this* instance has been started

                resize = function()
                {
                    parentParams = getParentParams(); // reload parent values

                    if (parentParams)
                    {
                        $indicator.css(parentParams); // ind container needs same dimenstions as parent
                        $animator.resize();
                    }
                },

                getParentParams = function()
                {
                    var
                        offset = $parent ? $parent.offset() : null;

                    return {
                        height: $parent.outerHeight(),
                        width: $parent.outerWidth(),
                        top:   (parentIsWindow || !offset) ? 0 : $parent.offset().top,
                        left:  (parentIsWindow || !offset) ? 0 : $parent.offset().left
                    };
                },

                parentParams = getParentParams(),
                $animator = new Animator(parentParams);

            $animator.appendTo($indicator);

            indicator.start = function()
            {
                ++instanceCount;

                if (parentParams && instanceCount === 1)
                {
                    resize();
                    $indicator.show();
                    $animator.start();
                }
            };

            indicator.finish = function(callback)
            {
                --instanceCount;

                if (!instanceCount)
                {
                    $animator.stop();
                    $indicator.fadeOut();
                }

                if (callback) { callback(); }
            };

            parentIsWindow && $indicator.addClass('window');

            if ($parent && $parent.resize)
            {
                $parent.resize(function() {
                    parentParams = getParentParams();
                    resize();
                });

                $indicator.appendTo(parentIsWindow ? $('body') : $parent);
            }

            return indicator;
        };

    return function($parent)
    {
        return createIndicator($parent);
    };
})();
