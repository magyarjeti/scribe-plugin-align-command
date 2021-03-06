export default function(align) {
    return function(scribe) {
        var capitaliseFirstLetter = function(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
        };

        var commandName = 'align' + capitaliseFirstLetter(align);
        var alignCommand = new scribe.api.Command('justify' + capitaliseFirstLetter(align));

        alignCommand.execute = function() {
            var selection = new scribe.api.Selection();

            var parentNode = selection.getContaining(function(node) {
                return scribe.node.isBlockElement(node) && scribe.el.contains(node);
            }.bind(this));


            if (!!parentNode) {
                scribe.transactionManager.run(function () {
                    parentNode.style.textAlign = align;
                }.bind(this));
            }
        };

        alignCommand.queryState = function() {
            var selection = new scribe.api.Selection();
            var parentNode = selection.getContaining(function(node) {
                return scribe.node.isBlockElement(node) && scribe.el.contains(node);
            }.bind(this));

            var textAlign = !!parentNode ? (parentNode.style.textAlign || 'left') : undefined;
            return textAlign === align;
        };

        scribe.commands[commandName] = alignCommand;
    };
}
