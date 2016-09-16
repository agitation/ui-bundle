/* globals console */

window.c = function()
{
    for (var i = 0; i < arguments.length; i++)
        console.log(JSON.stringify(arguments[i], null, 4));
};
