ag.ns("ag.ui.field");

(function(){
    var
        attachIcon = function()
        {
            this.after(ag.ui.tool.tpl("agitui-form", ".datepicker-icon"));
        },

        showCalendar = function()
        {
            // determine if we need to align to the input element
            // (if not, we go fullscreen through a media query in the CSS)
            if (this.calContainer.css("position") === "absolute")
            {
                this.calContainer.css({
                    top : this.offset().top + this.outerHeight(),
                    left : this.offset().left
                });
            }

            this.overlay.show();
            this.calContainer.show();
        },

        updateOtherDatepicker = function(otherDatepicker, minRange, maxRange)
        {
            otherDatepicker.setMinDay(this.selDay.diff(minRange));
            otherDatepicker.setMaxDay(this.selDay.diff(maxRange));
        },

        hideCalendar = function()
        {
            this.calContainer.hide();
            this.overlay.hide();
        },

        updateInputField = function()
        {
            this.origVal(this.selDay ? this.selDay.format(ag.intl.t("d/m/Y")) : "");
        },

        datepickerField = function(elem, day, minDay, maxDay)
        {
            var self = this;

            this.extend(this, elem || ag.ui.tool.tpl("agitui-form", ".datepicker"));

            if (elem)
            {
                attachIcon.call(this);
                this.attr("readonly", "readonly");
            }
            else
            {
                this.one("DOMNodeInserted", attachIcon.bind(this));
            }

            this.calendar = new ag.ui.field.Calendar(day, minDay, maxDay);
            this.calContainer = $("<div class='dp-cal'>").append(this.calendar);
            this.overlay = $("<div class='datepicker-overlay'>");

            this.focus(function() { showCalendar.call(self); });
            this.overlay.click(function() { hideCalendar.call(self); });

            $("body").append([this.overlay, this.calContainer]);

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

    datepickerField.prototype = Object.create(ag.ui.field.NativeField.prototype);

    datepickerField.prototype.setValue = function(value)
    {
        if ((!this.minDay || this.selDay.compare(this.minDay) > 0) && (!this.maxDay || this.selDay.compare(this.maxDay) < 0))
        {
            this.selDay = new ag.common.Date(value);
            this.calendar.setValue(this.selDay);
            updateInputField.call(this);
            this.trigger("change"); // TODO: migrate to listening to ag.field.set
        }

        return this.triggerHandler("ag.field.set");
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

    // useful to combine two datepickers to select a period
    datepickerField.prototype.connectWith = function(otherDatepicker, minRange, maxRange)
    {
        minRange = minRange || 0;
        maxRange = maxRange || 365;
        updateOtherDatepicker.call(this, otherDatepicker, minRange, maxRange);
        this.change(updateOtherDatepicker.bind(this, otherDatepicker, minRange, maxRange));
    };

    ag.ui.field.Datepicker = datepickerField;
})();
