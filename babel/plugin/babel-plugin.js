module.exports = pluginFunction;

function pluginFunction(babel) {
    const {types: t} = babel;

    return {
        name: "remove-console-*",
        visitor: {
            Identifier(path) {
                if (path.node.name === 'console') {
                    path.parentPath.parentPath.remove();
                }
            }
        }
    };
}