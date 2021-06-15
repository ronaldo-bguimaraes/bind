class State {
    constructor(valueDefault) {
        this.$value = undefined;
        this.$nodeList = new Set([]);
        // inicialize value
        this.value = valueDefault;
    }
    get value() {
        return this.$value;
    }
    set value(value) {
        this.$value = value;
        // atualiza os elementos com o novo valor
        this.$nodeList.forEach(node => node.updateNode(value));
    }
    bind(node) {
        return this.$nodeList.add(node);
    }
    static startBind(objectState, bindElement) {
        const nodeList = bindElement.querySelectorAll("[data-bind]");
        for (const node of nodeList) {
            const bind = node.dataset.bind;
            if (bind !== undefined) {
                const split = bind.split(":");
                if (split.length === 2) {
                    // atribui os values
                    [node.$name, node.$attr] = split;
                    node.$state = objectState[node.$name];
                    if (node.$state) {
                        // função para atualizar o stado
                        node.updateState = function (value) {
                            node.$state.value = value;
                        };
                        // função para atualizar o elemento
                        node.updateNode = function (value) {
                            node[node.$attr] = value;
                        };
                        // adicina o elemento ao $state
                        node.$state.bind(node);
                        // executa a primeira iteração
                        node.updateState(node.$state.value);
                    }
                    else
                        throw `State '${node.$name}' não encontrado...`;
                }
                else
                    throw `Formato incorreto em '${bind}'...`;
            }
        }
    }
}
export { State };
