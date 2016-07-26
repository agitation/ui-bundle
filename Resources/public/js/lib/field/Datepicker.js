ag.ns("ag.ui.field");

(function(){
    var
        showCalendar = function()
        {
            // determine if we need to align to the input element
            // (if not, we go fullscreen through a media query in the CSS)
            if (this.$calendar.css("position") === "absolute")
            {
                this.$calendar.css({
                    top : this.offset().top + this.outerHeight(),
                    left : this.offset().left
                });
            }

            this.$overlay.show();
            this.$calendar.show();
        },

        hideCalendar = function()
        {
            this.$calendar.hide();
            this.$overlay.hide();
        },

        updateInputField = function()
        {
            this.origVal(this.selDay ? this.selDay.format(ag.intl.t("d/m/Y")) : "");
        },

        datepickerField = function($elem, day, minDay, maxDay)
        {
            var self = this;

            this.extend(this, $elem || $("<input class='form-control datepicker'>"));

            this.calendar = new ag.ui.field.Calendar(null, day, minDay, maxDay);
            this.$calendar = $("<div class='dp-cal'>").append(this.calendar);
            this.$overlay = $("<div class='datepicker-overlay'>");

            this.focus(function() { showCalendar.call(self); });
            this.$overlay.click(function() { hideCalendar.call(self); });

            $("body").append([this.$overlay, this.$calendar]);

            this.setValue(day || new ag.common.Date());
            minDay && this.setMinDay(minDay);
            maxDay && this.setMaxDay(maxDay);


            this.calendar.change(function(){
                self.selDay = self.calendar.getValue();
                updateInputField.call(self);
                hideCalendar.call(self);
                self.trigger("change");
            });
        };

    datepickerField.prototype = Object.create(ag.ui.field.Field.prototype);

    datepickerField.prototype.setValue = function(value)
    {
        this.selDay = value;
        this.calendar.setValue(value);
        updateInputField.call(this);
        this.trigger("change");

        return this;
    };

    datepickerField.prototype.getValue = function()
    {
        return this.selDay;
    };

    datepickerField.prototype.setMinDay = function(day)
    {
        this.minDay = day;
        this.calendar.setMinDay(this.minDay);

        if (this.selDay.compare(this.minDay) < 0)
        {
            this.selDay = this.minDay;
            updateInputField.call(this);
            this.trigger("change");
        }

        return this;
    };

    datepickerField.prototype.setMaxDay = function(day)
    {
        this.maxDay = day;
        this.calendar.setMaxDay(this.maxDay);

        if (this.selDay.compare(this.maxDay) > 0)
        {
            this.selDay = this.maxDay;
            updateInputField.call(this);
            this.trigger("change");
        }

        return this;
    };

    ag.ui.field.Datepicker = datepickerField;
})();