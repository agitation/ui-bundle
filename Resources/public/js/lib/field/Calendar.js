ag.ns("ag.ui.field");

(function(){
    var
        monthNames = ag.ui.tool.date.getMonthNames(),
        weekdayNames = ag.ui.tool.date.getWeekdayNamesShort(),
        dayOffset = ag.ui.tool.date.getFirstDayOfWeek(),

        compareMonths = function(day1, day2)
        {
            var
                d1 = day1.year * 100 + day1.month,
                d2 = day2.year * 100 + day2.month,
                ret = 0;

            if      (d1 > d2)   { ret = 1; }
            else if (d1 < d2)   { ret = -1; }

            return ret;
        },

        renderTable = function()
        {
            var $table = ag.ui.tool.tpl("agitui-calendar", "table");

            fillHeader($table, this);
            fillWeekdays($table);
            fillBody($table, this);

            this.html($table);
        },

        fillHeader = function($table, calInst)
        {
            var
                $prev = $table.find("thead .month .prev"),
                $next = $table.find("thead .month .next"),
                curMonth = new ag.common.Date(calInst.year, calInst.month);

            $table.find("thead .month .name").text(ag.ui.tool.fmt.sprintf("%s %s", monthNames[calInst.month - 1], calInst.year));

            if (calInst.minDay && compareMonths(calInst.minDay, curMonth) >= 0)
                $prev.addClass("inactive");
            else
                $prev.click(function() { switchToPrevMonth.call(calInst); });

            if (calInst.maxDay && compareMonths(calInst.maxDay, curMonth) <= 0)
                $next.addClass("inactive");
            else
                $next.click(function() { switchToNextMonth.call(calInst); });
        },

        fillWeekdays = function($table)
        {
            $table.find("thead .weekdays td").each(function(idx){
                $(this).text(weekdayNames[(idx + dayOffset) % 7]);
            });
        },

        fillBody = function($table, calInst)
        {
            var
                monthDay, day,

                $tbody = $table.find("tbody").empty(),
                $tr = $("<tr>"),

                monthLength = (new Date(Date.UTC(calInst.year, calInst.month, 0))).getDate(),
                firstDayWeekday = (new Date(Date.UTC(calInst.year, calInst.month - 1, 1))).getDay(),
                padColsBefore = (7 - dayOffset + firstDayWeekday) % 7,
                padColsAfter = 7 - ((monthLength + firstDayWeekday - dayOffset) % 7);

            padColsBefore && $tr.append("<td colspan='" + padColsBefore + "'></td>");

            for (monthDay = 1; monthDay <= monthLength; monthDay++)
            {
                day = new ag.common.Date(calInst.year, calInst.month, monthDay);
                $tr.append(renderDay(day, calInst));

                if ((firstDayWeekday + monthDay) % 7 === dayOffset)
                {
                    $tbody.append($tr);
                    $tr = $("<tr>");
                }
            }

            if (padColsAfter && padColsAfter < 7)
            {
                $tr.append("<td colspan='" + padColsAfter + "'></td>");
            }

            $tbody.append($tr);
        },

        renderDay = function(day, calInst)
        {
            var
                isInactive = (calInst.minDay && day.compare(calInst.minDay) < 0 || calInst.maxDay && day.compare(calInst.maxDay) > 0),

                $day = $(ag.ui.tool.fmt.sprintf("<td class='day'>%s</td>", day.day))
                    .click(function(){
                        if (!isInactive && !calInst.disabled)
                        {
                            calInst.selDay = day;
                            $day.closest("tbody").find(".day").removeClass("current");
                            $day.addClass("current");
                            calInst.trigger("change");
                        }
                    });

            calInst.selDay.toString() === day.toString() && $day.addClass("current");
            isInactive && $day.addClass("inactive");

            return $day;
        },

        switchToPrevMonth = function()
        {
            this.month = this.month === 1 ? 12 : this.month - 1;
            this.year = this.month === 12 ? this.year - 1 : this.year;
            renderTable.call(this);
        },

        switchToNextMonth = function()
        {
            this.month = this.month === 12 ? 1 : this.month + 1;
            this.year = this.month === 1 ? this.year + 1 : this.year;
            renderTable.call(this);
        },

        calendarField = function(day, minDay, maxDay)
        {
            this.extend(this, $("<div class='field calendar'>"));

            this.setValue(day || new ag.common.Date());
            minDay && this.setMinDay(minDay);
            maxDay && this.setMaxDay(maxDay);

            this.month = this.selDay.month;
            this.year = this.selDay.year;

            renderTable.call(this);
        };

    calendarField.prototype = Object.create(ag.ui.field.ComplexField.prototype);

    calendarField.prototype.setValue = function(value)
    {
        this.selDay = new ag.common.Date(value);
        this.month = this.selDay.month;
        this.year = this.selDay.year;
        renderTable.call(this);

        return this;
    };

    calendarField.prototype.getValue = function()
    {
        return this.disabled ? null : this.selDay;
    };

    calendarField.prototype.setMinDay = function(day)
    {
        this.minDay = day;

        if (this.selDay.compare(this.minDay) < 0)
        {
            this.selDay = this.minDay;
            this.month = this.selDay.month;
            this.year = this.selDay.year;
        }

        renderTable.call(this);

        return this;
    };

    calendarField.prototype.setMaxDay = function(day)
    {
        this.maxDay = day;

        if (this.selDay.compare(this.maxDay) > 0)
        {
            this.selDay = this.maxDay;
            this.month = this.selDay.month;
            this.year = this.selDay.year;
        }

        renderTable.call(this);

        return this;
    };

    ag.ui.field.Calendar = calendarField;
})();
