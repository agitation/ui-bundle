agit.ns("agit.field");

(function(){
    var
        entitySelectField = function($select, entities, onChangeCallback)
        {
            var self = this;

            this.extend(this, agit.field.Select.call(this, $select));

            this.entities = entities || new agit.common.Collection();
            this.currentValue = null;

            // our entities usually have integer IDs
            this.attr("data-type", "int");

            this.change(function(){
                self.currentValue = self.getValue();
                onChangeCallback();
            });

            this.refresh();
        };

    entitySelectField.prototype = Object.create(agit.field.Select.prototype);

    entitySelectField.prototype.refresh = function()
    {
        var options = this.entitiesToOptions(entities.sort());

        this.empty();
        this.addIntro();

        this.setOptions(options);
        this.setValue(this.currentValue);
    };

    entitySelectField.prototype.setValue = function(value)
    {
        if (value instanceof Object)
            value = value.id;

        // make sure the current value is contained in the updated collection
        this.currentValue = value ? this.entities.get(value) : null;

        agit.field.Select.prototype.setValue.call(this, this.currentValue || "");

        return this;
    };

    entitySelectField.prototype.update = function(collection)
    {
        this.entities = collection;
        this.refresh();
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
            text: agit.tool.fmt.out(entity.name),
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

    agit.field.EntitySelect = entitySelectField;
})();
