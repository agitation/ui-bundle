ag.ns("ag.ui.field");

(function(){
    var
        entitySelectField = function($select, entities)
        {
            var self = this;

            this.extend(this, ag.ui.field.Select.call(this, $select));

            this.entities = entities || new ag.common.Collection();
            this.currentValue = null;

            this.change(function(){
                self.currentValue = self.getValue();
            });

            this.refresh();
        };

    entitySelectField.prototype = Object.create(ag.ui.field.Select.prototype);

    entitySelectField.prototype.refresh = function()
    {
        this.empty();
        this.addIntro();

        ag.ui.field.Select.prototype.setOptions.call(this, this.entitiesToOptions(this.entities.sort()));

        if (this.currentValue && this.containsOption(this.currentValue))
            this.setValue(this.currentValue);
    };

    entitySelectField.prototype.setValue = function(value)
    {
        if (value instanceof Object)
            value = value.id;

        value = this.entities.get(value);

        this.currentValue = value ? value.id : null;

        ag.ui.field.Select.prototype.setValue.call(this, this.currentValue || "");

        return this;
    };

    entitySelectField.prototype.update = function(collection)
    {
        this.entities = collection || new ag.common.Collection();
        this.refresh();
    };

    entitySelectField.prototype.setOptions = function()
    {
        throw new Error("Method is not available, use .update().");
    };

    // returns the number of selectable items
    entitySelectField.prototype.getCount = function()
    {
        return this.entities.length;
    };

    entitySelectField.prototype.getSelectedEntity = function()
    {
        return this.entities.get(this.currentValue);
    };

    entitySelectField.prototype.entityToOption = function(entity, isSelected)
    {
        return {
            value: entity.id,
            text: ag.ui.tool.fmt.out(entity.name),
            selected : isSelected
        };
    };

    entitySelectField.prototype.entitiesToOptions = function(entityList, selected)
    {
        var self = this, options = [];

        selected = selected || [];

        if (!(selected instanceof Array))
            selected = [selected];

        entityList.forEach(function(entity){
            entity &&
            entity.id &&
            options.push(self.entityToOption(entity, selected.indexOf(entity.id) > -1));
        });

        return options;
    };

    ag.ui.field.EntitySelect = entitySelectField;
})();
