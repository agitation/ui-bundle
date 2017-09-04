ag.ns("ag.ui.ctxt");

(function(){

var Elem = function() { };

Elem.prototype = Object.create(jQuery.prototype);

Elem.prototype.setContext = function(name, parentElement)
{
    this._name = name;
    this._parent = parentElement;
};

Elem.prototype.getName = function()
{
    return this._name;
};

Elem.prototype.getParent = function()
{
    return this._parent;
};

Elem.prototype.getAncestors = function()
{
    var ancestors = [], elem = this;

    while (elem instanceof Elem)
    {
        elem = elem.getParent();
        elem && ancestors.push(elem);
    }

    return ancestors;
};

Elem.prototype.findAncestor = function(proto)
{
    var elem = this, ancestor;

    while (!ancestor && elem instanceof Elem)
    {
        elem = elem.getParent();

        if (elem instanceof proto)
            ancestor = elem;
    }

    return ancestor;
};

Elem.prototype.addChildren = function(elements, attach)
{
    var self = this;

    Object.keys(elements).forEach(function(key){
        self.addChild(key, elements[key], attach);
    });
};

Elem.prototype.addChild = function(name, elem, attach)
{
    attach = (attach === false) ? false : true;

    this._children = this._children || {};

    this._children[name] = elem;
    attach && this.append(elem);

    if (elem instanceof Elem)
        elem.setContext(name, this);
};

Elem.prototype.getChildren = function(proto, deep)
{
    var allChildren = this._children || {},
        foundChildren = {};

    Object.keys(allChildren).forEach(function(name) {
        if (allChildren[name] instanceof proto)
            foundChildren[name] = allChildren[name];

        if (deep && allChildren[name] instanceof Elem)
            $.extend(foundChildren, allChildren[name].getChildren(proto, deep));
    });

    return foundChildren;
};

// gets a single view by a reference to its prototype
Elem.prototype.getChild = function(proto, deep)
{
    var
        foundChildren = this.getChildren(proto, deep),
        keys = Object.keys(foundChildren);

    return keys.length ? foundChildren[keys[0]] : undefined;
};

Elem.prototype.registerController = function(controller)
{
    // NOTE: This works only if the instance is registered in the page element
    // tree; otherwise it has no context. Also, each view can have only one controller.

    var self = this;

    ag.srv("broker").sub("ag.state.action", function(register){
        register(self, controller);
    });
};



ag.ui.ctxt.Element = Elem;

})();
