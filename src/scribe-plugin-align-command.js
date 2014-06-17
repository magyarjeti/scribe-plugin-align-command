module Element from 'scribe-common/element';

export default function(align) {
    return function(scribe) {
        var capitaliseFirstLetter = function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
        };

        var commandName = 'align' + capitaliseFirstLetter(align);
        var alignCommand = new scribe.api.Command('justify' + capitaliseFirstLetter(align));

        alignCommand.execute = function() {
            var selection = new scribe.api.Selection();
            var range = selection.range;

            var parentNode = selection.getContaining(function(node) {
                return Element.isBlockElement(node);
            }.bind(this));

            parentNode.style.textAlign = align;
        };

        alignCommand.queryState = function() {
            var selection = new scribe.api.Selection();
            var parentNode = selection.getContaining(function(node) {
                return Element.isBlockElement(node);
            }.bind(this));

            return !!parentNode && parentNode.style.textAlign === align;
        };

        scribe.commands[commandName] = alignCommand;
    };
}
